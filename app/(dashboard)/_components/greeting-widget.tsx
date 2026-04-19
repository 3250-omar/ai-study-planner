import { Sparkles } from "lucide-react";

export function GreetingWidget() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-card p-8 border border-border/50 shadow-sm col-span-1 lg:col-span-2">
      {/* Decorative Background Elements */}
      <div className="absolute -right-20 -top-20 size-[300px] rounded-full bg-primary/5 blur-[80px] pointer-events-none" />
      <div className="absolute right-10 top-10 opacity-10 pointer-events-none">
        <svg
          width="120"
          height="120"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      </div>

      <div className="relative z-10 flex h-full flex-col justify-between gap-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2">
            Morning, Alex. Ready to focus?
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
            Your goal today is to master 3 core concepts in{" "}
            <span className="font-semibold text-primary/80">
              Advanced Macroeconomics
            </span>
            .
          </p>
        </div>

        {/* AI Insight Box */}
        <div className="flex items-start gap-4 rounded-xl border border-primary/20 bg-primary/5 p-4 backdrop-blur-sm max-w-2xl">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-primary">
            <Sparkles className="size-4" />
          </div>
          <p className="text-sm font-medium leading-relaxed italic text-foreground/80">
            &ldquo;You&apos;ve shown 15% better retention during evening sessions.
            Consider moving your &apos;Quantum Physics&apos; review to 7 PM today.&rdquo;
            <span className="block mt-1 text-xs font-semibold not-italic text-primary/60">
              — Aura AI
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
