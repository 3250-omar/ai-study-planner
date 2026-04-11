"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion, Variants } from "framer-motion";
import {
  BookOpen,
  Brain,
  BarChart3,
  Sparkles,
  Library,
  TrendingUp,
  Play,
  ChevronDown,
  CheckCircle2,
  ArrowRight,
  Network,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                  */
/* ------------------------------------------------------------------ */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
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

const features = [
  {
    icon: BarChart3,
    label: "ANALYTICS",
    title: "Deep Learning Analytics",
    description:
      "Visualize your cognitive progress through multi-dimensional charts. AuraStudy predicts where you'll struggle before you even start.",
    size: "large" as const,
    color: "from-primary/20 to-primary/5",
  },
  {
    icon: Library,
    label: "RESOURCES",
    title: "Smart Library",
    description:
      "All your resources, automated and organized by semantic relevance. No more searching for that one lost PDF.",
    size: "small" as const,
    color: "from-chart-4/20 to-chart-4/5",
  },
  {
    icon: TrendingUp,
    label: "FLOW",
    title: "Biometric Flow",
    description:
      "Sync your sessions with your peak productivity hours. Your AI knows when you're most focused.",
    size: "small" as const,
    color: "from-chart-5/20 to-chart-5/5",
  },
  {
    icon: Network,
    label: "COLLABORATION",
    title: "Collaborative Nodes",
    description:
      "Study with your peers in real-time. Shared AI brains aggregate knowledge for the entire group.",
    size: "medium" as const,
    color: "from-chart-2/20 to-chart-2/5",
    bullets: ["Real-time Sync", "Shared AI Context"],
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function HomePage() {
  return (
    <main className="flex-1">
      <Navbar />

      {/* ================ HERO ================ */}
      <section
        className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28"
        id="hero"
      >
        {/* Decorative blurs */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" />
          <div className="absolute top-48 -left-32 h-[300px] w-[400px] rounded-full bg-chart-4/10 blur-[100px]" />
          <div className="absolute top-64 -right-20 h-[250px] w-[350px] rounded-full bg-chart-5/10 blur-[100px]" />
        </div>

        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {/* Badge */}
            <motion.div variants={fadeUp} custom={0}>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                <Sparkles className="size-3" />
                Now Powered by Google AI 2.0
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl"
            >
              Forge your path to{" "}
              <span className="text-gradient">academic mastery</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              custom={2}
              className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              Harness AI to architect personalised study workflows, optimise
              your memory retention, and reclaim your time.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              custom={3}
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
            >
              <Link href="/sign-up">
                <Button
                  size="lg"
                  id="hero-cta-start"
                  className="bg-brand-gradient dark:text-white text-black px-6 h-11 text-sm font-semibold shadow-lg hover:opacity-90 transition-opacity "
                >
                  Get Started
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                id="hero-cta-demo"
                className="h-11 px-6 text-sm font-semibold gap-2"
              >
                <Play className="size-4" />
                View Demo
              </Button>
            </motion.div>
          </motion.div>

          {/* Dashboard mockup / Video placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
            className="relative mx-auto mt-16 max-w-5xl"
          >
            <div className="glow-brand rounded-2xl">
              <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
                {/* Title bar */}
                <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
                  <div className="flex gap-1.5">
                    <span className="size-3 rounded-full bg-red-400/80" />
                    <span className="size-3 rounded-full bg-yellow-400/80" />
                    <span className="size-3 rounded-full bg-green-400/80" />
                  </div>
                  <div className="ml-4 flex-1 rounded-md bg-background/60 px-3 py-1 text-xs text-muted-foreground">
                    app.aurastudy.ai/dashboard
                  </div>
                </div>

                {/* Content area – styled empty placeholder */}
                <div className="relative aspect-[16/9] w-full bg-gradient-to-br from-muted/50 via-background to-muted/30 p-6 md:p-10">
                  {/* Decorative grid lines */}
                  <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
                      backgroundSize: "40px 40px",
                    }}
                  />

                  {/* Fake sidebar */}
                  <div className="absolute left-0 top-0 bottom-0 w-48 border-r border-border/50 bg-muted/20 hidden md:block">
                    <div className="space-y-2 p-4 pt-6">
                      <div className="h-5 w-28 rounded bg-primary/20" />
                      <div className="mt-6 space-y-3">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="size-4 rounded bg-muted-foreground/10" />
                            <div
                              className="h-3 rounded bg-muted-foreground/10"
                              style={{ width: `${40 + i * 12}%` }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Fake main content */}
                  <div className="relative ml-0 md:ml-52 space-y-6">
                    {/* Header row */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="h-6 w-40 rounded bg-foreground/10" />
                        <div className="mt-2 h-3 w-56 rounded bg-muted-foreground/10" />
                      </div>
                      <div className="flex gap-2">
                        <div className="h-8 w-20 rounded-lg bg-primary/15" />
                        <div className="h-8 w-20 rounded-lg bg-muted/60" />
                      </div>
                    </div>

                    {/* Stat cards row */}
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {[
                        "primary/20",
                        "chart-2/20",
                        "chart-4/20",
                        "chart-5/20",
                      ].map((color, i) => (
                        <div
                          key={i}
                          className={`rounded-xl border border-border/50 bg-${color} p-3 backdrop-blur-sm`}
                        >
                          <div className="h-3 w-12 rounded bg-foreground/10" />
                          <div className="mt-2 h-6 w-16 rounded bg-foreground/15" />
                        </div>
                      ))}
                    </div>

                    {/* Chart placeholder */}
                    <div className="rounded-xl border border-border/50 bg-card/50 p-4 backdrop-blur-sm">
                      <div className="h-3 w-24 rounded bg-foreground/10" />
                      <div className="mt-4 flex items-end gap-2 h-28">
                        {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map(
                          (h, i) => (
                            <div
                              key={i}
                              className="flex-1 rounded-t bg-primary/30 transition-all hover:bg-primary/50"
                              style={{ height: `${h}%` }}
                            />
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
              className="mt-8 flex justify-center"
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ChevronDown className="size-5 text-muted-foreground" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================ METHODOLOGY ================ */}
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

      {/* ================ FEATURES BENTO ================ */}
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
              <div className="mt-6 h-40 rounded-xl bg-gradient-to-br from-primary/10 via-transparent to-chart-4/10 border border-border/50 flex items-center justify-center">
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
                <div className="hidden sm:flex h-36 w-36 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-chart-2/15 to-chart-5/15 border border-border/50">
                  <Library className="size-10 text-muted-foreground/30" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================ TESTIMONIAL ================ */}
      <section className="py-24" id="testimonial">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.span
              variants={fadeUp}
              className="mb-4 inline-block text-xs font-semibold uppercase tracking-widest text-primary"
            >
              AI
            </motion.span>
            <motion.blockquote
              variants={fadeUp}
              custom={1}
              className="text-2xl font-semibold italic leading-relaxed sm:text-3xl"
            >
              &ldquo;AuraStudy didn&apos;t just organize my notes; it rewired
              how I conceptualize information. It&apos;s the difference between
              memorizing and understanding.&rdquo;
            </motion.blockquote>
            <motion.div variants={fadeUp} custom={2} className="mt-6">
              {/* Avatar placeholder */}
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground font-semibold text-sm">
                JT
              </div>
              <p className="mt-3 text-sm font-semibold">Julian Thomas</p>
              <p className="text-xs text-muted-foreground">
                PhD Candidate, Oxford
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================ CTA ================ */}
      <section className="py-24" id="cta">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            className="relative overflow-hidden rounded-3xl bg-brand-gradient p-12 text-center sm:p-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            {/* Glow effects */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-20 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-white/10 blur-[80px]" />
            </div>

            <div className="relative">
              <motion.h2
                variants={fadeUp}
                className="text-3xl font-bold dark:text-white text-black sm:text-4xl"
              >
                Ready to curate your intellect?
              </motion.h2>
              <motion.p
                variants={fadeUp}
                custom={1}
                className="mx-auto mt-4 max-w-md text-sm dark:text-white/80 text-black/80 leading-relaxed"
              >
                Start your 14-day premium trial today. No credit card required.
                Experience the future of student AI study.
              </motion.p>
              <motion.div variants={fadeUp} custom={2} className="mt-8">
                <Link href="/sign-up">
                  <Button
                    size="lg"
                    id="cta-create-account"
                    className="h-12 px-8 text-sm font-semibold bg-white text-primary hover:bg-white/90 shadow-xl transition-all"
                  >
                    Create Your Free Account
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
