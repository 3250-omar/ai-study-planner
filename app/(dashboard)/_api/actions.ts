"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

type ActionResult = { ok: true } | { error: string };

export async function logout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Logout error:", error);
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/sign-in");
}

export async function createLibraryDocumentRow(input: {
  title: string;
  original_filename?: string;
  file_path: string;
  file_type: string;
  size_bytes: number;
  subject: string;
  description?: string;
}): Promise<ActionResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase.from("library_documents").insert({
    user_id: user.id,
    title: input.title,
    original_filename: input.original_filename ?? input.title,
    file_path: input.file_path,
    file_type: input.file_type,
    size_bytes: input.size_bytes,
    subject: input.subject,
    description: input.description ?? "",
    storage_bucket: "library_files",
    processed_status: "uploaded",
  });

  if (error) return { error: error.message };

  revalidatePath("/dashboard/library");
  return { ok: true };
}

type LibraryDocumentLookupRow = {
  id: string;
  file_path: string;
  storage_bucket: string | null;
};

export async function deleteLibraryDocument(input: {
  id: string;
}): Promise<ActionResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { data: doc, error: fetchError } = await supabase
    .from("library_documents")
    .select("id,file_path,storage_bucket")
    .eq("id", input.id)
    .single();

  if (fetchError) return { error: fetchError.message };

  const typedDoc = doc as unknown as LibraryDocumentLookupRow;
  const bucket = typedDoc.storage_bucket || "library_files";
  const filePath = typedDoc.file_path;

  const { error: storageError } = await supabase.storage
    .from(bucket)
    .remove([filePath]);
  if (storageError) return { error: storageError.message };

  const { error: deleteError } = await supabase
    .from("library_documents")
    .delete()
    .eq("id", input.id);

  if (deleteError) return { error: deleteError.message };

  revalidatePath("/dashboard/library");
  return { ok: true };
}

export async function upsertSubject(input: {
  id?: string;
  title: string;
  category?: string | null;
  exam_date?: string | null; // YYYY-MM-DD
  difficulty?: number | null;
  tags?: string[];
}): Promise<ActionResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const payload = {
    ...(input.id ? { id: input.id } : {}),
    user_id: user.id,
    title: input.title,
    category: input.category ?? null,
    exam_date: input.exam_date ?? null,
    difficulty: input.difficulty ?? null,
    tags: input.tags ?? [],
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from("subjects").upsert(payload);
  if (error) return { error: error.message };

  revalidatePath("/dashboard/plan");
  return { ok: true };
}

export async function createStudySession(input: {
  title: string;
  subject: string;
  subject_id?: string | null;
  start_time: string;
  end_time: string;
  duration_minutes: number;
  status?: "planned" | "in-progress" | "completed" | "missed";
}): Promise<ActionResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase.from("study_sessions").insert({
    user_id: user.id,
    title: input.title,
    subject: input.subject,
    subject_id: input.subject_id ?? null,
    start_time: input.start_time,
    end_time: input.end_time,
    duration_minutes: input.duration_minutes,
    status: input.status ?? "planned",
  });

  if (error) return { error: error.message };

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/analytics");
  revalidatePath("/dashboard/plan");
  return { ok: true };
}

export async function createStudyTask(input: {
  title: string;
  subject_id?: string | null;
  due_at?: string | null;
}): Promise<ActionResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase.from("study_tasks").insert({
    user_id: user.id,
    subject_id: input.subject_id ?? null,
    title: input.title,
    due_at: input.due_at ?? null,
    status: "pending",
  });

  if (error) return { error: error.message };

  revalidatePath("/dashboard/analytics");
  return { ok: true };
}

export async function completeStudyTask(input: {
  id: string;
}): Promise<ActionResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase
    .from("study_tasks")
    .update({ status: "completed", completed_at: new Date().toISOString() })
    .eq("id", input.id);

  if (error) return { error: error.message };

  revalidatePath("/dashboard/analytics");
  return { ok: true };
}
