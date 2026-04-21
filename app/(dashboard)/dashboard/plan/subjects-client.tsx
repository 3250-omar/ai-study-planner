"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Filter, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSubjectModal } from "@/store/use-subject-modal";
import { SubjectFilters } from "./_components/subject-filters";
import { SubjectCard } from "./_components/subject-card";
import type { SubjectRow } from "@/app/(dashboard)/_api/queries";

export default function SubjectsClient({
  subjects,
  insights,
}: {
  subjects: SubjectRow[];
  insights: { velocity: number; prepScore: number };
}) {
  const { openModal } = useSubjectModal();
  const [showFilters, setShowFilters] = React.useState(false);

  return (
    <div className="flex flex-col gap-10 p-6 md:p-10 max-w-6xl mx-auto w-full">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="max-w-2xl space-y-3">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            Subject Management
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Curate your learning path. Track study load across complex
            disciplines and prepare for upcoming milestones with editorial
            precision.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Button
            variant={showFilters ? "secondary" : "outline"}
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "gap-2 rounded-full px-6 h-11 transition-all",
              showFilters &&
                "bg-indigo-600/10 text-indigo-600 border-indigo-600/30 hover:bg-indigo-600/20",
            )}
          >
            <Filter className="size-4" />
            Filter
          </Button>
          <Button
            onClick={openModal}
            className="gap-2 rounded-full px-6 h-11 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
          >
            <Plus className="size-4" />
            Add Subject
          </Button>
        </div>
      </div>

      <SubjectFilters
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
      />

      {/* Grid of Subjects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((sub, idx) => (
          <SubjectCard key={sub.id} subject={sub} index={idx} />
        ))}

        {/* Add New Subject Card */}
        <Button
          variant="ghost"
          onClick={openModal}
          className="group relative flex h-auto min-h-[300px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border/60 bg-transparent p-6 transition-all hover:border-primary/50 hover:bg-muted/20"
        >
          <div className="flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground mb-4">
            <Plus className="size-6" />
          </div>
          <h3 className="font-semibold text-muted-foreground transition-colors group-hover:text-foreground">
            Add New Subject
          </h3>
        </Button>
      </div>

      {/* Bottom Insights (still presentational for now) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
        <Card className="lg:col-span-2 p-8 rounded-2xl flex flex-col justify-center border shadow-sm overflow-hidden relative group hover:border-primary/30 transition-all">
          <div className="relative z-10 max-w-sm">
            <h3 className="text-2xl font-bold mb-3">Study Velocity</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Your AI-tracked focus hours have {insights.velocity >= 0 ? "increased" : "decreased"} by{" "}
              <strong className="text-foreground">{Math.abs(insights.velocity)}%</strong> this week across
              all subjects.
            </p>
            <Button className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-full px-6 h-10 w-fit">
              View Insights
            </Button>
          </div>
          <TrendingUp className="absolute -bottom-6 -right-6 size-48 text-muted/20 group-hover:text-primary/10 transition-colors transform -rotate-12" />
        </Card>

        <Card className="p-8 rounded-2xl flex flex-col items-center justify-center border shadow-sm hover:border-primary/30 transition-all">
          <div className="text-center space-y-4 w-full">
            <h3 className="text-5xl font-bold text-indigo-500">{insights.prepScore}%</h3>
            <div className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
              Preparation Score
            </div>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden mt-4">
              <div 
                className="h-full bg-indigo-500 transition-all duration-1000" 
                style={{ width: `${insights.prepScore}%` }}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
