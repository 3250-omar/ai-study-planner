"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LayoutGrid, List } from "lucide-react";
import { FileGridCard, FileListRow, type FileItem } from "./file-card";
import { FolderOpen } from "lucide-react";

interface LibraryBrowserProps {
  initialDocuments: FileItem[];
}

const categories = [
  { label: "All Files", value: "all" },
  { label: "Textbooks", value: "textbooks" },
  { label: "Research Papers", value: "research" },
  { label: "Personal Notes", value: "notes" },
  { label: "Lecture Slides", value: "slides" },
];

export function LibraryBrowser({ initialDocuments }: LibraryBrowserProps) {
  const [activeCategory, setActiveCategory] = React.useState("all");
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");

  if (initialDocuments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6 rounded-3xl border border-dashed border-border/60 bg-muted/20">
        <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-5">
          <FolderOpen className="size-8" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">Your library is empty</h3>
        <p className="text-muted-foreground text-center max-w-sm">
          Upload your study materials, research papers, or notes to get started with AuraStudy AI.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* ============ Filter Bar ============ */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.value;
            return (
              <Button
                key={cat.value}
                variant={isActive ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(cat.value)}
                className={cn(
                  "rounded-full px-5 transition-all",
                  isActive
                    ? "shadow-md shadow-primary/20"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground border-border/50"
                )}
              >
                {cat.label}
              </Button>
            );
          })}
        </div>

        {/* View Toggle */}
        <div className="flex items-center rounded-xl border border-border/50 bg-muted/30 p-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setViewMode("grid")}
            className={cn(
              "size-9 rounded-lg transition-all",
              viewMode === "grid"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <LayoutGrid className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setViewMode("list")}
            className={cn(
              "size-9 rounded-lg transition-all",
              viewMode === "list"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <List className="size-4" />
          </Button>
        </div>
      </div>

      {/* ============ Files ============ */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {initialDocuments.map((file, index) => (
            <FileGridCard key={file.id} file={file} index={index} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {initialDocuments.map((file, index) => (
            <FileListRow key={file.id} file={file} index={index} />
          ))}
        </div>
      )}

      {/* ============ Footer / Load More ============ */}
      <div className="flex flex-col items-center gap-3 pt-4">
        <p className="text-sm text-muted-foreground">
          Showing {initialDocuments.length} total materials.
        </p>
      </div>
    </>
  );
}

