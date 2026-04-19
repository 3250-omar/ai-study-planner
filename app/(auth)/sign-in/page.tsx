import { Metadata } from "next";
import { AuthForm } from "../_components/auth-form";

export const metadata: Metadata = {
  title: "Sign In - AuraStudy",
  description: "Sign in to your AuraStudy account.",
};

export default function SignInPage() {
  return <AuthForm mode="login" />;
}
