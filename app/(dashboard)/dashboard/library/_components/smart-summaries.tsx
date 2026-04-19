import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const summaries = [
  {
    subject: "PHYSICS",
    subjectColor: "bg-indigo-500",
    title: "Quantum Mechanics: Wave-Particle Duality",
    description:
      "The core concept revolves around the observer effect and the double-slit experiment results which challenge...",
    readTime: 4,
  },
  {
    subject: "HISTORY",
    subjectColor: "bg-orange-500",
    title: "The Industrial Revolution: Socio-Economic Shifts",
    description:
      "Analysis of the migration from agrarian lifestyles to urban manufacturing centers and the rise of the middle...",
    readTime: 6,
  },
];

export function SmartSummaries() {
  return (
    <section>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
          Smart Summaries
        </h2>
        <Link
          href="/dashboard/library/insights"
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          View All AI Insights
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Summary Cards */}
        {summaries.map((s) => (
          <div
            key={s.title}
            className="group relative flex flex-col justify-between rounded-2xl border border-border/50 bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
          >
            {/* Decorative sparkle */}
            <div className="absolute top-5 right-5 text-muted-foreground/10">
              <Sparkles className="size-10" />
            </div>

            <div className="space-y-4 relative z-10">
              {/* Subject Badge */}
              <span
                className={cn(
                  "inline-block rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white",
                  s.subjectColor
                )}
              >
                {s.subject}
              </span>

              {/* Title */}
              <h3 className="text-lg font-bold tracking-tight leading-snug pr-8">
                {s.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                {s.description}
              </p>
            </div>

            {/* Read Summary Link */}
            <Button
              variant="link"
              asChild
              className="mt-6 p-0 h-auto justify-start text-primary font-semibold group-hover:gap-3 transition-all"
            >
              <Link href="#">
                Read {s.readTime} min summary
                <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          </div>
        ))}

        {/* AI Quick Brief Card */}
        <div className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-primary/30 bg-primary/[0.03] p-6 text-center transition-all hover:border-primary/50 hover:bg-primary/[0.06] cursor-pointer group">
          {/* Glow */}
          <div className="absolute inset-0 rounded-2xl bg-primary/5 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20 group-hover:scale-110 transition-transform">
              <Zap className="size-7" />
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-bold">Need a quick brief?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-[200px]">
                Select any PDF to generate an instant AI summary.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
