import { Button } from "@/components/ui/button";
import { CircularProgress } from "./consistency-widget";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

export function ProgressOverview() {
  return (
    <div className="flex flex-col rounded-2xl bg-card p-6 border border-border/50 shadow-sm col-span-1">
      <h3 className="text-xl font-bold tracking-tight mb-8">
        Progress Overview
      </h3>

      {/* Circle Chart Area */}
      <div className="flex justify-center mb-10 relative">
        <CircularProgress
          value={70}
          size={180}
          strokeWidth={14}
          colorClass="text-primary"
          trackColorClass="text-primary/10"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-extrabold tracking-tight">70%</span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1 text-center">
            Weekly
            <br />
            Goal
          </span>
        </div>
      </div>

      {/* Horizontal Bars */}
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <span>Macroeconomics</span>
            <span className="text-foreground">85%</span>
          </div>
          <Progress value={85} className="h-2 bg-muted" />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <span>Organic Chemistry</span>
            <span className="text-orange-500">42%</span>
          </div>
          <Progress value={42} className="h-2 bg-muted indicator-orange" />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <span>Statistics II</span>
            <span className="text-foreground">68%</span>
          </div>
          <Progress value={68} className="h-2 bg-muted" />
        </div>
      </div>

      <Link
        className="mt-8 w-full rounded-xl border border-border/50 bg-muted/20 py-3 text-sm font-semibold transition-colors hover:bg-muted/50 text-center"
        href={"/dashboard/analytics"}
      >
        View Detailed Report
      </Link>
    </div>
  );
}
