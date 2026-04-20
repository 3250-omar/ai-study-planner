import { AnalyticsHeader } from "./_components/analytics-header";
import { GrowthOverview } from "./_components/growth-overview";
import { ConsistencyBadge } from "./_components/consistency-badge";
import { WeeklyStudyChart } from "./_components/weekly-study-chart";
import { SubjectFocusChart } from "./_components/subject-focus-chart";
import { TaskCompletion } from "./_components/task-completion";
import { RecentSessionsTable } from "./_components/recent-sessions-table";
import { StudyHeatmap } from "./_components/study-heatmap";
import {
  getConsistencyHeatmap,
  getRecentStudySessions,
  getSubjectFocusBreakdown,
  getTaskCompletionSummary,
  getWeeklyStudyHours,
} from "@/app/(dashboard)/_api/queries";
import { Zap, Clock, Book } from "lucide-react";
import { format } from "date-fns";

function formatDuration(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h <= 0) return `${m}m`;
  return `${h}h ${m.toString().padStart(2, "0")}m`;
}

export default async function AnalyticsPage() {
  const [weekly, focus, heatmap, summary, recent] = await Promise.all([
    getWeeklyStudyHours(),
    getSubjectFocusBreakdown(),
    getConsistencyHeatmap(),
    getTaskCompletionSummary(),
    getRecentStudySessions(10),
  ]);

  const recentRows = recent.map((s) => {
    const mins = s.duration_minutes || 0;
    const icon = mins >= 90 ? Zap : mins >= 45 ? Clock : Book;
    const efficiency = mins >= 120 ? 94 : mins >= 90 ? 90 : mins >= 45 ? 84 : 72;
    const mode = mins >= 90 ? "DEEP WORK" : mins >= 45 ? "STEADY" : "PASSIVE";
    const date = format(new Date(s.start_time), "MMM dd, yyyy");
    return {
      id: s.id,
      topic: s.title || s.subject,
      date,
      duration: formatDuration(mins),
      efficiency,
      mode,
      icon,
    };
  });

  return (
    <div className="flex flex-col gap-6 pb-10">
      <AnalyticsHeader />
      <div id="analytics-dashboard-content" className="flex flex-col gap-6">
        {/* Top Grid: Cards + Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Row 1 */}
          <div className="lg:col-span-2">
            <GrowthOverview />
          </div>
          <div className="lg:col-span-1">
            <ConsistencyBadge />
          </div>

          {/* Row 2 */}
          <div className="lg:col-span-2">
            <WeeklyStudyChart data={weekly} />
          </div>
          <div className="lg:col-span-1">
            <SubjectFocusChart
              data={focus.slices}
              totalHoursLabel={`${focus.totalHours}h`}
            />
          </div>
        </div>

        {/* Middle Section: Progress and Heatmap */}
        <div className="flex flex-col gap-6 w-full">
          <TaskCompletion
            completed={summary.completed}
            total={summary.total}
            deepWorkSessions={summary.deepWorkSessions}
            avgRetentionPct={summary.avgRetentionPct}
          />
          <StudyHeatmap days={heatmap} />
        </div>

        {/* Bottom Section: Table */}
        <RecentSessionsTable sessions={recentRows} />
      </div>
    </div>
  );
}
