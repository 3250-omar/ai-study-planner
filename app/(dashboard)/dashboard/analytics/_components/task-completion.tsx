export function TaskCompletion() {
  return (
    <div className="rounded-2xl border border-border/50 bg-card p-6 md:p-8 shadow-sm flex flex-col lg:flex-row gap-8 lg:gap-12 w-full">
      <div className="flex-1 space-y-6">
        <div className="flex items-end justify-between border-b border-border/50 pb-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Task Completion
          </h3>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold tracking-tight text-foreground">
              24
            </span>
            <span className="text-sm font-semibold text-muted-foreground">
              / 30
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-3 w-full bg-muted/50 overflow-hidden rounded-full ring-1 ring-inset ring-muted/20">
          <div
            className="h-full bg-gradient-to-r from-[#818cf8] to-[#c7d2fe] rounded-full shadow-[0_0_10px_rgba(129,140,248,0.5)]"
            style={{ width: "80%" }}
          />
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed md:pr-10">
          Great work! You&apos;ve completed 80% of your weekly targets. 6
          pending items remain.
        </p>
      </div>

      <div className="flex flex-row gap-8 lg:gap-12 border-t lg:border-t-0 lg:border-l border-border/50 pt-6 lg:pt-0 lg:pl-12">
        <div className="space-y-3">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#818cf8]">
            Deep Work Sessions
          </span>
          <div className="text-4xl font-extrabold tracking-tight text-foreground">
            14
          </div>
        </div>

        <div className="space-y-3">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#fb923c]">
            Avg. Retention
          </span>
          <div className="text-4xl font-extrabold tracking-tight text-foreground">
            92%
          </div>
        </div>
      </div>
    </div>
  );
}
