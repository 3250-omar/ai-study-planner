"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useTaskModal } from "@/store/use-task-modal";
import { GlobalForm, FormFieldConfig } from "@/components/global-form";
import * as z from "zod";
import { CheckSquare } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createStudyTask } from "@/app/(dashboard)/_api/actions";

const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  dueDate: z.string().optional(),
});

export function TaskModal() {
  const { isOpen, closeModal } = useTaskModal();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const router = useRouter();

  const onSubmit = async (values: Record<string, any>) => {
    try {
      setIsSubmitting(true);

      const result = await createStudyTask({
        title: values.title,
        due_at: values.dueDate ? new Date(values.dueDate).toISOString() : undefined,
      });

      if ("error" in result) {
        throw new Error(result.error);
      }

      toast.success("Task created!");
      router.refresh();
      closeModal();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "An unexpected error occurred";
      toast.error("Failed to create task", { description: message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fields: FormFieldConfig[] = [
    {
      name: "title",
      label: "Task Title",
      placeholder: "e.g., Complete problem set 3",
      autoCapitalize: "words",
    },
    {
      name: "dueDate",
      label: "Due Date (Optional)",
      type: "date",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="max-w-lg! p-0 border-none bg-card">
        <div className="p-8 space-y-8">
          <DialogHeader className="p-0 text-left space-y-3">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary font-mono">
              Task Manager
            </span>
            <DialogTitle className="text-2xl font-bold tracking-tight">
              Create Study Task
            </DialogTitle>
            <DialogDescription className="text-muted-foreground leading-relaxed">
              Add a task to track. Mark it complete when done.
            </DialogDescription>
          </DialogHeader>

          <GlobalForm
            schema={taskSchema}
            defaultValues={{
              title: "",
              dueDate: "",
            }}
            onSubmit={onSubmit}
            fields={fields}
            isLoading={isSubmitting}
            className="gap-6"
            submitText={
              <span className="flex items-center gap-2">
                <CheckSquare className="size-4" />
                {isSubmitting ? "Creating..." : "Create Task"}
              </span>
            }
            buttonClassName="h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/20 mt-2"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
