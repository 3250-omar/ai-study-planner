"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Play, Upload, MessageSquare } from "lucide-react";
import { useUploadModal } from "@/store/use-upload-modal";
import { useAiTutorModal } from "@/store/use-ai-tutor-modal";

export function QuickActions() {
  const { openModal } = useUploadModal();
  const { toggleModal } = useAiTutorModal();
  return (
    <div className="flex flex-wrap gap-3">
      <Link href="/dashboard/plan">
        <Button className="gap-2">
          <Play className="size-4" />
          Start Focus Session
        </Button>
      </Link>
      <Button variant="outline" className="gap-2" onClick={openModal}>
        <Upload className="size-4" />
        Upload Material
      </Button>
      <Button variant="secondary" className="gap-2" onClick={toggleModal}>
        <MessageSquare className="size-4" />
        Ask AI Tutor
      </Button>
    </div>
  );
}
