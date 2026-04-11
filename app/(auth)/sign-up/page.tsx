import { Metadata } from "next";
import { AuthForm } from "../_components/auth-form";

export const metadata: Metadata = {
  title: "Sign Up - AuraStudy",
  description: "Create your AuraStudy account.",
};

export default function SignUpPage() {
  return <AuthForm mode="signup" />;
}
