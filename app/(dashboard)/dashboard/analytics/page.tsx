import { AnalyticsHeader } from "./_components/analytics-header";
import { GrowthOverview } from "./_components/growth-overview";
import { ConsistencyBadge } from "./_components/consistency-badge";
import { WeeklyStudyChart } from "./_components/weekly-study-chart";
import { SubjectFocusChart } from "./_components/subject-focus-chart";
import { TaskCompletion } from "./_components/task-completion";
import { RecentSessionsTable } from "./_components/recent-sessions-table";
import { StudyHeatmap } from "./_components/study-heatmap";

export default function AnalyticsPage() {
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
            <WeeklyStudyChart />
          </div>
          <div className="lg:col-span-1">
            <SubjectFocusChart />
          </div>
        </div>

        {/* Middle Section: Progress and Heatmap */}
        <div className="flex flex-col gap-6 w-full">
          <TaskCompletion />
          <StudyHeatmap />
        </div>

        {/* Bottom Section: Table */}
        <RecentSessionsTable />
      </div>
    </div>
  );
}
