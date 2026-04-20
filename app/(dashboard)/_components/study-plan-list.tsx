import { Check, Calendar, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import type { StudySessionRow } from "@/app/(dashboard)/_api/queries";
import { format } from "date-fns";

function formatTimeRange(startISO: string, endISO: string) {
  const start = new Date(startISO);
  const end = new Date(endISO);
  return `${format(start, "HH:mm")} - ${format(end, "HH:mm")}`;
}

function toUiStatus(status: StudySessionRow["status"], startISO: string) {
  if (status === "completed") return "completed";
  if (status === "in-progress") return "in-progress";
  const start = new Date(startISO).getTime();
  if (start > Date.now()) return "up-next";
  return "planned";
}

export function StudyPlanList({ sessions }: { sessions: StudySessionRow[] }) {
  const dateLabel = format(new Date(), "MMMM dd, yyyy");

  const rows = sessions.map((s) => {
    const uiStatus = toUiStatus(s.status, s.start_time);
    const tag =
      (s.duration_minutes || 0) >= 90 ? "Deep Work" :
      (s.duration_minutes || 0) >= 45 ? "Active Recall" :
      "Admin";
    return {
      id: s.id,
      title: s.title,
      time: formatTimeRange(s.start_time, s.end_time),
      tag,
      status: uiStatus as "in-progress" | "up-next" | "completed" | "planned",
    };
  });

  return (
    <div className="flex flex-col rounded-2xl bg-transparent">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-muted-foreground" />
          <h3 className="text-xl font-bold tracking-tight">Daily Study Plan</h3>
        </div>
        <span className="text-sm font-medium text-muted-foreground">{dateLabel}</span>
      </div>

      <div className="flex flex-col gap-3">
        {rows.map((session) => (
          <div
            key={session.id}
            className={cn(
              "group relative flex items-center justify-between overflow-hidden rounded-xl border p-4 transition-all hover:border-primary/50",
              session.status === "in-progress"
                ? "border-primary/30 bg-primary/5" 
                : session.status === "completed"
                  ? "border-border/40 bg-muted/20 opacity-60 hover:opacity-100"
                  : "border-border/50 bg-card"
            )}
          >
            {/* Focus Bar for in-progress */}
            {session.status === "in-progress" && (
              <div className="absolute left-0 top-0 h-full w-1 bg-primary" />
            )}

            <div className="flex items-center gap-5">
              {/* Checkbox / Status Indicator */}
              <button
                className={cn(
                  "flex size-6 items-center justify-center rounded-full border transition-all",
                  session.status === "completed"
                    ? "border-primary bg-primary text-primary-foreground"
                    : session.status === "in-progress"
                      ? "border-primary text-primary"
                      : "border-muted-foreground/30 hover:border-primary"
                )}
              >
                {session.status === "completed" && <Check className="size-3.5" />}
              </button>

              <div>
                <h4 className={cn(
                  "font-semibold",
                  session.status === "completed" ? "line-through text-muted-foreground" : "text-foreground"
                )}>
                  {session.title}
                </h4>
                <div className="mt-1 flex items-center gap-3 text-xs font-medium">
                  <span className="text-muted-foreground">{session.time}</span>
                  <span className={cn(
                    "rounded bg-background/50 px-2 py-0.5 text-[10px] uppercase tracking-wider",
                    session.status === "up-next" ? "text-orange-500 bg-orange-500/10" : "text-muted-foreground bg-muted"
                  )}>
                    {session.tag}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {session.status === "in-progress" && (
                <span className="text-xs font-semibold text-primary">In Progress</span>
              )}
              {session.status === "up-next" && (
                <span className="text-xs font-medium text-muted-foreground italic">Up Next</span>
              )}
              {session.status === "completed" && (
                <span className="text-xs font-medium text-muted-foreground">Completed</span>
              )}
              <button className="text-muted-foreground/50 hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical className="size-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
