"use client";

import * as React from "react";
import {
  useForm,
  DefaultValues,
  Controller,
  FieldValues,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export type FormFieldConfig = {
  name: string;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  autoComplete?: string;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  autoCorrect?: "on" | "off";
  description?: string;
  /** Pass an element to be rendered next to the label (e.g., 'Forgot password?' link) */
  renderExtraLabel?: React.ReactNode;
};

interface GlobalFormProps<TValues extends FieldValues> {
  schema: z.ZodType<TValues>;
  defaultValues: DefaultValues<TValues>;
  onSubmit: (values: TValues) => void | Promise<void>;
  fields: FormFieldConfig[];
  submitText?: string;
  isLoading?: boolean;
  className?: string;
  buttonClassName?: string;
}

export function GlobalForm<TValues extends FieldValues>({
  schema,
  defaultValues,
  onSubmit,
  fields,
  submitText = "Submit",
  isLoading = false,
  className,
  buttonClassName,
}: GlobalFormProps<TValues>) {
  const form = useForm<TValues>({
    // @ts-expect-error Type instantiation is excessively deep and possibly infinite
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit as any)}
      className={cn("grid gap-4", className)}
    >
      {fields.map((fieldConfig) => (
        <Controller
          key={fieldConfig.name}
          name={fieldConfig.name as any}
          control={form.control}
          render={({ field, fieldState }) => (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor={fieldConfig.name}
                  className={cn(fieldState.invalid && "text-destructive")}
                >
                  {fieldConfig.label}
                </Label>
                {fieldConfig.renderExtraLabel && fieldConfig.renderExtraLabel}
              </div>
              <Input
                {...field}
                id={fieldConfig.name}
                type={fieldConfig.type || "text"}
                placeholder={fieldConfig.placeholder}
                autoComplete={fieldConfig.autoComplete}
                autoCapitalize={fieldConfig.autoCapitalize}
                autoCorrect={fieldConfig.autoCorrect}
                disabled={isLoading}
                aria-invalid={fieldState.invalid}
                className={cn(
                  fieldState.invalid &&
                    "border-destructive focus-visible:ring-destructive",
                )}
              />
              {fieldConfig.description && (
                <p className="text-[0.8rem] text-muted-foreground">
                  {fieldConfig.description}
                </p>
              )}
              {fieldState.invalid && (
                <p className="text-[0.8rem] font-medium text-destructive">
                  {fieldState.error?.message}
                </p>
              )}
            </div>
          )}
        />
      ))}

      <Button
        type="submit"
        disabled={isLoading}
        className={cn("mt-2", buttonClassName)}
      >
        {isLoading ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
        {submitText}
      </Button>
    </form>
  );
}
