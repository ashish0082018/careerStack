// /app/api/analyze-resume/route.ts

import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

export async function POST(req: NextRequest) {
  try {
    const { resumeRaw, jobDescription } = await req.json();

    if (!resumeRaw || !jobDescription) {
      return NextResponse.json(
        { error: "resumeRaw and jobDescription are required" },
        { status: 400 }
      );
    }

    const prompt = `
You're an expert resume analyzer.
Your task is to review the resume and suggest 4–8 concise improvements based on the job description.

Instructions:
- Return an array of 4–8 JSON objects.
- Each object must contain: category, issue, suggestion, priority (high | medium | low),lineReplacement i.e original and suggested
- Some can include: lineReplacement { original: string, suggested: string }
- Don't return markdown or explanation. Only output pure JSON like below:

[
  {
    "category": "Keywords",
    "issue": "Missing relevant tech terms",
    "suggestion": "Add terms like 'TypeScript', 'REST API'",
    "priority": "high",
    "lineReplacement": {
      "original": "Built web apps using JavaScript",
      "suggested": "Developed web apps using TypeScript and REST APIs"
    }
  }
]

Resume:
${resumeRaw}

Job Description:
${jobDescription}
`;

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      { headers: { "Content-Type": "application/json" } }
    );

    const raw = response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!raw) {
      return NextResponse.json(
        { error: "Empty response from Gemini" },
        { status: 500 }
      );
    }

    // Remove ```json or ``` from Gemini’s response
    const cleaned = raw.replace(/```json|```/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (err) {
      return NextResponse.json(
        {
          error: "Failed to parse AI response as JSON",
          rawResponse: raw,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(parsed);
  } catch (error: any) {
    console.error("Gemini API error:", error.message);
    return NextResponse.json(
      {
        error: error.response?.data?.error?.message || "Server error",
      },
      { status: error.response?.status || 500 }
    );
  }
}
