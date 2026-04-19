export function CircularProgress({ 
  value, 
  size = 120, 
  strokeWidth = 8, 
  colorClass = "text-primary",
  trackColorClass = "text-muted"
}: { 
  value: number; 
  size?: number; 
  strokeWidth?: number;
  colorClass?: string;
  trackColorClass?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="-rotate-90 transform" width={size} height={size}>
        <circle
          className={trackColorClass}
          stroke="currentColor"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className={`${colorClass} transition-all duration-1000 ease-out`}
          stroke="currentColor"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
    </div>
  );
}

export function ConsistencyWidget() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl bg-card p-8 border border-border/50 shadow-sm">
      <div className="relative mb-6">
        <CircularProgress value={85} size={140} strokeWidth={10} colorClass="text-orange-500" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold tracking-tight">12</span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1">Days</span>
        </div>
      </div>
      
      <div className="text-center space-y-1 mt-2">
        <h3 className="text-lg font-bold">Consistency King</h3>
        <p className="text-xs text-muted-foreground">Top 5% of students this week</p>
      </div>

      <div className="flex gap-1.5 mt-6">
        <div className="h-1.5 w-6 rounded-full bg-orange-500" />
        <div className="h-1.5 w-6 rounded-full bg-orange-500" />
        <div className="h-1.5 w-6 rounded-full bg-orange-500" />
        <div className="h-1.5 w-6 rounded-full bg-muted-foreground/30" />
        <div className="h-1.5 w-6 rounded-full bg-muted-foreground/30" />
      </div>
    </div>
  );
}
