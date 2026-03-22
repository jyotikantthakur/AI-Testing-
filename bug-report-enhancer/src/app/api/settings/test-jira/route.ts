import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { jiraUrl, jiraEmail, jiraApiKey } = await req.json();

        if (!jiraUrl || !jiraEmail || !jiraApiKey) {
            return NextResponse.json(
                { error: "JIRA URL, Email, and API Key are required." },
                { status: 400 }
            );
        }

        let baseUrl = jiraUrl.replace(/\/+$/, "");
        try {
            baseUrl = new URL(baseUrl).origin;
        } catch (e) {
            return NextResponse.json({ error: "Invalid JIRA URL format." }, { status: 400 });
        }

        const authHeader = Buffer.from(`${jiraEmail}:${jiraApiKey}`).toString("base64");

        const response = await fetch(`${baseUrl}/rest/api/3/myself`, {
            method: "GET",
            headers: {
                Authorization: `Basic ${authHeader}`,
                Accept: "application/json",
            },
        });

        if (!response.ok) {
            const text = await response.text();
            return NextResponse.json(
                { error: `JIRA returned ${response.status}: ${text}` },
                { status: 400 }
            );
        }

        const user = await response.json();

        return NextResponse.json({
            success: true,
            displayName: user.displayName || user.emailAddress || "Connected",
        });
    } catch (err: unknown) {
        return NextResponse.json(
            { error: err instanceof Error ? err.message : "Unknown error" },
            { status: 500 }
        );
    }
}
