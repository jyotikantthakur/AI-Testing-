import { Router } from 'express';
import multer from 'multer';
import Groq from 'groq-sdk';
import pdfParse from 'pdf-parse';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// Initialize Groq client (requires GROQ_API_KEY in .env)
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || 'mock-key-for-now' });

// POST /api/ai/cover-letter
router.post('/cover-letter', upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No resume PDF provided.' });
        }

        // Step 1: Parse the PDF
        const pdfData = await pdfParse(req.file.buffer);
        const resumeText = pdfData.text;

        // Optional Job Description
        const jobDescription = req.body.jobDescription || 'a generic software engineering role';

        // Step 2: Use Groq LLM to generate the cover letter using Llama 3
        // If no real API key is provided, we return a mock string
        if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === 'your_groq_api_key_here') {
            return res.json({
                coverLetter: `[MOCK COVER LETTER]\n\nDear Hiring Manager,\n\nI am writing to express my strong interest in the role. Based on my resume, I have extensive experience that aligns perfectly with the requirements.\n\nHere is a summary of my background:\n${resumeText.substring(0, 100)}...\n\nThank you,\nCandidate`
            });
        }

        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: 'You are an expert technical recruiter and career coach. Write a highly tailored, professional, and convincing cover letter based on the provided resume and job description. Keep it concise, modern, and highlight key metrics. Do not include placeholder brackets like [Your Name] if the name is in the resume, use the actual name.'
                },
                {
                    role: 'user',
                    content: `Write a cover letter for this job description: ${jobDescription}\n\nHere is my resume text:\n${resumeText}`
                }
            ],
            model: 'llama-3.1-8b-instant',
            temperature: 0.7,
            max_tokens: 1500,
        });

        const coverLetter = completion.choices[0]?.message?.content || '';

        res.json({ coverLetter });
    } catch (error) {
        console.error('Groq AI Error:', error);
        res.status(500).json({ error: 'Failed to generate cover letter.' });
    }
});

// POST /api/ai/chat
router.post('/chat', async (req, res) => {
    try {
        const { messages } = req.body;

        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ error: 'Messages array is required.' });
        }

        if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === 'your_groq_api_key_here') {
            return res.json({
                reply: "Hi! I am your Agentic Job Tracker AI. I noticed you haven't added your Groq API key to the backend `.env` file yet.\n\nOnce added, I can answer any silly or serious questions about your job hunt, resume, or interview prep!"
            });
        }

        const systemPrompt = {
            role: 'system',
            content: 'You are an expert, friendly AI career assistant embedded inside the "Agentic Job Tracker" application. Your goal is to help the user navigate their job search, provide interview tips, help analyze their skills, and answer any job-related questions, no matter how basic or silly they might seem. Keep responses encouraging, concise, and highly actionable.'
        };

        const completion = await groq.chat.completions.create({
            messages: [systemPrompt, ...messages],
            model: 'llama-3.1-8b-instant',
            temperature: 0.7,
            max_tokens: 1000,
        });

        res.json({ reply: completion.choices[0]?.message?.content || '' });
    } catch (error) {
        console.error('Groq Chat Error:', error);
        res.status(500).json({ error: 'Failed to chat with AI.' });
    }
});

export default router;
