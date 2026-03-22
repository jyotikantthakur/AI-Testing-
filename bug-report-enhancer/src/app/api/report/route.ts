import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(req: NextRequest) {
    try {
        const { image, notes, settings } = await req.json();

        if (!image) {
            return NextResponse.json({ error: "No image provided." }, { status: 400 });
        }

        const {
            jiraProject,
            jiraEmail,
            jiraApiKey,
            jiraUrl,
            jiraIssueType,
            groqApiKey,
        } = settings;

        if (!groqApiKey) {
            return NextResponse.json({ error: "GROQ API key is missing." }, { status: 400 });
        }
        if (!jiraUrl || !jiraEmail || !jiraApiKey || !jiraProject) {
            return NextResponse.json({ error: "JIRA settings are incomplete." }, { status: 400 });
        }

        // ── Step 1: Analyze screenshot with Groq Vision ──────────────────
        const groq = new Groq({ apiKey: groqApiKey });

        const visionResponse = await groq.chat.completions.create({
            model: "meta-llama/llama-4-scout-17b-16e-instruct",
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "image_url",
                            image_url: { url: image },
                        },
                        {
                            type: "text",
                            text: `You are a senior QA engineer. Analyze this screenshot and produce a detailed JIRA bug report.
Return your response in the following format:

**Title:** [concise bug title]

**Steps to Reproduce:**
1. ...
2. ...

**Expected Result:**
...

**Actual Result:**
...

**Environment:**
...

**Severity:** [Critical/High/Medium/Low]

${notes ? `Additional context from the reporter: "${notes}"` : ""}`,
                        },
                    ],
                },
            ],
            max_tokens: 1024,
        });

        const aiDescription =
            visionResponse.choices?.[0]?.message?.content ?? "No description generated.";

        // Parse title from AI response
        const titleMatch = aiDescription.match(/\*\*Title:\*\*\s*(.+)/);
        const issueTitle = titleMatch
            ? titleMatch[1].trim()
            : "Bug Report from Screenshot";

        // Build description body
        let descriptionBody = aiDescription;
        if (notes) {
            descriptionBody += `\n\n---\n**User Notes:** ${notes}`;
        }

        // ── Step 2: Create JIRA ticket ───────────────────────────────────
        let baseUrl = jiraUrl.replace(/\/+$/, "");
        try {
            baseUrl = new URL(baseUrl).origin;
        } catch (e) {
            return NextResponse.json({ error: "Invalid JIRA URL format." }, { status: 400 });
        }

        const authHeader = Buffer.from(`${jiraEmail}:${jiraApiKey}`).toString("base64");

        const jiraPayload = {
            fields: {
                project: { key: jiraProject },
                summary: issueTitle,
                description: {
                    version: 1,
                    type: "doc",
                    content: [
                        {
                            type: "paragraph",
                            content: [{ type: "text", text: descriptionBody }],
                        },
                    ],
                },
                issuetype: { name: jiraIssueType || "Bug" },
            },
        };

        const jiraResponse = await fetch(`${baseUrl}/rest/api/3/issue`, {
            method: "POST",
            headers: {
                Authorization: `Basic ${authHeader}`,
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(jiraPayload),
        });

        if (!jiraResponse.ok) {
            const errText = await jiraResponse.text();
            return NextResponse.json(
                { error: `JIRA error (${jiraResponse.status}): ${errText}` },
                { status: 400 }
            );
        }

        const jiraData = await jiraResponse.json();
        const issueKey = jiraData.key;
        const issueUrl = `${baseUrl}/browse/${issueKey}`;

        // ── Step 3: Attach the screenshot to the JIRA ticket ─────────
        try {
            // Parse base64 data URL → raw binary
            const base64Match = image.match(/^data:image\/(\w+);base64,(.+)$/);
            if (base64Match) {
                const ext = base64Match[1]; // e.g. "png", "jpeg"
                const base64Data = base64Match[2];
                const binaryData = Buffer.from(base64Data, "base64");

                // Build multipart form
                const boundary = `----formdata-${Date.now()}`;
                const fileName = `screenshot.${ext}`;
                const mimeType = `image/${ext}`;

                const bodyParts: Buffer[] = [];
                bodyParts.push(Buffer.from(
                    `--${boundary}\r\n` +
                    `Content-Disposition: form-data; name="file"; filename="${fileName}"\r\n` +
                    `Content-Type: ${mimeType}\r\n\r\n`
                ));
                bodyParts.push(binaryData);
                bodyParts.push(Buffer.from(`\r\n--${boundary}--\r\n`));

                const multipartBody = Buffer.concat(bodyParts);

                const attachResponse = await fetch(
                    `${baseUrl}/rest/api/3/issue/${issueKey}/attachments`,
                    {
                        method: "POST",
                        headers: {
                            Authorization: `Basic ${authHeader}`,
                            "X-Atlassian-Token": "no-check",
                            "Content-Type": `multipart/form-data; boundary=${boundary}`,
                        },
                        body: multipartBody,
                    }
                );

                if (!attachResponse.ok) {
                    console.warn("Attachment upload failed:", await attachResponse.text());
                }
            }
        } catch (attachErr) {
            // Non-fatal — ticket was created, attachment just failed
            console.warn("Could not attach screenshot:", attachErr);
        }

        return NextResponse.json({
            success: true,
            issueKey,
            issueUrl,
            aiDescription,
        });
    } catch (err: unknown) {
        console.error("Report API error:", err);
        return NextResponse.json(
            { error: err instanceof Error ? err.message : "Unknown error" },
            { status: 500 }
        );
    }
}
