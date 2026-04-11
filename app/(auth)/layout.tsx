import Link from "next/link";
import { Sparkles, Star } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication - AuraStudy",
  description: "Sign in or create an account to start your learning journey.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Left Panel - Brand / Decorative container */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden border-r border-border/50 bg-muted/20 p-12 lg:flex xl:w-[55%]">
        {/* Ambient Glow Effects */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 -left-20 h-[600px] w-[600px] rounded-full bg-primary/10 blur-[120px] animate-pulse-slow" />
          <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-chart-4/10 blur-[120px] animate-pulse-slow animation-delay-1000" />
          <div className="absolute -bottom-20 -right-20 h-[600px] w-[600px] rounded-full bg-chart-5/10 blur-[130px] animate-pulse-slow animation-delay-2000" />
        </div>

        {/* Decorative Grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Brand Header */}
        <div className="relative z-10 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 font-bold focus:outline-none group transition-transform hover:scale-[1.02]">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary/20 text-primary ring-1 ring-primary/30 shadow-lg shadow-primary/10 transition-all group-hover:bg-primary/30 group-hover:ring-primary/50">
              <Sparkles className="size-5" />
            </div>
            <span className="text-2xl tracking-tight">AuraStudy</span>
          </Link>
          
          <div className="hidden sm:block rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 font-mono text-xs font-semibold text-primary backdrop-blur-md">
            v2.0 Architecture
          </div>
        </div>

        {/* Hero Copy & Testimonial */}
        <div className="relative z-10 mt-auto flex flex-col gap-12">
          {/* Main Copy */}
          <div className="max-w-xl">
            <h2 className="text-4xl font-extrabold tracking-tight xl:text-5xl/[1.1]">
              Accelerate your
              <br />
              <span className="text-gradient">cognitive growth.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground xl:text-lg">
              Join thousands of students leveraging AI to architect personalized learning workflows, optimize retention, and reclaim their time.
            </p>
          </div>

          {/* Glassmorphic Testimonial Card */}
          <div className="relative max-w-md rounded-2xl border border-border/50 bg-background/40 p-6 backdrop-blur-xl shadow-2xl dark:border-white/5 dark:bg-black/20">
            <div className="absolute -top-3 -left-3 size-8 rounded-full bg-chart-4/30 blur-xl" />
            <div className="flex items-center gap-1 mb-3 text-yellow-500">
              <Star className="size-4 fill-current" />
              <Star className="size-4 fill-current" />
              <Star className="size-4 fill-current" />
              <Star className="size-4 fill-current" />
              <Star className="size-4 fill-current" />
            </div>
            <blockquote className="text-sm font-medium leading-relaxed text-foreground md:text-base italic">
              &ldquo;AuraStudy completely rewired how I conceptualize information. It&apos;s the difference between memorizing and truly understanding complex topics.&rdquo;
            </blockquote>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-full bg-primary/20 font-semibold text-primary text-xs ring-1 ring-primary/30">
                JT
              </div>
              <div>
                <div className="text-sm font-semibold">Julian Thomas</div>
                <div className="text-xs text-muted-foreground border-border/50">PhD Candidate, Oxford</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form Container */}
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-background relative">
        {/* Subtle background glow for the form side too */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden lg:hidden">
          <div className="absolute -top-20 -right-20 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px]" />
        </div>

        {/* Mobile Logo */}
        <div className="mb-8 flex justify-center lg:hidden relative z-10">
          <Link href="/" className="flex items-center gap-2.5 font-bold">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
              <Sparkles className="size-5" />
            </div>
            <span className="text-2xl tracking-tight">AuraStudy</span>
          </Link>
        </div>

        {/* Form Area */}
        <div className="mx-auto w-full max-w-[420px] relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
}
