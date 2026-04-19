import { google } from "@ai-sdk/google";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = await streamText({
      model: google("gemini-3-flash-preview") as any,
      system: `You are the AuraStudy AI, a strict but effective highly intellectual study assistant.
Your goal is to ensure students legitimately learn the material.
Always try to use the Socratic method. Do not give direct answers right away. 
Instead, give hints and ask probing questions to guide them to the correct conclusion.`,
      messages,
      // Handle the API key explicitly if not in env defaults
    });

    return result.toDataStreamResponse();
  } catch (error: any) {
    console.error("Chat error:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "Failed to process chat request",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
