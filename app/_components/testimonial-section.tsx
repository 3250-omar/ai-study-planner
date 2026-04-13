"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "./animation-variants";

export function TestimonialSection() {
  return (
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
  );
}
