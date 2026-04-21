"use client";

import * as React from "react";
import * as z from "zod";
import Link from "next/link";
import { toast } from "sonner";
import { login, signup } from "../_api/actions";
import { createClient } from "@/lib/supabase/client";

import { Button } from "@/components/ui/button";
import { GlobalForm, FormFieldConfig } from "@/components/global-form";

// Google Icon SVG Component
const GoogleIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const loginSchema = z.object({
  email: z.email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

const signupSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

interface AuthFormProps {
  mode: "login" | "signup";
}

export function AuthForm({ mode }: AuthFormProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = React.useState(false);

  const isLogin = mode === "login";

  async function handleGoogleSignIn() {
    setIsGoogleLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) {
        toast.error("Google sign-in failed", { description: error.message });
        setIsGoogleLoading(false);
      }
      // If successful, the browser will redirect to Google
    } catch {
      toast.error("An unexpected error occurred");
      setIsGoogleLoading(false);
    }
  }

  async function onSubmit(values: Record<string, any>) {
    setIsLoading(true);

    try {
      let result;
      if (isLogin) {
        result = await login(values);
      } else {
        result = await signup(values);
      }

      if (result?.error) {
        toast.error("Authentication failed", {
          description: result.error,
        });
        setIsLoading(false);
      } else {
        toast.success(
          isLogin ? "Signed in successfully" : "Account created successfully",
          {
            description: `Welcome to AuraStudy! Redirecting...`,
          },
        );
        // The server action handles redirect()
      }
    } catch (e) {
      toast.error("An unexpected error occurred");
      setIsLoading(false);
    }
  }

  const loginFields: FormFieldConfig[] = [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "m@example.com",
      autoCapitalize: "none",
      autoComplete: "email",
      autoCorrect: "off",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "**********",
      autoComplete: "current-password",
      renderExtraLabel: (
        <Link
          href="/forgot-password"
          className="text-xs font-medium text-primary hover:underline hover:underline-offset-4"
        >
          Forgot password?
        </Link>
      ),
    },
  ];

  const signupFields: FormFieldConfig[] = [
    {
      name: "name",
      label: "Full Name",
      type: "text",
      placeholder: "John Doe",
      autoCapitalize: "words",
      autoComplete: "name",
      autoCorrect: "off",
    },
    ...loginFields.map((f) =>
      f.name === "password"
        ? { ...f, renderExtraLabel: undefined, autoComplete: "new-password" }
        : f,
    ),
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      placeholder: "**********",
      autoComplete: "new-password",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          {isLogin ? "Welcome back" : "Create an account"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {isLogin
            ? "Enter your email below to login to your account"
            : "Let's get started on your academic journey"}
        </p>
      </div>

      <div className="grid gap-4">
        <Button
          variant="outline"
          type="button"
          disabled={isLoading || isGoogleLoading}
          onClick={handleGoogleSignIn}
          className="gap-2"
        >
          <GoogleIcon className="size-4" />
          {isGoogleLoading ? "Redirecting..." : `${isLogin ? "Sign in" : "Sign up"} with Google`}
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <GlobalForm
          schema={isLogin ? loginSchema : signupSchema}
          defaultValues={
            (isLogin
              ? { email: "", password: "" }
              : {
                  name: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                }) as any
          }
          onSubmit={onSubmit}
          fields={isLogin ? loginFields : signupFields}
          submitText={isLogin ? "Sign In" : "Sign Up"}
          isLoading={isLoading}
          buttonClassName="bg-brand-gradient text-white"
        />
      </div>

      <div className="text-center text-sm">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <Link
          href={isLogin ? "/sign-up" : "/sign-in"}
          className="font-semibold text-primary underline-offset-4 hover:underline"
        >
          {isLogin ? "Sign up" : "Sign in"}
        </Link>
      </div>
    </div>
  );
}
