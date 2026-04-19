"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sparkles, Play, ChevronDown } from "lucide-react";
import { fadeUp, stagger } from "./animation-variants";

export function HeroSection() {
  return (
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
                className="bg-brand-gradient dark:text-white text-black px-6 h-11 text-sm font-semibold shadow-lg hover:opacity-90 transition-opacity"
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
              <div className="relative aspect-video w-full bg-linear-to-br from-muted/50 via-background to-muted/30 p-6 md:p-10">
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

                  {/* Stat cards row — using full class names instead of broken template literals */}
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {[
                      "bg-primary/20",
                      "bg-chart-2/20",
                      "bg-chart-4/20",
                      "bg-chart-5/20",
                    ].map((bgColor, i) => (
                      <div
                        key={i}
                        className={`rounded-xl border border-border/50 ${bgColor} p-3 backdrop-blur-sm`}
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
  );
}
