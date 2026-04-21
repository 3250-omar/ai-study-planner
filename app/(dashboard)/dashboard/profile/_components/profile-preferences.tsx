"use client";

import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { RotateCcw, Trash2, LogOut } from "lucide-react";
import { logout } from "@/app/(dashboard)/_api/actions";
import { toast } from "sonner";
import * as React from "react";

export function ProfilePreferences() {
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  async function handleLogout() {
    setIsLoggingOut(true);
    try {
      await logout();
    } catch {
      toast.error("Failed to log out");
      setIsLoggingOut(false);
    }
  }
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-col gap-6">
      {/* Preferences Block */}
      <div className="rounded-2xl border border-border/50 bg-card p-6 md:p-8 shadow-sm">
        <h2 className="text-xl font-bold tracking-tight mb-6">Preferences</h2>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
              </div>
              <span className="text-sm font-semibold">Dark Mode</span>
            </div>
            <Switch
              checked={theme === "dark" ? true : false}
              onCheckedChange={(checked) =>
                setTheme(checked ? "dark" : "light")
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <span className="text-sm font-semibold">Email Notifications</span>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-muted-foreground">
                SMS Reminders
              </span>
            </div>
            <Switch disabled />
          </div>
        </div>
      </div>

      {/* Log Out */}
      <Button
        variant="outline"
        onClick={handleLogout}
        disabled={isLoggingOut}
        className="w-full h-12 rounded-xl text-sm font-bold gap-2 border-border/60 hover:bg-muted/50"
      >
        <LogOut className="size-4" />
        {isLoggingOut ? "Logging out..." : "Log Out"}
      </Button>

      {/* Danger Zone Block */}
      <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 md:p-8 shadow-sm">
        <div className="space-y-1 mb-6">
          <h2 className="text-xl font-bold tracking-tight text-destructive">
            Danger Zone
          </h2>
          <p className="text-xs text-muted-foreground">
            Irreversible actions that affect your data.
          </p>
        </div>

        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full justify-start h-12 px-5 text-sm font-bold border-border/60 hover:bg-muted/50 rounded-xl"
          >
            <RotateCcw className="mr-3 size-4 opacity-70" />
            Reset Learning Progress
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start h-12 px-5 text-sm font-bold border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive rounded-xl"
          >
            <Trash2 className="mr-3 size-4 opacity-70" />
            Delete My Account
          </Button>
        </div>
      </div>

      {/* Save Actions Block */}
      <div className="flex flex-col gap-3">
        <Button className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 text-sm tracking-widest uppercase">
          Save All Changes
        </Button>
        <Button
          variant="ghost"
          className="w-full h-12 rounded-xl text-muted-foreground hover:bg-muted/50 font-bold text-sm"
        >
          Cancel Changes
        </Button>
      </div>
    </div>
  );
}
