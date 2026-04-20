import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import type { SubjectRow } from "@/app/(dashboard)/_api/queries";

const themes: Array<{ theme: string; themeSoft: string; icon: string }> = [
  { theme: "bg-indigo-500", themeSoft: "bg-indigo-500/20 text-indigo-300", icon: "Σ" },
  { theme: "bg-orange-400", themeSoft: "bg-orange-400/20 text-orange-300", icon: "🏛" },
  { theme: "bg-amber-600", themeSoft: "bg-amber-600/20 text-amber-300", icon: "◖◗" },
  { theme: "bg-purple-500", themeSoft: "bg-purple-500/20 text-purple-300", icon: "📈" },
  { theme: "bg-blue-500", themeSoft: "bg-blue-500/20 text-blue-300", icon: "🧪" },
];

function formatExamDate(examDate: string | null) {
  if (!examDate) return "—";
  try {
    return format(new Date(examDate), "MMM dd, yyyy");
  } catch {
    return examDate;
  }
}

interface SubjectCardProps {
  subject: SubjectRow;
  index: number;
}

export function SubjectCard({ subject, index }: SubjectCardProps) {
  const t = themes[index % themes.length];

  return (
    <Link
      href={`/dashboard/plan/${subject.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-card border shadow-sm transition-all hover:shadow-md hover:border-primary/30"
    >
      {/* Top Accent Line */}
      <div className={cn("h-1.5 w-full", t.theme)} />

      <div className="p-6 md:p-8 flex flex-col h-full gap-6">
        {/* Icon & Category */}
        <div className="flex items-center justify-between">
          <div
            className={cn(
              "flex items-center justify-center size-10 rounded-xl",
              t.themeSoft,
            )}
          >
            <span className="text-xl leading-none">{t.icon}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
              {(subject.difficulty ?? 0) === 0 ? "—" : `D${subject.difficulty}`} Load
            </span>
          </div>
        </div>

        {/* Title & Tags */}
        <div>
          <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
            {subject.title}
          </h3>
          <div className="flex flex-wrap gap-2">
            {(subject.tags || []).map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-semibold uppercase tracking-wider px-2 py-1 bg-muted/60 rounded-md text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer info: Date & Difficulty */}
        <div className="mt-auto grid grid-cols-2 gap-4 pt-6 border-t border-border/50">
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
              Exam Date
            </span>
            <div className="flex items-center gap-2 text-sm font-medium">
              <CalendarDays className="size-4 text-muted-foreground" />
              {formatExamDate(subject.exam_date)}
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
              Difficulty
            </span>
            <div className="flex items-center gap-1.5 h-full">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={cn(
                    "size-2 rounded-full",
                    i <= (subject.difficulty ?? 0) ? t.theme : "bg-muted-foreground/20",
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
