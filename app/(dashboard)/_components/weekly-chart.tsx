import { cn } from "@/lib/utils";
import type { WeeklyStudyPoint } from "@/app/(dashboard)/_api/queries";

interface WeeklyChartProps {
  data: WeeklyStudyPoint[];
}

export function WeeklyChart({ data }: WeeklyChartProps) {
  const maxValue = Math.max(...data.map((d) => Math.max(d.actual, d.target)), 1);

  return (
    <div className="rounded-2xl bg-card p-6 border border-border/50 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold tracking-tight">Study Hours</h3>
        <span className="text-xs text-muted-foreground">Last 7 days</span>
      </div>

      <div className="flex items-end justify-between gap-1 h-24 mb-2">
        {data.map((point) => {
          const actualHeight = (point.actual / maxValue) * 100;
          return (
            <div key={point.day} className="flex flex-col items-center gap-1 flex-1">
              <div className="w-full bg-muted rounded-t-sm relative overflow-hidden" style={{ height: "80px" }}>
                <div
                  className={cn(
                    "absolute bottom-0 w-full rounded-t-sm transition-all",
                    point.actual >= point.target ? "bg-primary" : "bg-primary/60"
                  )}
                  style={{ height: `${Math.max(actualHeight, 4)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between">
        {data.map((point) => (
          <div key={point.day} className="flex-1 text-center">
            <span className="text-[10px] font-medium text-muted-foreground">{point.day}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 mt-4 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="size-2 rounded-sm bg-primary" />
          <span className="text-muted-foreground">Actual</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="size-2 rounded-sm bg-muted" />
          <span className="text-muted-foreground">Target (4h)</span>
        </div>
      </div>
    </div>
  );
}
