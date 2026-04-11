import { GreetingWidget } from "../_components/greeting-widget";
import { ConsistencyWidget } from "../_components/consistency-widget";
import { StudyPlanList } from "../_components/study-plan-list";
import { ProgressOverview } from "../_components/progress-widget";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Top Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GreetingWidget />
        <div className="col-span-1 hidden lg:block">
          <ConsistencyWidget />
        </div>
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12">
        {/* Main Content Column */}
        <div className="col-span-1 lg:col-span-2 flex flex-col gap-8">
          {/* Consistency widget for mobile (shown only on small screens) */}
          <div className="block lg:hidden">
            <ConsistencyWidget />
          </div>

          <StudyPlanList />
        </div>

        {/* Sidebar Column */}
        <div className="col-span-1 flex flex-col gap-8">
          <ProgressOverview />

          {/* Alert Widget placeholder */}
          <div className="flex items-center gap-4 rounded-xl border border-destructive/20 bg-destructive/10 p-4">
            <div className="flex size-10 items-center justify-center rounded-lg bg-destructive/20 text-destructive">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                <path d="M12 9v4" />
                <path d="M12 17h.01" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-foreground">
                Midterm Exam in 3 Days
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5 mt-1">
                Foundations of Law: Section A.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
