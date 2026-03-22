import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(req: NextRequest) {
    try {
        const { groqApiKey } = await req.json();

        if (!groqApiKey) {
            return NextResponse.json(
                { error: "GROQ API Key is required." },
                { status: 400 }
            );
        }

        const groq = new Groq({ apiKey: groqApiKey });

        // Validate by listing models
        const models = await groq.models.list();

        return NextResponse.json({
            success: true,
            modelsCount: models.data?.length ?? 0,
        });
    } catch (err: unknown) {
        return NextResponse.json(
            { error: err instanceof Error ? err.message : "Invalid GROQ API key" },
            { status: 400 }
        );
    }
}
