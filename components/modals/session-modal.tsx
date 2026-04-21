"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useSessionModal } from "@/store/use-session-modal";
import { GlobalForm, FormFieldConfig } from "@/components/global-form";
import * as z from "zod";
import { Clock } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createStudySession } from "@/app/(dashboard)/_api/actions";

const sessionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subject: z.string().min(1, "Subject is required"),
  date: z.string().min(1, "Date is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
});

export function SessionModal() {
  const { isOpen, closeModal } = useSessionModal();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const router = useRouter();

  const onSubmit = async (values: Record<string, any>) => {
    try {
      setIsSubmitting(true);

      const startISO = `${values.date}T${values.startTime}:00`;
      const endISO = `${values.date}T${values.endTime}:00`;
      const start = new Date(startISO);
      const end = new Date(endISO);
      const durationMinutes = Math.max(0, Math.round((end.getTime() - start.getTime()) / 60000));

      if (durationMinutes <= 0) {
        toast.error("End time must be after start time");
        setIsSubmitting(false);
        return;
      }

      const result = await createStudySession({
        title: values.title,
        subject: values.subject,
        start_time: start.toISOString(),
        end_time: end.toISOString(),
        duration_minutes: durationMinutes,
        status: "planned",
      });

      if ("error" in result) {
        throw new Error(result.error);
      }

      toast.success("Study session created!");
      router.refresh();
      closeModal();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "An unexpected error occurred";
      toast.error("Failed to create session", { description: message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const today = new Date().toISOString().slice(0, 10);

  const fields: FormFieldConfig[] = [
    {
      name: "title",
      label: "Session Title",
      placeholder: "e.g., Chapter 5 Review",
      autoCapitalize: "words",
    },
    {
      name: "subject",
      label: "Subject",
      placeholder: "e.g., Physics, Economics",
      autoCapitalize: "words",
    },
    {
      name: "date",
      label: "Date",
      type: "date",
    },
    {
      name: "startTime",
      label: "Start Time",
      type: "time",
    },
    {
      name: "endTime",
      label: "End Time",
      type: "time",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="max-w-lg! p-0 border-none bg-card">
        <div className="p-8 space-y-8">
          <DialogHeader className="p-0 text-left space-y-3">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary font-mono">
              Study Planner
            </span>
            <DialogTitle className="text-2xl font-bold tracking-tight">
              Schedule Study Session
            </DialogTitle>
            <DialogDescription className="text-muted-foreground leading-relaxed">
              Plan a focused study block. Sessions are tracked in your
              analytics.
            </DialogDescription>
          </DialogHeader>

          <GlobalForm
            schema={sessionSchema}
            defaultValues={{
              title: "",
              subject: "",
              date: today,
              startTime: "09:00",
              endTime: "10:30",
            }}
            onSubmit={onSubmit}
            fields={fields}
            isLoading={isSubmitting}
            className="gap-6"
            submitText={
              <span className="flex items-center gap-2">
                <Clock className="size-4" />
                {isSubmitting ? "Creating..." : "Create Session"}
              </span>
            }
            buttonClassName="h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/20 mt-2"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
