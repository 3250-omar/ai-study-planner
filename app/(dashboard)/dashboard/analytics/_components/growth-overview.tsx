import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

interface GrowthOverviewProps {
  currentWeekHours: number;
  previousWeekHours: number;
  retentionPct: number;
}

export function GrowthOverview({
  currentWeekHours,
  previousWeekHours,
  retentionPct,
}: GrowthOverviewProps) {
  const delta =
    previousWeekHours > 0
      ? Math.round(((currentWeekHours - previousWeekHours) / previousWeekHours) * 1000) / 10
      : 0;

  const isPositive = delta > 0;
  const isNeutral = delta === 0;

  return (
    <div className="rounded-2xl border border-border/50 bg-card p-10 flex flex-col justify-between shadow-sm h-full min-h-[220px]">
      <div className="space-y-3">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#f97316]">
          Efficiency Benchmark
        </span>
        <h2 className="text-2xl font-bold tracking-tight">Growth Overview</h2>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-[400px] mt-1">
          {isNeutral
            ? "No change from last week. Keep your consistency going."
            : isPositive
              ? `Your study hours increased by ${Math.abs(delta)}% this week compared to your previous week.`
              : `Your study hours decreased by ${Math.abs(delta)}% this week. Push through!`}
        </p>
      </div>

      <div className="mt-8 flex items-baseline gap-4">
        <span className="text-6xl sm:text-7xl font-extrabold tracking-tighter text-foreground">
          {retentionPct}%
        </span>
        <div className="flex flex-col gap-1">
          <span
            className={`flex items-center gap-1 text-sm font-bold ${
              isPositive ? "text-[#f97316]" : isNeutral ? "text-muted-foreground" : "text-red-500"
            }`}
          >
            {isPositive ? (
              <ArrowUpRight className="size-4" />
            ) : isNeutral ? (
              <Minus className="size-4" />
            ) : (
              <ArrowDownRight className="size-4" />
            )}
            {isNeutral ? "0%" : `${isPositive ? "+" : ""}${delta}%`}
          </span>
          <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold">
            V.S. Last Week
          </span>
        </div>
      </div>
    </div>
  );
}
