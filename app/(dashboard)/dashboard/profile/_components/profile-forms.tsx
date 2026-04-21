"use client";

import { z } from "zod";
import { User, BookOpen, Shield } from "lucide-react";
import { GlobalForm } from "@/components/global-form";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { updateUserProfile, updatePassword } from "@/app/(dashboard)/_api/actions";

// --- Schemas ---

const profileInfoSchema = z.object({
  fullName: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email address"),
  bio: z.string().optional(),
});

const studyPrefSchema = z.object({
  primaryMethod: z.string(),
  weeklyGoal: z.string(),
});

const securitySchema = z.object({
  newPassword: z.string().min(8, "Must be at least 8 characters").optional().or(z.literal("")),
  confirmPassword: z.string().optional().or(z.literal("")),
  twoFactor: z.boolean().default(false),
});

interface ProfileFormsProps {
  userEmail: string;
  displayName: string;
  bio: string;
  studyMethod: string;
  weeklyGoalHours: number;
}

export function ProfileForms({
  userEmail,
  displayName,
  bio,
  studyMethod,
  weeklyGoalHours,
}: ProfileFormsProps) {

  async function handleProfileSubmit(values: Record<string, any>) {
    const result = await updateUserProfile({
      display_name: values.fullName,
      bio: values.bio ?? "",
    });
    if ("error" in result) {
      toast.error("Failed to update profile", { description: result.error });
    } else {
      toast.success("Profile updated successfully");
    }
  }

  async function handlePrefsSubmit(values: Record<string, any>) {
    const goalMap: Record<string, number> = {
      "10 Hours": 10,
      "20 Hours": 20,
      "30 Hours": 30,
      "40+ Hours": 40,
    };
    const result = await updateUserProfile({
      study_method: values.primaryMethod,
      weekly_goal_hours: goalMap[values.weeklyGoal] ?? 20,
    });
    if ("error" in result) {
      toast.error("Failed to update preferences", { description: result.error });
    } else {
      toast.success("Preferences updated successfully");
    }
  }

  async function handlePasswordSubmit(values: Record<string, any>) {
    if (!values.newPassword) return;
    if (values.newPassword !== values.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const result = await updatePassword({ newPassword: values.newPassword });
    if ("error" in result) {
      toast.error("Failed to update password", { description: result.error });
    } else {
      toast.success("Password updated successfully");
    }
  }

  const goalLabel = `${weeklyGoalHours} Hours`;

  return (
    <div className="flex flex-col gap-6">
      
      {/* 1. Profile Information */}
      <div className="rounded-2xl border border-border/50 bg-card p-6 md:p-8 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <h2 className="text-xl font-bold tracking-tight">Profile Information</h2>
            <p className="text-sm text-muted-foreground">Update your photo and personal details.</p>
          </div>
          <div className="hidden sm:flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <User className="size-4" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Avatar UI Mimic */}
          <div className="flex flex-col items-center gap-3 shrink-0">
            <div className="size-32 rounded-2xl bg-muted/50 border-2 border-dashed border-border/60 flex items-center justify-center overflow-hidden relative">
              <div className="absolute inset-x-0 bottom-0 h-10 bg-primary/10 flex items-center justify-center">
                 <div className="flex gap-1">
                   <span className="size-1 rounded-full bg-primary/40"/>
                   <span className="size-1 rounded-full bg-primary/60"/>
                   <span className="size-1 rounded-full bg-primary/80"/>
                   <span className="size-1 rounded-full bg-primary/40"/>
                 </div>
              </div>
              <User className="size-10 text-muted-foreground/30 mb-2"/>
            </div>
          </div>

          <div className="flex-1">
            <GlobalForm
              schema={profileInfoSchema}
              defaultValues={{
                fullName: displayName,
                email: userEmail,
                bio: bio,
              }}
              onSubmit={handleProfileSubmit}
              submitText="Save Profile"
              buttonClassName="h-10 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/20 mt-2"
              fields={[
                {
                  name: "fullName",
                  label: "FULL NAME",
                  type: "text",
                },
                {
                  name: "email",
                  label: "EMAIL ADDRESS",
                  type: "email",
                  // Email is read-only — can't be changed via profile form
                  render: ({ field }) => (
                    <input
                      {...field}
                      disabled
                      className="flex h-10 w-full rounded-xl border border-input bg-muted/40 px-4 py-2 text-sm opacity-60 cursor-not-allowed"
                    />
                  ),
                },
                {
                  name: "bio",
                  label: "BIO (OPTIONAL)",
                  render: ({ field }) => (
                    <textarea 
                      {...field}
                      className="flex min-h-[100px] w-full rounded-xl border border-input bg-muted/30 px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none transition-colors"
                    />
                  )
                }
              ]}
              className="grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 [&>div:last-child]:sm:col-span-2"
            />
          </div>
        </div>
      </div>

      {/* 2. Study Preferences */}
      <div className="rounded-2xl border border-border/50 bg-card p-6 md:p-8 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <h2 className="text-xl font-bold tracking-tight">Study Preferences</h2>
            <p className="text-sm text-muted-foreground">Customize how the AI curator handles your sessions.</p>
          </div>
          <div className="hidden sm:flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <BookOpen className="size-4" />
          </div>
        </div>

        <GlobalForm
          schema={studyPrefSchema}
          defaultValues={{
            primaryMethod: studyMethod,
            weeklyGoal: weeklyGoalHours >= 40 ? "40+ Hours" : goalLabel,
          }}
          onSubmit={handlePrefsSubmit}
          submitText="Save Preferences"
          buttonClassName="h-10 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/20 mt-2"
          fields={[
            {
              name: "primaryMethod",
              label: "PRIMARY STUDY METHOD",
              render: ({ field }) => (
                <select 
                  {...field}
                  className="flex h-12 w-full appearance-none rounded-xl border border-input bg-muted/40 px-4 py-2 text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option>Pomodoro Technique</option>
                  <option>Feynman Technique</option>
                  <option>Spaced Repetition</option>
                </select>
              )
            },
            {
              name: "weeklyGoal",
              label: "WEEKLY STUDY GOAL (HOURS)",
              render: ({ field }) => (
                <select 
                  {...field}
                  className="flex h-12 w-full appearance-none rounded-xl border border-input bg-muted/40 px-4 py-2 text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option>10 Hours</option>
                  <option>20 Hours</option>
                  <option>30 Hours</option>
                  <option>40+ Hours</option>
                </select>
              )
            }
          ]}
          className="grid-cols-1 sm:grid-cols-2 gap-6"
        />
      </div>

      {/* 3. Security */}
      <div className="rounded-2xl border border-border/50 bg-card p-6 md:p-8 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <h2 className="text-xl font-bold tracking-tight">Security</h2>
            <p className="text-sm text-muted-foreground">Update password and authentication settings.</p>
          </div>
          <div className="hidden sm:flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <Shield className="size-4" />
          </div>
        </div>

        <GlobalForm
          schema={securitySchema}
          defaultValues={{
             newPassword: "",
             confirmPassword: "",
             twoFactor: false
          }}
          onSubmit={handlePasswordSubmit}
          submitText="Update Password"
          buttonClassName="h-10 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/20 mt-2"
          fields={[
            {
              name: "newPassword",
              label: "NEW PASSWORD",
              type: "password"
            },
            {
              name: "confirmPassword",
              label: "CONFIRM NEW PASSWORD",
              type: "password"
            },
            {
              name: "twoFactor",
              label: "",
              render: ({ field }) => (
                <div className="col-span-1 md:col-span-2 mt-4 rounded-xl border border-border/60 bg-muted/20 p-5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold">Two-Factor Authentication</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">Add an extra layer of security to your account.</p>
                    </div>
                  </div>
                  <Switch 
                     checked={field.value}
                     onCheckedChange={field.onChange}
                  />
                </div>
              )
            }
          ]}
          className="grid-cols-1 md:grid-cols-2 gap-6"
        />
      </div>

    </div>
  );
}
