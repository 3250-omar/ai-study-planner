export function TaskCompletion({
  completed,
  total,
  deepWorkSessions,
  avgRetentionPct,
}: {
  completed: number;
  total: number;
  deepWorkSessions: number;
  avgRetentionPct: number;
}) {
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="rounded-2xl border border-border/50 bg-card p-6 md:p-8 shadow-sm flex flex-col lg:flex-row gap-8 lg:gap-12 w-full">
      <div className="flex-1 space-y-6">
        <div className="flex items-end justify-between border-b border-border/50 pb-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Task Completion
          </h3>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold tracking-tight text-foreground">
              {completed}
            </span>
            <span className="text-sm font-semibold text-muted-foreground">
              / {total}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-3 w-full bg-muted/50 overflow-hidden rounded-full ring-1 ring-inset ring-muted/20">
          <div
            className="h-full bg-linear-to-r from-[#818cf8] to-[#c7d2fe] rounded-full shadow-[0_0_10px_rgba(129,140,248,0.5)]"
            style={{ width: `${pct}%` }}
          />
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed md:pr-10">
          Great work! You&apos;ve completed {pct}% of your weekly targets.{" "}
          {Math.max(total - completed, 0)} pending items remain.
        </p>
      </div>

      <div className="flex flex-row gap-8 lg:gap-12 border-t lg:border-t-0 lg:border-l border-border/50 pt-6 lg:pt-0 lg:pl-12">
        <div className="space-y-3">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#818cf8]">
            Deep Work Sessions
          </span>
          <div className="text-4xl font-extrabold tracking-tight text-foreground">
            {deepWorkSessions}
          </div>
        </div>

        <div className="space-y-3">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#fb923c]">
            Avg. Retention
          </span>
          <div className="text-4xl font-extrabold tracking-tight text-foreground">
            {avgRetentionPct}%
          </div>
        </div>
      </div>
    </div>
  );
}
