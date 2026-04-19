"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function login(formData: any) {
  const supabase = await createClient();

  const email = formData.email as string;
  const password = formData.password as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  // Use redirect from Next.js server actions
  redirect("/dashboard");
}

export async function signup(formData: any) {
  const supabase = await createClient();

  const email = formData.email as string;
  const password = formData.password as string;
  const name = formData.name as string;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
      // Require email confirmation or not depending on settings
    },
  });

  if (error) {
    return { error: error.message };
  }

  // Redirect to dashboard (or an email-confirmation page if you have that configured)
  redirect("/dashboard");
}
