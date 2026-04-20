"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock, BookOpen, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import type { SubjectRow, StudySessionRow } from "@/app/(dashboard)/_api/queries";

const themes: Array<{ theme: string; themeSoft: string; icon: string }> = [
  { theme: "bg-indigo-500", themeSoft: "bg-indigo-500/20 text-indigo-300", icon: "Σ" },
  { theme: "bg-orange-400", themeSoft: "bg-orange-400/20 text-orange-300", icon: "🏛" },
  { theme: "bg-amber-600", themeSoft: "bg-amber-600/20 text-amber-300", icon: "◖◗" },
  { theme: "bg-purple-500", themeSoft: "bg-purple-500/20 text-purple-300", icon: "📈" },
  { theme: "bg-blue-500", themeSoft: "bg-blue-500/20 text-blue-300", icon: "🧪" },
];

interface SubjectDetailClientProps {
  subject: SubjectRow;
  sessions: StudySessionRow[];
}

export function SubjectDetailClient({ subject, sessions }: SubjectDetailClientProps) {
  const themeIdx = React.useMemo(() => {
    const idx = Math.abs(hashCode(subject.id)) % themes.length;
    return idx;
  }, [subject.id]);
  const t = themes[themeIdx];

  const totalMinutes = sessions.reduce((sum, s) => sum + (s.duration_minutes || 0), 0);
  const completedSessions = sessions.filter((s) => s.status === "completed").length;

  return (
    <div className="flex flex-col gap-8">
      {/* Back link */}
      <Link
        href="/dashboard/plan"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
      >
        <ArrowLeft className="size-4" />
        Back to Subjects
      </Link>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "flex items-center justify-center size-14 rounded-2xl",
              t.themeSoft,
            )}
          >
            <span className="text-2xl leading-none">{t.icon}</span>
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              {subject.title}
            </h1>
            <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
              {subject.category && (
                <span className="uppercase tracking-wider font-semibold">
                  {subject.category}
                </span>
              )}
              {subject.exam_date && (
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="size-3.5" />
                  Exam: {format(new Date(subject.exam_date), "MMM dd, yyyy")}
                </span>
              )}
            </div>
          </div>
        </div>
        <Button className="gap-2 w-fit">
          <Plus className="size-4" />
          Schedule Session
        </Button>
      </div>

      {/* Tags */}
      {subject.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {subject.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-semibold uppercase tracking-wider px-3 py-1.5 bg-muted/60 rounded-lg text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-border/50 bg-card p-5">
          <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
            Total Study Time
          </div>
          <div className="text-2xl font-bold">
            {Math.floor(totalMinutes / 60)}h {totalMinutes % 60}m
          </div>
        </div>
        <div className="rounded-xl border border-border/50 bg-card p-5">
          <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
            Sessions Completed
          </div>
          <div className="text-2xl font-bold">{completedSessions}</div>
        </div>
        <div className="rounded-xl border border-border/50 bg-card p-5">
          <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
            Difficulty
          </div>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={cn(
                  "size-3 rounded-full",
                  i <= (subject.difficulty ?? 0) ? t.theme : "bg-muted-foreground/20",
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Recent Sessions */}
      <div>
        <h2 className="text-xl font-bold tracking-tight mb-4">Recent Sessions</h2>
        {sessions.length === 0 ? (
          <div className="rounded-xl border border-border/50 bg-card p-8 text-center">
            <BookOpen className="size-8 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-muted-foreground">No study sessions recorded yet.</p>
            <p className="text-sm text-muted-foreground/60 mt-1">
              Schedule your first session to start tracking progress.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {sessions.slice(0, 10).map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between rounded-xl border border-border/50 bg-card p-4"
              >
                <div>
                  <h4 className="font-semibold text-sm">{session.title}</h4>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <Clock className="size-3" />
                    <span>{session.duration_minutes} min</span>
                    <span>•</span>
                    <span>{format(new Date(session.start_time), "MMM dd, HH:mm")}</span>
                  </div>
                </div>
                <span
                  className={cn(
                    "text-xs font-semibold px-2.5 py-1 rounded-full",
                    session.status === "completed"
                      ? "bg-green-500/10 text-green-600"
                      : session.status === "in-progress"
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground",
                  )}
                >
                  {session.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return hash;
}
