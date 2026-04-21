export default function DashboardLoading() {
  return (
    <div className="flex flex-col gap-8 pb-10 animate-pulse">
      {/* Top Row Skeletons */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-[160px] rounded-2xl bg-muted/50" />
        <div className="h-[160px] rounded-2xl bg-muted/50 hidden lg:block" />
      </div>

      {/* Quick Actions Skeleton */}
      <div className="flex gap-3">
        <div className="h-10 w-40 rounded-lg bg-muted/50" />
        <div className="h-10 w-32 rounded-lg bg-muted/50" />
        <div className="h-10 w-36 rounded-lg bg-muted/50" />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12">
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div className="h-[300px] rounded-2xl bg-muted/50" />
          <div className="h-[200px] rounded-2xl bg-muted/50" />
        </div>
        <div className="flex flex-col gap-6">
          <div className="h-[360px] rounded-2xl bg-muted/50" />
          <div className="h-[140px] rounded-2xl bg-muted/50" />
          <div className="h-[200px] rounded-2xl bg-muted/50" />
        </div>
      </div>
    </div>
  );
}
