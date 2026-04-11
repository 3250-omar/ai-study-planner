export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px] animate-pulse-slow" />
        <div className="absolute left-1/3 top-1/3 h-[200px] w-[200px] rounded-full bg-chart-4/8 blur-[80px] animate-pulse-slow animation-delay-1000" />
        <div className="absolute right-1/3 bottom-1/3 h-[250px] w-[250px] rounded-full bg-chart-5/8 blur-[80px] animate-pulse-slow animation-delay-2000" />
      </div>

      <div className="relative flex flex-col items-center gap-8">
        {/* Spinner */}
        <div className="relative flex items-center justify-center">
          {/* Outer ring */}
          <div className="absolute size-16 rounded-full border-2 border-primary/10" />
          {/* Spinning ring */}
          <div className="size-16 rounded-full border-2 border-transparent border-t-primary animate-spin" />
          {/* Inner dot */}
          <div className="absolute size-2 rounded-full bg-primary animate-pulse" />
        </div>

        {/* Brand text */}
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            AuraStudy
          </h2>
          <div className="flex items-center gap-1.5">
            <div className="loading-dot size-1.5 rounded-full bg-primary" />
            <div className="loading-dot size-1.5 rounded-full bg-primary animation-delay-200" />
            <div className="loading-dot size-1.5 rounded-full bg-primary animation-delay-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
