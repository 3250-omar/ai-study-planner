import { cn } from "@/lib/utils";

// Generate random heatmap data for 14 weeks (98 days) outside the component 
// so the component remains pure and idempotent for every render.
const days = Array.from({ length: 98 }).map(() => ({
  intensity: Math.floor(Math.random() * 5), // 0 to 4
}));

export function StudyHeatmap() {
  
  return (
    <div className="rounded-2xl border border-border/50 bg-card p-6 md:p-8 shadow-sm w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Study Consistency Map
        </h3>
        <div className="flex items-center gap-2 text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="size-3 rounded-sm bg-muted/40" />
            <div className="size-3 rounded-sm bg-[#818cf8]/30" />
            <div className="size-3 rounded-sm bg-[#818cf8]/60" />
            <div className="size-3 rounded-sm bg-[#6366f1]" />
            <div className="size-3 rounded-sm bg-[#4f46e5]" />
          </div>
          <span>More</span>
        </div>
      </div>
      
      <div className="overflow-x-auto pb-2">
        <div className="min-w-[700px] flex gap-1.5 justify-between">
          {/* Group into weeks (columns) */}
          {Array.from({ length: 14 }).map((_, weekIdx) => (
            <div key={`week-${weekIdx}`} className="flex flex-col gap-1.5">
              {Array.from({ length: 7 }).map((_, dayIdx) => {
                const day = days[weekIdx * 7 + dayIdx];
                return (
                  <div 
                    key={`day-${weekIdx}-${dayIdx}`}
                    className={cn(
                      "size-3.5 sm:size-4 rounded-sm transition-colors hover:ring-2 hover:ring-primary/50 cursor-crosshair",
                      day.intensity === 0 && "bg-muted/40",
                      day.intensity === 1 && "bg-[#818cf8]/30",
                      day.intensity === 2 && "bg-[#818cf8]/60",
                      day.intensity === 3 && "bg-[#6366f1]",
                      day.intensity === 4 && "bg-[#4f46e5] shadow-[0_0_8px_rgba(99,102,241,0.5)]"
                    )}
                    title={`Study intensity level: ${day.intensity}`}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
