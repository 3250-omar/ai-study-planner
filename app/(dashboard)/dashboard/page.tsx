import { GreetingWidget } from "../_components/greeting-widget";
import { ConsistencyWidget } from "../_components/consistency-widget";
import { StudyPlanList } from "../_components/study-plan-list";
import { ProgressOverview } from "../_components/progress-widget";
import { QuickActions } from "../_components/quick-actions";
import { RecentActivity } from "../_components/recent-activity";
import { DeadlineAlert } from "../_components/deadline-alert";
import { WeeklyChart } from "../_components/weekly-chart";
import { SmartSummaries } from "./library/_components/smart-summaries";
import {
  getTodayStudyPlan,
  getUserProfile,
  getRecentStudySessions,
  getSubjects,
  getWeeklyStudyHours,
  getConsistencyHeatmap,
  getSubjectFocusBreakdown,
  getLibrarySummaries,
} from "../_api/queries";

export default async function DashboardPage() {
  const [sessions, userData, recentSessions, subjects, weeklyData, heatmap, focus, summaries] =
    await Promise.all([
      getTodayStudyPlan(),
      getUserProfile(),
      getRecentStudySessions(5),
      getSubjects(),
      getWeeklyStudyHours(),
      getConsistencyHeatmap(),
      getSubjectFocusBreakdown(),
      getLibrarySummaries(),
    ]);

  const userName =
    userData?.profile?.display_name ||
    userData?.profile?.name ||
    userData?.user?.email?.split("@")[0] ||
    "there";

  // Calculate streak from heatmap
  let streak = 0;
  for (let i = heatmap.length - 1; i >= 0; i--) {
    if (heatmap[i].intensity > 0) streak++;
    else break;
  }

  // Compute weekly goal progress
  const weeklyGoal = userData?.profile?.weekly_goal_hours ?? 20;
  const totalActualHours = weeklyData.reduce((sum, d) => sum + d.actual, 0);
  const weeklyGoalPct = weeklyGoal > 0 ? Math.min(100, Math.round((totalActualHours / weeklyGoal) * 100)) : 0;

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Top Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GreetingWidget userName={userName} />
        <div className="col-span-1 hidden lg:block">
          <ConsistencyWidget streak={streak} />
        </div>
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Middle Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12">
        {/* Main Content Column */}
        <div className="col-span-1 lg:col-span-2 flex flex-col gap-8">
          {/* Consistency widget for mobile (shown only on small screens) */}
          <div className="block lg:hidden">
            <ConsistencyWidget streak={streak} />
          </div>

          <StudyPlanList sessions={sessions} />

          {/* Smart Summaries Section */}
          <SmartSummaries initialSummaries={summaries} />
        </div>

        {/* Sidebar Column */}
        <div className="col-span-1 flex flex-col gap-6">
          <ProgressOverview
            weeklyGoalPct={weeklyGoalPct}
            totalHours={totalActualHours}
            subjectSlices={focus.slices}
          />

          <DeadlineAlert subjects={subjects} />

          <WeeklyChart data={weeklyData} />

          <RecentActivity sessions={recentSessions} />
        </div>
      </div>
    </div>
  );
}
