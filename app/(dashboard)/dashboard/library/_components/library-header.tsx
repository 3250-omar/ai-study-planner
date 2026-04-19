"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useUploadModal } from "@/store/use-upload-modal";

export function LibraryHeader() {
  const { openModal } = useUploadModal();

  return (
    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Library
        </h1>
        <p className="text-muted-foreground text-base leading-relaxed">
          Manage and explore your digital study sanctuary.
        </p>
      </div>
      <Button
        onClick={openModal}
        className="gap-2 rounded-full px-6 h-11 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 shrink-0 w-fit"
      >
        <Plus className="size-4" />
        Upload New
      </Button>
    </div>
  );
}
