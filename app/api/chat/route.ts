import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { createClient } from "@/lib/supabase/server";

// Allow streaming responses up to 60 seconds (increased for file processing)
export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const { messages, documentId } = await req.json();

    let contextParts: any[] = [];

    // If a document is selected for grounding, fetch its content
    if (documentId) {
      const supabase = await createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data: doc } = await supabase
          .from("library_documents")
          .select("*")
          .eq("id", documentId)
          .eq("user_id", user.id)
          .single();

        if (doc) {
          const { data: fileData } = await supabase.storage
            .from("library_files")
            .download(doc.file_path);

          if (fileData) {
            const buffer = await fileData.arrayBuffer();
            contextParts.push({
              type: "file",
              data: buffer,
              mimeType: doc.file_type,
            });
            contextParts.push({
              type: "text",
              text: "The user is grounding their questions in the attached document. Use this as your primary source of truth for this conversation.",
            });
          }
        }
      }
    }

    const result = await streamText({
      model: google("gemini-1.5-flash") as any,
      system: `You are the AuraStudy AI, a strict but effective highly intellectual study assistant.
Your goal is to ensure students legitimately learn the material.
Always try to use the Socratic method. Do not give direct answers right away. 
Instead, give hints and ask probing questions to guide them to the correct conclusion.
${documentId ? "Use the provided document context to facilitate the Socratic process." : ""}`,
      messages: [
        ...messages.slice(0, -1),
        {
          role: "user",
          content: [
            ...contextParts,
            { type: "text", text: messages[messages.length - 1].content },
          ],
        },
      ],
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
