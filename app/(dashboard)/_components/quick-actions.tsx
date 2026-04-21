"use client";

import { Button } from "@/components/ui/button";
import { Play, Upload, MessageSquare, CheckSquare } from "lucide-react";
import { useUploadModal } from "@/store/use-upload-modal";
import { useAiTutorModal } from "@/store/use-ai-tutor-modal";
import { useSessionModal } from "@/store/use-session-modal";
import { useTaskModal } from "@/store/use-task-modal";

export function QuickActions() {
  const { openModal: openUpload } = useUploadModal();
  const { toggleModal: toggleAI } = useAiTutorModal();
  const { openModal: openSession } = useSessionModal();
  const { openModal: openTask } = useTaskModal();

  return (
    <div className="flex flex-wrap gap-3">
      <Button className="gap-2" onClick={openSession}>
        <Play className="size-4" />
        Start Focus Session
      </Button>
      <Button variant="outline" className="gap-2" onClick={openTask}>
        <CheckSquare className="size-4" />
        Add Task
      </Button>
      <Button variant="outline" className="gap-2" onClick={openUpload}>
        <Upload className="size-4" />
        Upload Material
      </Button>
      <Button variant="secondary" className="gap-2" onClick={toggleAI}>
        <MessageSquare className="size-4" />
        Ask AI Tutor
      </Button>
    </div>
  );
}
