import { ArrowUpRight } from "lucide-react";

export function GrowthOverview() {
  return (
    <div className="rounded-2xl border border-border/50 bg-card p-10 flex flex-col justify-between shadow-sm h-full min-h-[220px]">
      <div className="space-y-3">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#f97316]">
          Efficiency Benchmark
        </span>
        <h2 className="text-2xl font-bold tracking-tight">Growth Overview</h2>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-[400px] mt-1">
          Your retention rate has increased by 14% this week, significantly outperforming your 30-day baseline efficiency.
        </p>
      </div>

      <div className="mt-8 flex items-baseline gap-4">
        <span className="text-6xl sm:text-7xl font-extrabold tracking-tighter text-foreground">
          88.4%
        </span>
        <div className="flex flex-col gap-1">
          <span className="flex items-center gap-1 text-sm font-bold text-[#f97316]">
            <ArrowUpRight className="size-4" />
            +4.2%
          </span>
          <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold">
            V.S. Last Month
          </span>
        </div>
      </div>
    </div>
  );
}
