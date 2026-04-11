import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6">
      {/* Background ambient glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />
        <div className="absolute bottom-0 left-1/4 h-[300px] w-[400px] rounded-full bg-chart-4/8 blur-[100px]" />
        <div className="absolute bottom-20 right-1/4 h-[250px] w-[350px] rounded-full bg-chart-5/8 blur-[100px]" />
      </div>

      {/* Decorative grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative flex flex-col items-center text-center">
        {/* Badge */}
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
          <Sparkles className="size-3" />
          Page Not Found
        </span>

        {/* 404 display */}
        <h1 className="mt-8 text-[8rem] font-extrabold leading-none tracking-tighter sm:text-[10rem] md:text-[12rem]">
          <span className="text-gradient">404</span>
        </h1>

        {/* Message */}
        <h2 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
          Lost in the void
        </h2>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/">
            <Button
              size="lg"
              id="not-found-home"
              className="bg-brand-gradient dark:text-white text-black h-11 px-6 text-sm font-semibold shadow-lg hover:opacity-90 transition-opacity gap-2"
            >
              <ArrowLeft className="size-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Decorative bottom bar */}
        <div className="mt-16 flex items-center gap-2 text-xs text-muted-foreground">
          <div className="h-px w-12 bg-border" />
          <span>AuraStudy</span>
          <div className="h-px w-12 bg-border" />
        </div>
      </div>
    </div>
  );
}
