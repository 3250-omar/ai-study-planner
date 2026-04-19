"use client";

import { motion } from "framer-motion";
import { BookOpen, Brain, BarChart3 } from "lucide-react";
import { fadeUp, stagger } from "./animation-variants";

const methodologyCards = [
  {
    icon: BookOpen,
    title: "Input Subjects",
    description:
      "Simply add your exams, textbooks, or topics. Our engine breaks them down to identify core concepts instantly.",
  },
  {
    icon: Brain,
    title: "AI Generated Plan",
    description:
      "Receive a optimised timetable tuned to each subject's difficulty and your cognitive style.",
  },
  {
    icon: BarChart3,
    title: "Track Progress",
    description:
      "Monitor your mastery curve with real-time analytics. Never miss a weak area or a deadline again.",
  },
];

export function MethodologySection() {
  return (
    <section className="py-24" id="methodology">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.span
            variants={fadeUp}
            className="text-xs font-semibold uppercase tracking-widest text-primary"
          >
            The Methodology
          </motion.span>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="mt-3 text-3xl font-bold sm:text-4xl"
          >
            Effortless Intelligence
          </motion.h2>
        </motion.div>

        <motion.div
          className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          {methodologyCards.map((card, i) => (
            <motion.div
              key={card.title}
              variants={fadeUp}
              custom={i}
              className="group relative rounded-2xl border border-border bg-card p-6 text-center transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                <card.icon className="size-5" />
              </div>
              <h3 className="text-base font-semibold">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {card.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
