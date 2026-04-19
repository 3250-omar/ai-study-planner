"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeUp, stagger } from "./animation-variants";

export function CTASection() {
  return (
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
  );
}
