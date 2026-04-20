import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Clock, ChevronRight } from "lucide-react";
import type { StudySessionRow } from "@/app/(dashboard)/_api/queries";

interface RecentActivityProps {
  sessions: StudySessionRow[];
}

export function RecentActivity({ sessions }: RecentActivityProps) {
  if (sessions.length === 0) {
    return (
      <div className="rounded-2xl bg-card p-6 border border-border/50 shadow-sm">
        <h3 className="text-lg font-bold tracking-tight mb-4">Recent Activity</h3>
        <p className="text-sm text-muted-foreground">
          No recent sessions. Start your first study session today!
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-card p-6 border border-border/50 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold tracking-tight">Recent Activity</h3>
        <Link
          href="/dashboard/analytics"
          className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
        >
          View all
          <ChevronRight className="size-3" />
        </Link>
      </div>

      <div className="space-y-3">
        {sessions.slice(0, 5).map((session) => (
          <div
            key={session.id}
            className="flex items-center justify-between py-2 border-b border-border/30 last:border-0"
          >
            <div>
              <p className="font-medium text-sm">{session.title}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                <span>{session.subject}</span>
                <span>•</span>
                <span>{session.duration_minutes} min</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="size-3" />
              {formatDistanceToNow(new Date(session.start_time), { addSuffix: true })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
