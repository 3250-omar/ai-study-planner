"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Clock,
  MoreVertical,
  BookOpen,
  FileText,
  StickyNote,
  Presentation,
  Download,
  Trash2,
  Sparkles,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { deleteLibraryDocument, getSignedUrlAction, triggerSummarize } from "@/app/(dashboard)/_api/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export interface FileItem {
  id: string;
  title: string;
  file_path: string;
  file_type: string;
  size_bytes: number;
  created_at: string;
  summary?: string | null;
}

const getFileGradient = (index: number) => {
  const gradients = [
    "from-indigo-500/80 to-indigo-700/80 dark:from-indigo-600 dark:to-indigo-800",
    "from-sky-500/80 to-sky-700/80 dark:from-sky-600 dark:to-sky-800",
    "from-violet-500/80 to-violet-700/80 dark:from-violet-600 dark:to-violet-800",
    "from-rose-500/80 to-rose-700/80 dark:from-rose-600 dark:to-rose-800",
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

function FileActions({ file }: { file: FileItem }) {
  const [isSummarizing, setIsSummarizing] = React.useState(false);
  const router = useRouter();

  const handleDownload = async () => {
    try {
      const result = await getSignedUrlAction(file.file_path);
      if ("error" in result) throw new Error(result.error);
      window.open(result.url, "_blank");
    } catch {
      toast.error("Failed to generate download link");
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${file.title}"?`)) return;
    try {
      const result = await deleteLibraryDocument({ id: file.id });
      if ("error" in result) throw new Error(result.error);
      toast.success("Document deleted");
      router.refresh();
    } catch {
      toast.error("Failed to delete document");
    }
  };

  const handleSummarize = async () => {
    try {
      setIsSummarizing(true);
      const result = await triggerSummarize(file.id);
      if ("error" in result) throw new Error(result.error);
      toast.success("Summary generated!");
      router.refresh();
    } catch (e: any) {
      toast.error(e.message || "Failed to generate summary");
    } finally {
      setIsSummarizing(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-8 rounded-full bg-black/20 text-white/70 backdrop-blur-sm hover:bg-black/40 hover:text-white transition-all"
        >
          {isSummarizing ? <Loader2 className="size-4 animate-spin" /> : <MoreVertical className="size-4" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[180px] rounded-xl shadow-xl">
        <DropdownMenuItem onClick={handleSummarize} disabled={isSummarizing}>
          <Sparkles className="size-4 mr-2 text-indigo-500" />
          {file.summary ? "Re-summarize" : "Summarize AI"}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDownload}>
          <Download className="size-4 mr-2" />
          Download
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDelete} className="text-destructive focus:bg-destructive/10">
          <Trash2 className="size-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function FileGridCard({
  file,
  index,
}: {
  file: FileItem;
  index: number;
}) {
  const [showSummary, setShowSummary] = React.useState(false);
  const gradient = getFileGradient(index);
  const formattedDate = formatDistanceToNow(new Date(file.created_at), { addSuffix: true });
  const size = formatSize(file.size_bytes);

  return (
    <div 
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-card transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
      onClick={() => file.summary && setShowSummary(!showSummary)}
    >
      <div className={cn("relative flex items-center justify-center h-44 bg-gradient-to-br overflow-hidden", gradient)}>
        <div className="absolute inset-0 opacity-[0.08]">
          <div className="space-y-2 p-5 pt-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-1.5 rounded-full bg-white" style={{ width: `${50 + i * 7}%` }} />
            ))}
          </div>
        </div>

        <div className="relative flex size-12 items-center justify-center rounded-xl text-white shadow-lg bg-primary/20 backdrop-blur-md ring-1 ring-white/20">
          {file.file_type.includes("pdf") ? <BookOpen className="size-6" /> : <FileText className="size-6" />}
        </div>

        {file.summary && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-500/20 text-white backdrop-blur-sm border border-white/20">
            <CheckCircle className="size-3" />
            <span className="text-[9px] font-bold uppercase tracking-wider">Summarized</span>
          </div>
        )}

        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <FileActions file={file} />
        </div>
      </div>

      <div className="p-4 space-y-3 relative">
        <h3 className="font-semibold text-sm truncate group-hover:text-primary transition-colors">
          {file.title}
        </h3>

        {!showSummary ? (
          <>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="size-3" />
              <span className="text-[11px]">Uploaded {formattedDate}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                {file.file_type.split("/")[1]?.toUpperCase() || "DOCUMENT"}
              </span>
              <span className="text-[10px] font-mono text-muted-foreground/70">{size}</span>
            </div>
          </>
        ) : (
          <div className="bg-muted/50 rounded-lg p-3 animate-in fade-in slide-in-from-top-1">
            <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-4 italic">
              "{file.summary}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export function FileListRow({
  file,
  index,
}: {
  file: FileItem;
  index: number;
}) {
  const gradient = getFileGradient(index);
  const formattedDate = formatDistanceToNow(new Date(file.created_at), { addSuffix: true });
  const size = formatSize(file.size_bytes);

  return (
    <div className="group flex items-center gap-5 rounded-xl border border-border/50 bg-card p-4 transition-all hover:border-primary/30 hover:shadow-sm">
      <div className={cn("flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white", gradient)}>
        {file.file_type.includes("pdf") ? <BookOpen className="size-5" /> : <FileText className="size-5" />}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm truncate group-hover:text-primary transition-colors">
          {file.title}
        </h3>
        <div className="mt-1 flex items-center gap-3 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="size-3" />
            Uploaded {formattedDate}
          </span>
          {file.summary && (
            <span className="flex items-center gap-1 text-green-600 font-bold uppercase tracking-widest">
              <CheckCircle className="size-3" />
              Summary Ready
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 shrink-0">
        <span className="text-xs font-mono text-muted-foreground hidden sm:block">{size}</span>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <FileActions file={file} />
        </div>
      </div>
    </div>
  );
}
