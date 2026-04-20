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
} from "../_api/queries";
import { useUploadModal } from "@/store/use-upload-modal";

export default async function DashboardPage() {
  const [sessions, userData, recentSessions, subjects, weeklyData] =
    await Promise.all([
      getTodayStudyPlan(),
      getUserProfile(),
      getRecentStudySessions(5),
      getSubjects(),
      getWeeklyStudyHours(),
    ]);

  const userName =
    userData?.profile?.display_name ||
    userData?.user?.email?.split("@")[0] ||
    "there";
  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Top Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GreetingWidget userName={userName} />
        <div className="col-span-1 hidden lg:block">
          <ConsistencyWidget />
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
            <ConsistencyWidget />
          </div>

          <StudyPlanList sessions={sessions} />

          {/* Smart Summaries Section */}
          <SmartSummaries />
        </div>

        {/* Sidebar Column */}
        <div className="col-span-1 flex flex-col gap-6">
          <ProgressOverview />

          <DeadlineAlert subjects={subjects} />

          <WeeklyChart data={weeklyData} />

          <RecentActivity sessions={recentSessions} />
        </div>
      </div>
    </div>
  );
}
