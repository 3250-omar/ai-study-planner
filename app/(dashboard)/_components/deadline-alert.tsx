"use client";

import { useMemo } from "react";
import { differenceInDays, format } from "date-fns";
import { AlertTriangle, Calendar } from "lucide-react";
import type { SubjectRow } from "@/app/(dashboard)/_api/queries";

interface DeadlineAlertProps {
  subjects: SubjectRow[];
}

export function DeadlineAlert({ subjects }: DeadlineAlertProps) {
  const { subject, daysLeft } = useMemo(() => {
    const now = new Date();
    const upcoming = subjects
      .filter(
        (s) => s.exam_date && differenceInDays(new Date(s.exam_date), now) >= 0,
      )
      .sort((a, b) => {
        if (!a.exam_date || !b.exam_date) return 0;
        return (
          new Date(a.exam_date).getTime() - new Date(b.exam_date).getTime()
        );
      })
      .slice(0, 1);

    if (upcoming.length === 0) return { subject: null, daysLeft: 0 };
    const s = upcoming[0];
    const days = s.exam_date ? differenceInDays(new Date(s.exam_date), now) : 0;
    return { subject: s, daysLeft: days };
  }, [subjects]);

  if (!subject) {
    return null;
  }

  return (
    <div className="flex items-center gap-4 rounded-xl border border-destructive/20 bg-destructive/10 p-4">
      <div className="flex size-10 items-center justify-center rounded-lg bg-destructive/20 text-destructive">
        <AlertTriangle className="size-5" />
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-foreground">
          {subject.title} Exam in{" "}
          {daysLeft === 0
            ? "Today"
            : `${daysLeft} Day${daysLeft === 1 ? "" : "s"}`}
        </h4>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
          <Calendar className="size-3" />
          <span>
            {subject.exam_date
              ? format(new Date(subject.exam_date), "MMMM dd, yyyy")
              : "TBD"}
          </span>
        </div>
      </div>
    </div>
  );
}
