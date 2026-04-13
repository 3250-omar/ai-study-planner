"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Library,
  TrendingUp,
  Sparkles,
  Network,
  Brain,
  CheckCircle2,
} from "lucide-react";
import { fadeUp, stagger } from "./animation-variants";

const features = [
  {
    icon: BarChart3,
    label: "ANALYTICS",
    title: "Deep Learning Analytics",
    description:
      "Visualize your cognitive progress through multi-dimensional charts. AuraStudy predicts where you'll struggle before you even start.",
    size: "large" as const,
  },
  {
    icon: Library,
    label: "RESOURCES",
    title: "Smart Library",
    description:
      "All your resources, automated and organized by semantic relevance. No more searching for that one lost PDF.",
    size: "small" as const,
  },
  {
    icon: TrendingUp,
    label: "FLOW",
    title: "Biometric Flow",
    description:
      "Sync your sessions with your peak productivity hours. Your AI knows when you're most focused.",
    size: "small" as const,
  },
  {
    icon: Network,
    label: "COLLABORATION",
    title: "Collaborative Nodes",
    description:
      "Study with your peers in real-time. Shared AI brains aggregate knowledge for the entire group.",
    size: "medium" as const,
    bullets: ["Real-time Sync", "Shared AI Context"],
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-muted/30" id="features">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl font-bold italic sm:text-4xl"
          >
            Designed for the relentless.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={1}
            className="mt-3 text-muted-foreground"
          >
            Every feature is engineered to remove friction from your learning
            journey.
          </motion.p>
        </motion.div>

        <motion.div
          className="mx-auto mt-14 grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          {/* Large card – spans 2 cols */}
          <motion.div
            variants={fadeUp}
            custom={0}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 lg:col-span-2 transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
          >
            <span className="mb-2 inline-block text-[10px] font-bold uppercase tracking-widest text-primary">
              {features[0].label}
            </span>
            <h3 className="text-xl font-bold">{features[0].title}</h3>
            <p className="mt-2 max-w-md text-sm text-muted-foreground leading-relaxed">
              {features[0].description}
            </p>
            {/* Decorative illustration placeholder */}
            <div className="mt-6 h-40 rounded-xl bg-linear-to-br from-primary/10 via-transparent to-chart-4/10 border border-border/50 flex items-center justify-center">
              <div className="flex items-center gap-3 text-muted-foreground/40">
                <Sparkles className="size-10" />
                <span className="text-5xl font-bold tracking-tighter opacity-30">
                  AI
                </span>
              </div>
            </div>
          </motion.div>

          {/* Small card */}
          <motion.div
            variants={fadeUp}
            custom={1}
            className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
          >
            <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-chart-4/15 text-chart-4">
              <Brain className="size-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              {features[1].label}
            </span>
            <h3 className="mt-1 text-base font-semibold">
              {features[1].title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {features[1].description}
            </p>
          </motion.div>

          {/* Small card */}
          <motion.div
            variants={fadeUp}
            custom={2}
            className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              {features[2].label}
            </span>
            <h3 className="mt-1 text-base font-semibold">
              {features[2].title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {features[2].description}
            </p>
          </motion.div>

          {/* Medium card – spans 2 cols */}
          <motion.div
            variants={fadeUp}
            custom={3}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 lg:col-span-2 transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
              <div className="flex-1">
                <span className="mb-2 inline-block text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  {features[3].label}
                </span>
                <h3 className="text-xl font-bold">{features[3].title}</h3>
                <p className="mt-2 max-w-md text-sm text-muted-foreground leading-relaxed">
                  {features[3].description}
                </p>
                {features[3].bullets && (
                  <ul className="mt-4 space-y-2">
                    {features[3].bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="size-4 text-primary" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {/* Decorative area */}
              <div className="hidden sm:flex h-36 w-36 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-chart-2/15 to-chart-5/15 border border-border/50">
                <Library className="size-10 text-muted-foreground/30" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
