import { createClient } from "@/lib/supabase/server";

export async function getUserProfile() {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return { user, profile };
}

export async function getUserDocuments() {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data: documents } = await supabase
    .from("library_documents")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return documents || [];
}
