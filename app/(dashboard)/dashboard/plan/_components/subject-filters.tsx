"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface SubjectFiltersProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SubjectFilters({ isOpen, onClose }: SubjectFiltersProps) {
  const [date, setDate] = React.useState<Date>();
  const [status, setStatus] = React.useState<string>("all");

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="mb-8 rounded-3xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm shadow-sm">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 flex-1">
                {/* Status Filter */}
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-1">
                    Filter by Status
                  </label>
                  <ToggleGroup
                    type="single"
                    value={status}
                    onValueChange={(val) => val && setStatus(val)}
                    className="justify-start gap-2"
                  >
                    {[
                      { label: "All", value: "all" },
                      { label: "Active", value: "active" },
                      { label: "Completed", value: "completed" },
                      { label: "Planned", value: "planned" },
                    ].map((s) => (
                      <ToggleGroupItem
                        key={s.value}
                        value={s.value}
                        className={cn(
                          "px-4 h-10 rounded-xl border border-border bg-background transition-all hover:bg-muted data-[state=on]:bg-indigo-600 data-[state=on]:text-white data-[state=on]:border-indigo-600 text-xs font-semibold uppercase tracking-wider",
                        )}
                      >
                        {s.label}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </div>

                {/* Date Filter */}
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-1">
                    Exam Date
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal h-10 rounded-xl border-border bg-background hover:bg-muted transition-all",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 text-indigo-500" />
                        {date ? format(date, "PPP") : <span>Select date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        className="rounded-xl border-none shadow-xl"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Reset/Close */}
              <div className="flex items-center gap-3 shrink-0">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground"
                  onClick={() => {
                    setStatus("all");
                    setDate(undefined);
                  }}
                >
                  Clear Filters
                </Button>
                <div className="h-4 w-px bg-border" />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full size-8"
                  onClick={onClose}
                >
                  <X className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
