import { Award } from "lucide-react";

interface ConsistencyBadgeProps {
  streak: number;
}

export function ConsistencyBadge({ streak }: ConsistencyBadgeProps) {
  // Calculate next tier threshold
  const nextTier = streak >= 30 ? 60 : streak >= 14 ? 30 : streak >= 7 ? 14 : 7;
  const daysToNext = Math.max(0, nextTier - streak);

  // Filled bars based on streak
  const filledBars = streak >= 14 ? 7 : streak >= 7 ? 5 : streak >= 3 ? 3 : streak >= 1 ? 1 : 0;

  return (
    <div className="relative rounded-2xl overflow-hidden border border-[#6366f1]/20 bg-gradient-to-br from-[#6366f1]/10 to-[#3730a3]/20 dark:to-[#312e81]/40 p-8 flex flex-col items-center justify-center text-center shadow-sm h-full group min-h-[220px]">
      {/* Glow */}
      <div className="absolute inset-0 bg-[#6366f1]/5 blur-2xl group-hover:bg-[#6366f1]/10 transition-colors pointer-events-none" />
      
      <div className="relative z-10 flex size-14 items-center justify-center rounded-full bg-[#6366f1]/20 text-[#818cf8] ring-1 ring-[#6366f1]/30 mb-5 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
        <Award className="size-7" />
      </div>

      <h2 className="relative z-10 text-xl font-bold tracking-tight mb-1 text-foreground">
        {streak >= 14 ? "Consistency King" : streak >= 7 ? "Streaker" : streak > 0 ? "Building Up" : "Start Your Streak"}
      </h2>
      <p className="relative z-10 text-sm text-muted-foreground mb-6">
        {streak > 0 ? `${streak} Day Study Streak` : "No active streak"}
      </p>

      {/* Ticks representation */}
      <div className="relative z-10 flex gap-1.5 mb-5">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className={`h-6 w-2 rounded-full ${
              i < filledBars
                ? "bg-[#818cf8] shadow-[0_0_8px_rgba(129,140,248,0.4)]"
                : "bg-muted/60"
            }`}
          />
        ))}
        {[8, 9].map((i) => (
          <div key={i} className="h-6 w-2 rounded-full bg-muted/60" />
        ))}
      </div>

      <p className="relative z-10 text-[9px] font-bold uppercase tracking-widest text-[#818cf8]/80">
        {daysToNext > 0 ? `${daysToNext} MORE DAYS FOR NEXT TIER` : "MAX TIER REACHED!"}
      </p>
    </div>
  );
}
