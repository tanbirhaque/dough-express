"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { ScallopDivider, WaveDivider } from "../../decor/Divider";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function QuoteBanner() {
  return (
    <section data-testid="quote-banner">
      <WaveDivider fill="#5C2E14" bg="#FFF9F5" />
      <div className="bg-cocoa text-vanilla py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="block font-script text-7xl leading-none text-frosting/60"
            aria-hidden="true"
          >
            &ldquo;
          </motion.span>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.1, duration: 0.6, ease: EASE }}
            className="mt-2 flex justify-center gap-1.5"
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={16} className="fill-honey text-honey" />
            ))}
          </motion.div>
          <motion.blockquote
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.15, duration: 0.9, ease: EASE }}
            className="mt-6 font-display italic text-2xl md:text-[2.4rem] leading-snug text-vanilla"
            data-testid="quote-text"
          >
            &ldquo;Every batch is mixed, proofed, and glazed by hand each
            morning&mdash;because true comfort shouldn&apos;t wait.&rdquo;
          </motion.blockquote>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="mt-6 text-[11px] font-semibold tracking-[0.3em] uppercase text-vanilla/60"
          >
            &mdash; Head Pastry Chef, Dough Express
          </motion.p>
        </div>
      </div>
      <ScallopDivider fill="#5C2E14" bg="#FFF9F5" flip />
    </section>
  );
}
