import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Clock,
  MoreVertical,
  BookOpen,
  FileText,
  StickyNote,
  Presentation,
  type LucideIcon,
} from "lucide-react";

export interface FileItem {
  id: number;
  name: string;
  opened: string;
  subject: string;
  size: string;
  gradient: string;
  iconBg: string;
  Icon: LucideIcon;
}

export const libraryFiles: FileItem[] = [
  {
    id: 1,
    name: "Principles of Macroeconomics",
    opened: "Opened 2h ago",
    subject: "ECONOMICS",
    size: "14.2 MB",
    gradient:
      "from-slate-500/80 to-slate-700/80 dark:from-slate-600 dark:to-slate-800",
    iconBg: "bg-red-500/90",
    Icon: BookOpen,
  },
  {
    id: 2,
    name: "Neural Plasticity Research",
    opened: "Opened yesterday",
    subject: "BIOLOGY",
    size: "2.8 MB",
    gradient:
      "from-sky-500/80 to-sky-700/80 dark:from-sky-600 dark:to-sky-800",
    iconBg: "bg-emerald-500/90",
    Icon: FileText,
  },
  {
    id: 3,
    name: "Modern Philosophy Notes",
    opened: "Opened 3 days ago",
    subject: "PHILOSOPHY",
    size: "45 KB",
    gradient:
      "from-violet-500/80 to-violet-700/80 dark:from-violet-600 dark:to-violet-800",
    iconBg: "bg-violet-500/90",
    Icon: StickyNote,
  },
  {
    id: 4,
    name: "Algorithms Data Structures",
    opened: "Opened 5 days ago",
    subject: "CS",
    size: "1.1 MB",
    gradient:
      "from-teal-500/80 to-teal-700/80 dark:from-teal-600 dark:to-teal-800",
    iconBg: "bg-green-500/90",
    Icon: Presentation,
  },
];

/* ------------------------------------------------------------------ */
/*  Grid Card                                                          */
/* ------------------------------------------------------------------ */

export function FileGridCard({ file }: { file: FileItem }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-card transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 cursor-pointer">
      {/* Thumbnail / Preview Area */}
      <div
        className={cn(
          "relative flex items-center justify-center h-44 bg-gradient-to-br overflow-hidden",
          file.gradient
        )}
      >
        {/* Decorative document lines */}
        <div className="absolute inset-0 opacity-[0.08]">
          <div className="space-y-2 p-5 pt-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-1.5 rounded-full bg-white"
                style={{ width: `${50 + i * 7}%` }}
              />
            ))}
          </div>
        </div>

        {/* File type icon */}
        <div
          className={cn(
            "relative flex size-12 items-center justify-center rounded-xl text-white shadow-lg",
            file.iconBg
          )}
        >
          <file.Icon className="size-6" />
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 dark:group-hover:bg-black/20 transition-colors" />

        {/* More options */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 size-8 rounded-full bg-black/20 text-white/70 opacity-0 group-hover:opacity-100 backdrop-blur-sm hover:bg-black/40 hover:text-white transition-all"
        >
          <MoreVertical className="size-4" />
        </Button>
      </div>

      {/* Info Area */}
      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-sm truncate group-hover:text-primary transition-colors">
          {file.name}
        </h3>

        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Clock className="size-3" />
          <span className="text-[11px]">{file.opened}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            {file.subject}
          </span>
          <span className="text-[10px] font-mono text-muted-foreground/70">
            {file.size}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  List Row                                                           */
/* ------------------------------------------------------------------ */

export function FileListRow({ file }: { file: FileItem }) {
  return (
    <div className="group flex items-center gap-5 rounded-xl border border-border/50 bg-card p-4 transition-all hover:border-primary/30 hover:shadow-sm cursor-pointer">
      {/* Icon */}
      <div
        className={cn(
          "flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white",
          file.gradient
        )}
      >
        <file.Icon className="size-5" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm truncate group-hover:text-primary transition-colors">
          {file.name}
        </h3>
        <div className="mt-1 flex items-center gap-3 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="size-3" />
            {file.opened}
          </span>
          <span className="font-bold uppercase tracking-wider">
            {file.subject}
          </span>
        </div>
      </div>

      {/* Size + Actions */}
      <div className="flex items-center gap-4 shrink-0">
        <span className="text-xs font-mono text-muted-foreground hidden sm:block">
          {file.size}
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="size-8 text-muted-foreground/50 hover:text-foreground opacity-0 group-hover:opacity-100 transition-all"
        >
          <MoreVertical className="size-4" />
        </Button>
      </div>
    </div>
  );
}
