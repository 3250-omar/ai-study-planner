"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LayoutGrid, List } from "lucide-react";
import { FileGridCard, FileListRow, libraryFiles } from "./file-card";

const categories = [
  { label: "All Files", value: "all" },
  { label: "Textbooks", value: "textbooks" },
  { label: "Research Papers", value: "research" },
  { label: "Personal Notes", value: "notes" },
  { label: "Lecture Slides", value: "slides" },
];

export function LibraryBrowser() {
  const [activeCategory, setActiveCategory] = React.useState("all");
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");

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
          {libraryFiles.map((file) => (
            <FileGridCard key={file.id} file={file} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {libraryFiles.map((file) => (
            <FileListRow key={file.id} file={file} />
          ))}
        </div>
      )}

      {/* ============ Footer / Load More ============ */}
      <div className="flex flex-col items-center gap-3 pt-4">
        <p className="text-sm text-muted-foreground">
          Showing {libraryFiles.length} of 128 total materials.
        </p>
        <Button
          variant="link"
          className="text-sm font-semibold text-primary"
        >
          Load more files
        </Button>
      </div>
    </>
  );
}
