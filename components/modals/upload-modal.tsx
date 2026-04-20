"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUploadModal } from "@/store/use-upload-modal";
import { GlobalForm, FormFieldConfig } from "@/components/global-form";
import * as z from "zod";
import { Upload, X, File as FileIcon, CloudUpload } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

import { useRouter } from "next/navigation";
import { createLibraryDocumentRow } from "@/app/(dashboard)/_api/actions";

/* ------------------------------------------------------------------ */
/*  Schema                                                             */
/* ------------------------------------------------------------------ */

const uploadSchema = z.object({
  file: z.any().refine((file) => file instanceof File, "File is required"),
  subject: z.string().min(1, "Subject is required"),
  description: z.string().optional().default(""),
});

type UploadFormValues = z.infer<typeof uploadSchema>;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function UploadModal() {
  const { isOpen, closeModal } = useUploadModal();
  const [dragActive, setDragActive] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const supabase = createClient();
  const router = useRouter();

  const onSubmit = async (values: UploadFormValues) => {
    try {
      setIsUploading(true);

      const file = values.file as File;
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(7)}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // 1. Upload to Supabase Storage Bucket
      const { error: uploadError } = await supabase.storage
        .from("library_files")
        .upload(filePath, file);

      if (uploadError) {
        throw new Error(
          uploadError.message || "Failed to upload file to storage.",
        );
      }

      // 2. Insert metadata into DB via server action (enforces RLS)
      const result = await createLibraryDocumentRow({
        title: file.name,
        original_filename: file.name,
        file_path: filePath,
        file_type: file.type || "application/octet-stream",
        size_bytes: file.size,
        subject: values.subject,
        description: values.description ?? "",
      });

      if ("error" in result) {
        throw new Error(result.error || "Failed to save document metadata.");
      }

      toast.success("File uploaded successfully!");
      router.refresh(); // Refresh to show new files in the library
      closeModal();
    } catch (error: unknown) {
      console.error("Upload failed", error);
      const message =
        error instanceof Error ? error.message : "An unexpected error occurred";
      toast.error("Upload failed", {
        description: message,
      });
    } finally {
      setIsUploading(false);
    }
  };

  /* ---- Drag handlers ---- */
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  /* ---- Field configs ---- */
  const fields: FormFieldConfig[] = [
    {
      name: "file",
      label: "Study Material",
      render: ({ field, fieldState }) => {
        const file = field.value as File | undefined;

        const handleDrop = (e: React.DragEvent) => {
          e.preventDefault();
          e.stopPropagation();
          setDragActive(false);
          if (e.dataTransfer.files?.[0]) {
            field.onChange(e.dataTransfer.files[0]);
          }
        };

        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.files?.[0]) {
            field.onChange(e.target.files[0]);
          }
        };

        /* File selected state */
        if (file) {
          return (
            <div className="flex items-center gap-4 rounded-xl border border-border bg-muted/30 p-4">
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FileIcon className="size-6" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-8 rounded-full text-muted-foreground hover:text-destructive"
                onClick={() => {
                  field.onChange(undefined);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
              >
                <X className="size-4" />
              </Button>
            </div>
          );
        }

        /* Drag & drop zone */
        return (
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              "flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed p-10 cursor-pointer transition-all",
              dragActive
                ? "border-primary bg-primary/5 scale-[1.01]"
                : "border-border/60 bg-muted/20 hover:border-primary/40 hover:bg-muted/30",
              fieldState.invalid && "border-destructive/50",
            )}
          >
            <div
              className={cn(
                "flex size-14 items-center justify-center rounded-2xl transition-colors",
                dragActive
                  ? "bg-primary/20 text-primary"
                  : "bg-muted text-muted-foreground",
              )}
            >
              <CloudUpload className="size-7" />
            </div>
            <div className="text-center space-y-1.5">
              <p className="text-sm font-semibold">
                {dragActive
                  ? "Drop your file here"
                  : "Drag & drop your file here"}
              </p>
              <p className="text-xs text-muted-foreground">
                or{" "}
                <span className="text-primary font-medium">
                  click to browse
                </span>
              </p>
            </div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60 font-bold">
              Supports PDF, DOCX, PPTX, TXT
            </p>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".pdf,.docx,.pptx,.txt,.doc,.xls,.xlsx"
              onChange={handleFileChange}
            />
          </div>
        );
      },
    },
    {
      name: "subject",
      label: "Subject",
      placeholder: "e.g., Physics, Economics, Computer Science",
      autoCapitalize: "words",
    },
    {
      name: "description",
      label: "Description",
      description: "Optional — add context for better AI-powered summaries.",
      render: ({ field, fieldState }) => (
        <textarea
          {...field}
          placeholder="Add notes about this material..."
          rows={3}
          className={cn(
            "flex w-full rounded-xl border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/20 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none transition-colors",
            fieldState.invalid &&
              "border-destructive focus-visible:ring-destructive",
          )}
        />
      ),
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="max-w-lg! p-0 border-none bg-card">
        <div className="p-8 space-y-8">
          <DialogHeader className="p-0 text-left space-y-3">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary font-mono">
              Upload Material
            </span>
            <DialogTitle className="text-2xl font-bold tracking-tight">
              Add to your Library
            </DialogTitle>
            <DialogDescription className="text-muted-foreground leading-relaxed">
              Upload study materials and let AI organize and summarize them for
              you.
            </DialogDescription>
          </DialogHeader>

          <GlobalForm
            schema={uploadSchema}
            defaultValues={{
              file: undefined,
              subject: "",
              description: "",
            }}
            onSubmit={onSubmit}
            fields={fields}
            isLoading={isUploading}
            className="gap-6"
            submitText={
              <span className="flex items-center gap-2">
                <Upload className="size-4" />
                {isUploading ? "Uploading..." : "Upload Material"}
              </span>
            }
            buttonClassName="h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/20 mt-2"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
