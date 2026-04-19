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

import { formatDistanceToNow } from "date-fns";

export interface FileItem {
  id: string;
  title: string;
  file_path: string;
  file_type: string;
  size_bytes: number;
  created_at: string;
}

const getFileIcon = (fileType: string) => {
  if (fileType.includes("pdf")) return BookOpen;
  if (fileType.includes("word") || fileType.includes("doc")) return FileText;
  if (fileType.includes("presentation") || fileType.includes("pptx")) return Presentation;
  return StickyNote;
};

const getFileGradient = (index: number) => {
  const gradients = [
    "from-slate-500/80 to-slate-700/80 dark:from-slate-600 dark:to-slate-800",
    "from-sky-500/80 to-sky-700/80 dark:from-sky-600 dark:to-sky-800",
    "from-violet-500/80 to-violet-700/80 dark:from-violet-600 dark:to-violet-800",
    "from-teal-500/80 to-teal-700/80 dark:from-teal-600 dark:to-teal-800",
  ];
  return gradients[index % gradients.length];
};

const formatSize = (bytes: number) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};


/* ------------------------------------------------------------------ */
/*  Grid Card                                                          */
/* ------------------------------------------------------------------ */

export function FileGridCard({ file, index }: { file: FileItem; index: number }) {
  const Icon = getFileIcon(file.file_type);
  const gradient = getFileGradient(index);
  const formattedDate = formatDistanceToNow(new Date(file.created_at), { addSuffix: true });
  const size = formatSize(file.size_bytes);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-card transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 cursor-pointer">
      {/* Thumbnail / Preview Area */}
      <div
        className={cn(
          "relative flex items-center justify-center h-44 bg-gradient-to-br overflow-hidden",
          gradient
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
            "relative flex size-12 items-center justify-center rounded-xl text-white shadow-lg bg-primary/20 backdrop-blur-md ring-1 ring-white/20"
          )}
        >
          <Icon className="size-6" />
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
          {file.title}
        </h3>

        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Clock className="size-3" />
          <span className="text-[11px]">Uploaded {formattedDate}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            {file.file_type.split("/")[1]?.toUpperCase() || "DOCUMENT"}
          </span>
          <span className="text-[10px] font-mono text-muted-foreground/70">
            {size}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  List Row                                                           */
/* ------------------------------------------------------------------ */

export function FileListRow({ file, index }: { file: FileItem; index: number }) {
  const Icon = getFileIcon(file.file_type);
  const gradient = getFileGradient(index);
  const formattedDate = formatDistanceToNow(new Date(file.created_at), { addSuffix: true });
  const size = formatSize(file.size_bytes);

  return (
    <div className="group flex items-center gap-5 rounded-xl border border-border/50 bg-card p-4 transition-all hover:border-primary/30 hover:shadow-sm cursor-pointer">
      {/* Icon */}
      <div
        className={cn(
          "flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white",
          gradient
        )}
      >
        <Icon className="size-5" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm truncate group-hover:text-primary transition-colors">
          {file.title}
        </h3>
        <div className="mt-1 flex items-center gap-3 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="size-3" />
            Uploaded {formattedDate}
          </span>
          <span className="font-bold uppercase tracking-wider">
            {file.file_type.split("/")[1]?.toUpperCase() || "DOCUMENT"}
          </span>
        </div>
      </div>

      {/* Size + Actions */}
      <div className="flex items-center gap-4 shrink-0">
        <span className="text-xs font-mono text-muted-foreground hidden sm:block">
          {size}
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

