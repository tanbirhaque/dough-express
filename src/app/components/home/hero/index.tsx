"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Bike, Wheat } from "lucide-react";
import { scrollToId } from "@/app/lib/lenis";
import { IMAGES } from "@/app/data/bakery";

const EASE = [0.22, 1, 0.36, 1] as const;

function Stamp() {
  return (
    <svg
      viewBox="0 0 120 120"
      className="w-20 h-20 md:w-28 md:h-28 animate-spin-slower opacity-60"
      aria-hidden="true"
    >
      <defs>
        <path
          id="stamp-circle"
          d="M60 60 m-42 0 a42 42 0 1 1 84 0 a42 42 0 1 1 -84 0"
          fill="none"
        />
      </defs>
      <text
        fill="#5C2E14"
        style={{
          fontSize: "10px",
          letterSpacing: "2.4px",
          fontWeight: 600,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
      >
        <textPath href="#stamp-circle">
          BAKED FRESH DAILY • DOUGH EXPRESS •
        </textPath>
      </text>
      <g stroke="#5C2E14" strokeWidth="1.5" fill="none" opacity="0.85">
        <circle cx="60" cy="60" r="15" />
        <circle cx="60" cy="60" r="4.5" />
        <path d="M47 54c4-5 8 2 13-2s9 3 13 0" />
      </g>
    </svg>
  );
}

const FEATURES = [
  {
    icon: Bike,
    label: "EXPRESS DELIVERY",
    desc: "Warm to your door in 60 mins",
  },
  {
    icon: Wheat,
    label: "SMALL-BATCH CRAFT",
    desc: "100% real Belgian chocolate & butter",
  },
];

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const stampY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative bg-peach overflow-hidden"
      data-testid="hero"
    >
      {/* top-right bakery stamp */}
      <motion.div
        style={{ y: stampY }}
        className="absolute right-4 md:right-14 top-[92px] md:top-24 z-10"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.6, rotate: -30 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 1.15, duration: 0.9, ease: EASE }}
        >
          <Stamp />
        </motion.div>
      </motion.div>

      {/* top-left tilted ribbon */}
      <motion.div
        initial={{ scale: 0, rotate: -35 }}
        animate={{ scale: 1, rotate: -8 }}
        transition={{
          delay: 1.05,
          type: "spring",
          stiffness: 200,
          damping: 15,
        }}
        className="absolute left-4 md:left-14 top-[92px] md:top-28 z-10"
      >
        <span className="block bg-honey text-cocoa text-[10px] md:text-[11px] font-bold tracking-[0.28em] px-4 py-2.5 shadow-[0_10px_24px_-10px_rgba(92,46,20,0.45)]">
          60-MIN EXPRESS DHAKA
        </span>
      </motion.div>

      <div className="max-w-[1320px] mx-auto px-6 md:px-10 pt-36 md:pt-44 pb-28 md:pb-44 grid lg:grid-cols-[1.05fr_0.95fr] gap-14 lg:gap-10 items-center">
        {/* Left column */}
        <div className="relative z-[1]">
          <motion.span
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease: EASE }}
            className="inline-block font-script text-3xl md:text-4xl text-coral"
          >
            Freshly Glazed
          </motion.span>

          <h1 className="mt-3 font-display font-bold uppercase text-cocoa leading-[0.94] tracking-[0.01em] text-[clamp(3rem,8.2vw,6.8rem)]">
            {["ARTISANAL", "DONUTS"].map((word, i) => (
              <span key={word} className="block overflow-hidden pb-1 -mb-1">
                <motion.span
                  className="block"
                  initial={{ y: "112%" }}
                  animate={{ y: 0 }}
                  transition={{
                    delay: 0.3 + i * 0.13,
                    duration: 1.1,
                    ease: EASE,
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
            <span className="block overflow-hidden pb-2 -mb-1">
              <motion.span
                className="block"
                initial={{ y: "112%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.56, duration: 1.1, ease: EASE }}
              >
                <span className="font-script text-coral normal-case tracking-normal text-[0.82em] align-baseline mr-3 md:mr-4">
                  &amp;
                </span>
                BAKES
              </motion.span>
            </span>
          </h1>

          <div className="mt-10 md:mt-12 flex flex-col gap-5">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.95 + i * 0.16,
                  duration: 0.8,
                  ease: EASE,
                }}
                className="flex items-center gap-4"
                data-testid={`hero-feature-${i}`}
              >
                <span className="shrink-0 w-12 h-12 rounded-full border border-cocoa/25 flex items-center justify-center text-cocoa">
                  <f.icon size={18} strokeWidth={1.6} />
                </span>
                <span>
                  <span className="block text-[11px] font-bold tracking-[0.24em] text-cocoa">
                    {f.label}
                  </span>
                  <span className="block text-sm text-cocoa/65 mt-0.5 font-light">
                    {f.desc}
                  </span>
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right column — arch-framed hero photograph with slow parallax */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 1.1, ease: EASE }}
          className="relative z-[1]"
        >
          <motion.div
            style={{ y: imgY }}
            className="relative overflow-hidden rounded-t-[220px] md:rounded-t-[300px] rounded-b-[2rem] border-[5px] md:border-[6px] border-vanilla shadow-[0_50px_90px_-40px_rgba(92,46,20,0.45)]"
            data-testid="hero-image-frame"
          >
            <motion.img
              initial={{ scale: 1.18 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.45, duration: 1.7, ease: EASE }}
              src={IMAGES.hero}
              alt="Stacked glazed donuts and chocolate brownies"
              className="w-full h-[420px] md:h-[560px] object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8, ease: EASE }}
            className="absolute -left-3 md:-left-10 bottom-14 bg-vanilla rounded-full pl-3 pr-6 py-3 shadow-[0_18px_40px_-18px_rgba(92,46,20,0.4)] flex items-center gap-3"
            data-testid="hero-fresh-badge"
          >
            <span className="w-9 h-9 rounded-full bg-honey flex items-center justify-center">
              <span className="w-3.5 h-3.5 rounded-full border-2 border-cocoa/70" />
            </span>
            <span className="font-script text-2xl text-cocoa leading-none">
              baked at dawn
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* CTA pill */}
      <div className="hidden lg:block absolute bottom-28 left-1/2 -translate-x-1/2 z-[2]">
        <motion.button
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8, ease: EASE }}
          onClick={() => scrollToId("#popular")}
          data-testid="hero-cta"
          className="group flex items-center gap-3 bg-cocoa text-vanilla rounded-full pl-9 pr-8 py-4 text-[11px] font-bold tracking-[0.26em] hover:bg-coral transition-colors duration-300"
        >
          EXPLORE TODAY&apos;S BATCH
          <ArrowRight
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-1.5"
          />
        </motion.button>
      </div>
      <div className="lg:hidden px-6 pb-24 -mt-10 relative z-[2]">
        <motion.button
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, duration: 0.8, ease: EASE }}
          onClick={() => scrollToId("#popular")}
          data-testid="hero-cta-mobile"
          className="w-full flex items-center justify-center gap-3 bg-cocoa text-vanilla rounded-full py-4 text-[11px] font-bold tracking-[0.26em]"
        >
          EXPLORE TODAY&apos;S BATCH
          <ArrowRight size={15} />
        </motion.button>
      </div>

      {/* curved bottom edge into the vanilla canvas */}
      <svg
        className="absolute bottom-0 left-0 w-full h-[70px] md:h-[100px] text-vanilla"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,60 C260,105 520,5 760,35 C1000,65 1240,20 1440,55 L1440,100 L0,100 Z"
          fill="currentColor"
        />
      </svg>
    </section>
  );
}
