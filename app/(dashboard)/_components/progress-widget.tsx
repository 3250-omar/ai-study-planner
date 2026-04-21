import { Button } from "@/components/ui/button";
import { CircularProgress } from "./consistency-widget";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import type { SubjectFocusSlice } from "@/app/(dashboard)/_api/queries";

interface ProgressOverviewProps {
  weeklyGoalPct: number;
  totalHours: number;
  subjectSlices: SubjectFocusSlice[];
}

export function ProgressOverview({ weeklyGoalPct, totalHours, subjectSlices }: ProgressOverviewProps) {
  return (
    <div className="flex flex-col rounded-2xl bg-card p-6 border border-border/50 shadow-sm col-span-1">
      <h3 className="text-xl font-bold tracking-tight mb-8">
        Progress Overview
      </h3>

      {/* Circle Chart Area */}
      <div className="flex justify-center mb-10 relative">
        <CircularProgress
          value={weeklyGoalPct}
          size={180}
          strokeWidth={14}
          colorClass="text-primary"
          trackColorClass="text-primary/10"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-extrabold tracking-tight">{weeklyGoalPct}%</span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1 text-center">
            Weekly
            <br />
            Goal
          </span>
        </div>
      </div>

      {/* Subject Bars — from real data */}
      <div className="space-y-6">
        {subjectSlices.length > 0 ? (
          subjectSlices.slice(0, 3).map((slice) => (
            <div key={slice.name} className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-muted-foreground">
                <span>{slice.name}</span>
                <span style={{ color: slice.color }}>{slice.value}%</span>
              </div>
              <Progress value={slice.value} className="h-2 bg-muted" />
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">
            No study data yet. Start a session to see progress.
          </p>
        )}
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
