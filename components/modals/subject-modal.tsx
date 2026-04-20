"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useSubjectModal } from "@/store/use-subject-modal";
import { Sparkles, Hourglass, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { GlobalForm, FormFieldConfig } from "@/components/global-form";
import * as z from "zod";
import { format } from "date-fns";
import { upsertSubject } from "@/app/(dashboard)/_api/actions";
import { toast } from "sonner";

const SubjectSchema = z.object({
  title: z.string().min(1, "Subject name is required"),
  category: z.string().optional().default(""),
  difficulty: z.number().min(1).max(5),
  examDate: z.date(),
  tags: z.string().optional().default(""),
});

type SubjectFormValues = z.infer<typeof SubjectSchema>;

export function SubjectModal() {
  const { isOpen, closeModal } = useSubjectModal();

  const onSubmit = async (values: SubjectFormValues) => {
    const result = await upsertSubject({
      title: values.title,
      category: values.category?.trim() ? values.category.trim() : null,
      exam_date: values.examDate
        ? values.examDate.toISOString().slice(0, 10)
        : null,
      difficulty: values.difficulty,
      tags: values.tags
        ? values.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [],
    });

    if ("error" in result) {
      toast.error("Failed to save subject", {
        description: result.error,
      });
      return;
    }

    toast.success("Subject saved");
    closeModal();
  };

  const fields: FormFieldConfig[] = [
    {
      name: "title",
      label: "Subject Name",
      placeholder: "e.g., Linear Algebra, Organic Chemistry",
      autoCapitalize: "words",
    },
    {
      name: "category",
      label: "Category",
      placeholder: "e.g., Science, Tech, Economics",
      autoCapitalize: "words",
    },
    {
      name: "examDate",
      label: "Target Exam Date",
      render: ({ field }) => (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal h-12 rounded-xl border-border bg-background",
                !field.value && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-indigo-500" />
              {field.value ? (
                format(field.value, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={field.value}
              onSelect={field.onChange}
              initialFocus
              className="rounded-xl border-none shadow-xl"
            />
          </PopoverContent>
        </Popover>
      ),
    },
    {
      name: "difficulty",
      label: "Difficulty (1–5)",
      render: ({ field }) => (
        <div className="space-y-6 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-indigo-500 uppercase">
              Current Setting: {field.value}
            </span>
          </div>
          <Slider
            value={[field.value]}
            onValueChange={(val) => field.onChange(val[0])}
            min={1}
            max={5}
            step={1}
            className="**:data-[slot=slider-range]:bg-indigo-500 **:data-[slot=slider-thumb]:border-indigo-500"
          />
          <div className="flex items-center justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">
            <span>Easy</span>
            <span>Hard</span>
          </div>
        </div>
      ),
    },
    {
      name: "tags",
      label: "Tags",
      description: "Optional — comma-separated (e.g., LEVEL 200, THEORETICAL)",
      placeholder: "e.g., LEVEL 200, THEORETICAL",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="max-w-4xl! p-0 border-none bg-card md:max-h-[90vh]">
        <div className="flex flex-col md:flex-row h-full">
          {/* Left Panel: Configuration */}
          <div className="flex-1 p-8 overflow-y-auto max-h-[90vh]">
            <div className="space-y-4 mb-10">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-indigo-500 font-mono">
                Intelligence Core
              </span>
              <DialogHeader className="p-0 text-left">
                <DialogTitle className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                  Architect Your <br /> Learning.
                </DialogTitle>
                <DialogDescription className="text-muted-foreground text-lg leading-relaxed max-w-sm pt-4">
                  AI-driven prioritization based on your peak cognitive windows
                  and deadlines.
                </DialogDescription>
              </DialogHeader>
            </div>

            <GlobalForm
              schema={SubjectSchema}
              defaultValues={{
                title: "",
                category: "",
                difficulty: 3,
                examDate: new Date(),
                tags: "",
              }}
              onSubmit={onSubmit}
              fields={fields}
              className="gap-8"
              submitText={
                <span className="flex items-center gap-3">
                  Save Subject
                  <Sparkles className="size-5 group-hover:rotate-12 transition-transform" />
                </span>
              }
              buttonClassName="h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-bold shadow-xl shadow-indigo-500/20 group mt-2"
            />
          </div>

          {/* Right Panel: Visual Placeholder */}
          <div className="hidden md:flex flex-1 bg-muted/30 border-l border-border/50 items-center justify-center p-12 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[500px] rounded-full bg-indigo-500/5 blur-[100px]" />
            <div className="relative flex flex-col items-center text-center space-y-10 w-full animate-in fade-in duration-700">
              <div className="relative size-64 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-dashed border-indigo-500/20 animate-spin-[20s]" />
                <div className="absolute inset-4 rounded-full border border-indigo-500/10" />
                <div className="absolute inset-10 rounded-full bg-indigo-500/5 flex items-center justify-center">
                  <div className="size-20 bg-indigo-100 dark:bg-indigo-500/20 rounded-full flex items-center justify-center shadow-inner">
                    <Hourglass className="size-10 text-indigo-500/60" />
                  </div>
                </div>
                <div className="absolute -top-2 -right-4 px-3 py-1.5 bg-card border rounded-full text-[10px] font-bold flex items-center gap-2 shadow-sm">
                  <div className="size-1.5 rounded-full bg-indigo-500" />
                  ORK
                </div>
              </div>
              <div className="space-y-4 max-w-[280px]">
                <h3 className="text-3xl font-bold tracking-tight">
                  Awaiting Input
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Customize your parameters on the left to begin generating a
                  bespoke, hyper-personalized study trajectory.
                </p>
              </div>
              <div className="flex gap-2 w-full max-w-[200px]">
                <div className="h-1 flex-1 bg-indigo-500/20 rounded-full overflow-hidden">
                  <div className="h-full w-1/3 bg-indigo-500/40" />
                </div>
                <div className="h-1 flex-1 bg-muted rounded-full" />
                <div className="h-1 flex-1 bg-muted rounded-full" />
              </div>
              <div className="flex items-center gap-4 w-full justify-center">
                <div className="h-px w-8 bg-border" />
                <span className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase opacity-60">
                  Curated by <br /> AuraStudy V4.2
                </span>
                <div className="h-px w-8 bg-border" />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
