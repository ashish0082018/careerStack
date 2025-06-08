/* eslint-disable */
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // Call Gemini API
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: `
            
         The tech description "${prompt}".
         
         You are an AI that refines and enhances user-provided tech descriptions into a well-structured, concise, and professional sentence between 30 to 60 words (less than 500 characters including space also). Ensure clarity, readability, and a natural flow. Maintain accuracy while making the description sound impressive and engaging.

Example Input: 'Full stack developer, Next.js, React.js, Prisma, PostgreSQL, authentication, Tailwind CSS, Node.js, TypeScript.'

Example Output: 'A skilled full-stack developer proficient in Next.js, React.js, and Node.js, with expertise in authentication, PostgreSQL, Prisma, Tailwind CSS, and TypeScript for building scalable web applications. 
If user give some wrong inputs other than tech description then say write some relevent tech stacks.
Only give the output , nothing else.

` }] }],
      },
      { headers: { "Content-Type": "application/json" } }
    );

    // Extract response safely
    const rawText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    // const cleanedText = rawText.replace(/^Here are 4 to-do list options:\s*/, "").trim();
    console.log(rawText);
    
    if (!rawText) {
      return NextResponse.json({ error: "Empty response from AI" }, { status: 500 });
    }

    // Parse AI response as JSON
   
    return NextResponse.json(rawText, { status: 200 });

  } catch (error: any) {
    console.error("Error in ask-bot API:", error.response?.data || error.message);
    return NextResponse.json(
      { error: error.response?.data?.error?.message || "Internal Server Error" },
      { status: error.response?.status || 500 }
    );
  }
}
