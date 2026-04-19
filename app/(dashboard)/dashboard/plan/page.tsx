"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Filter, CalendarDays, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSubjectModal } from "@/store/use-subject-modal";
import { SubjectFilters } from "./_components/subject-filters";

const subjects = [
  {
    id: 1,
    category: "SCIENCE",
    title: "Quantum Mechanics I",
    difficulty: "Hard",
    difficultyDots: 4,
    examDate: "Dec 14, 2024",
    studyLoad: "120 Hours",
    theme: "bg-indigo-500",
    themeSoft: "bg-indigo-500/20 text-indigo-300",
    icon: "Σ",
    tags: ["THEORETICAL", "LEVEL 400"],
  },
  {
    id: 2,
    category: "HUMANITIES",
    title: "Architecture History",
    difficulty: "Easy",
    difficultyDots: 2,
    examDate: "Jan 08, 2025",
    studyLoad: "45 Hours",
    theme: "bg-orange-400",
    themeSoft: "bg-orange-400/20 text-orange-300",
    icon: "🏛",
    tags: ["HISTORICAL", "LEVEL 200"],
  },
  {
    id: 3,
    category: "TECH",
    title: "Neural Networks",
    difficulty: "Medium",
    difficultyDots: 3,
    examDate: "Dec 19, 2024",
    studyLoad: "85 Hours",
    theme: "bg-amber-600",
    themeSoft: "bg-amber-600/20 text-amber-300",
    icon: "◖◗",
    tags: ["COMPUTATIONAL", "ADVANCED"],
  },
  {
    id: 4,
    category: "ECONOMICS",
    title: "Macroeconomics",
    difficulty: "Medium",
    difficultyDots: 3,
    examDate: "Feb 12, 2025",
    studyLoad: "60 Hours",
    theme: "bg-purple-500",
    themeSoft: "bg-purple-500/20 text-purple-300",
    icon: "📈",
    tags: ["SOCIAL SCIENCE", "LEVEL 100"],
  },
  {
    id: 5,
    category: "CHEMISTRY",
    title: "Organic Chemistry",
    difficulty: "Hard",
    difficultyDots: 4,
    examDate: "Dec 22, 2024",
    studyLoad: "110 Hours",
    theme: "bg-blue-500",
    themeSoft: "bg-blue-500/20 text-blue-300",
    icon: "🧪",
    tags: ["LAB BASED", "LEVEL 300"],
  },
];

export default function SubjectsPage() {
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
              showFilters && "bg-indigo-600/10 text-indigo-600 border-indigo-600/30 hover:bg-indigo-600/20"
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
        {subjects.map((sub) => (
          <div
            key={sub.id}
            className="group relative flex flex-col overflow-hidden rounded-2xl bg-card border shadow-sm transition-all hover:shadow-md hover:border-primary/30"
          >
            {/* Top Accent Line */}
            <div className={cn("h-1.5 w-full", sub.theme)} />

            <div className="p-6 md:p-8 flex flex-col h-full gap-6">
              {/* Icon & Category */}
              <div className="flex items-center justify-between">
                <div
                  className={cn(
                    "flex items-center justify-center size-10 rounded-xl",
                    sub.themeSoft,
                  )}
                >
                  <span className="text-xl leading-none">{sub.icon}</span>
                </div>
                <div className="flex gap-2">
                  <span
                    className={cn(
                      "text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full bg-muted text-muted-foreground",
                    )}
                  >
                    {sub.difficulty} Load
                  </span>
                </div>
              </div>

              {/* Title & Tags */}
              <div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {sub.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {sub.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-semibold uppercase tracking-wider px-2 py-1 bg-muted/60 rounded-md text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer info: Date & Hours */}
              <div className="mt-auto grid grid-cols-2 gap-4 pt-6 border-t border-border/50">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                    Exam Date
                  </span>
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <CalendarDays className="size-4 text-muted-foreground" />
                    {sub.examDate}
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                    Difficulty
                  </span>
                  <div className="flex items-center gap-1.5 h-full">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className={cn(
                          "size-2 rounded-full",
                          i <= sub.difficultyDots
                            ? sub.theme
                            : "bg-muted-foreground/20",
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
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

      {/* Bottom Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
        <Card className="lg:col-span-2 p-8 rounded-2xl flex flex-col justify-center border shadow-sm overflow-hidden relative group hover:border-primary/30 transition-all">
          <div className="relative z-10 max-w-sm">
            <h3 className="text-2xl font-bold mb-3">Study Velocity</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Your AI-tracked focus hours have increased by{" "}
              <strong className="text-foreground">14%</strong> this week across
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
            <h3 className="text-5xl font-bold text-indigo-500">84%</h3>
            <div className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
              Preparation Score
            </div>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden mt-4">
              <div className="h-full bg-indigo-500 w-[84%] rounded-full" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
