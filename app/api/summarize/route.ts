import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { createClient } from "@/lib/supabase/server";

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const { documentId } = await req.json();
    if (!documentId) {
      return new Response("Document ID is required", { status: 400 });
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    // 1. Get document metadata
    const { data: doc, error: docError } = await supabase
      .from("library_documents")
      .select("*")
      .eq("id", documentId)
      .eq("user_id", user.id)
      .single();

    if (docError || !doc) {
      return new Response("Document not found", { status: 404 });
    }

    // 2. Fetch the actual file from storage
    const { data: fileData, error: storageError } = await supabase.storage
      .from("library_files")
      .download(doc.file_path);

    if (storageError || !fileData) {
      return new Response("Failed to download file from storage", { status: 500 });
    }

    const buffer = await fileData.arrayBuffer();

    // 3. Generate summary using Gemini
    const { text } = await generateText({
      model: google("gemini-1.5-flash") as any,
      system: `You are a study assistant that provides high-density, high-utility summaries of educational documents. 
Your goal is to extract the core concepts, definitions, and key takeaways.
Be concise. Use bullet points. Keep it under 200 words.`,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: `Please provide a detailed summary of this study material titled "${doc.title}".` },
            { type: "file", data: buffer, mimeType: doc.file_type },
          ],
        },
      ],
    });

    // 4. Update the database with the summary
    const { error: updateError } = await supabase
      .from("library_documents")
      .update({ summary: text })
      .eq("id", documentId);

    if (updateError) {
      console.error("Failed to save summary:", updateError);
    }

    return new Response(JSON.stringify({ summary: text }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Summarization error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to summarize document" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
