import { ProfileForms } from "./_components/profile-forms";
import { ProfilePreferences } from "./_components/profile-preferences";
import { getUserProfile } from "@/app/(dashboard)/_api/queries";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const result = await getUserProfile();
  if (!result || !result.user) redirect("/sign-in");

  const { user, profile } = result;

  const displayName =
    profile?.display_name || profile?.name || user.email?.split("@")[0] || "User";
  const bio = profile?.bio ?? "";
  const studyMethod = profile?.study_method ?? "Pomodoro Technique";
  const weeklyGoalHours = profile?.weekly_goal_hours ?? 20;

  return (
    <div className="flex flex-col gap-6 pb-10">
      <div className="space-y-2 mb-2">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground text-sm max-w-[500px] leading-relaxed">
          Manage your personal information, preferences, and security.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
        {/* Main Forms Column (takes 8/12 grid spaces on desktop) */}
        <div className="lg:col-span-8">
          <ProfileForms
            userEmail={user.email ?? ""}
            displayName={displayName}
            bio={bio}
            studyMethod={studyMethod}
            weeklyGoalHours={weeklyGoalHours}
          />
        </div>

        {/* Global Preferences / Actions Column (takes 4/12 grid spaces on desktop) */}
        <div className="lg:col-span-4 sticky top-6">
          <ProfilePreferences />
        </div>
      </div>
    </div>
  );
}
