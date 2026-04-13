import { Award } from "lucide-react";

export function ConsistencyBadge() {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-[#6366f1]/20 bg-gradient-to-br from-[#6366f1]/10 to-[#3730a3]/20 dark:to-[#312e81]/40 p-8 flex flex-col items-center justify-center text-center shadow-sm h-full group min-h-[220px]">
      {/* Glow */}
      <div className="absolute inset-0 bg-[#6366f1]/5 blur-2xl group-hover:bg-[#6366f1]/10 transition-colors pointer-events-none" />
      
      <div className="relative z-10 flex size-14 items-center justify-center rounded-full bg-[#6366f1]/20 text-[#818cf8] ring-1 ring-[#6366f1]/30 mb-5 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
        <Award className="size-7" />
      </div>

      <h2 className="relative z-10 text-xl font-bold tracking-tight mb-1 text-foreground">Consistency King</h2>
      <p className="relative z-10 text-sm text-muted-foreground mb-6">12 Day Study Streak</p>

      {/* Ticks representation */}
      <div className="relative z-10 flex gap-1.5 mb-5">
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div key={i} className="h-6 w-2 rounded-full bg-[#818cf8] shadow-[0_0_8px_rgba(129,140,248,0.4)]" />
        ))}
        {[8, 9].map((i) => (
          <div key={i} className="h-6 w-2 rounded-full bg-muted/60" />
        ))}
      </div>

      <p className="relative z-10 text-[9px] font-bold uppercase tracking-widest text-[#818cf8]/80">
        2 MORE DAYS FOR NEXT TIER
      </p>
    </div>
  );
}
