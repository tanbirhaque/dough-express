"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Flame, Leaf, ShieldAlert, Sparkles } from "lucide-react";
import { CATEGORY_PROFILES, type MenuItemType } from "@/app/data/bakery";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type TabKey = "tasting" | "ingredients" | "storage";

const TABS: { key: TabKey; label: string }[] = [
  { key: "tasting", label: "Tasting Notes & Layers" },
  { key: "ingredients", label: "Ingredients & Allergens" },
  { key: "storage", label: "Storage & Reheating" },
];

export default function InsideTheBatch({ item }: { item: MenuItemType }) {
  const [activeTab, setActiveTab] = useState<TabKey>("tasting");
  const profile = CATEGORY_PROFILES[item.cat] ?? CATEGORY_PROFILES["TUB CAKE"];

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <div className="text-center mb-8">
          <span className="font-script text-3xl text-coral">
            inside the batch
          </span>
          <h2 className="mt-1 font-display font-bold uppercase text-2xl md:text-4xl tracking-[0.04em] text-cocoa">
            Craft, Ingredients &amp; Care
          </h2>
        </div>

        {/* Horizontal Switcher */}
        <div
          className="flex flex-wrap justify-center gap-2 mb-6"
          role="tablist"
          aria-label="Product batch details"
        >
          {TABS.map((tab) => {
            const active = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveTab(tab.key)}
                className={`relative isolate rounded-full border px-5 py-2 text-[11px] font-bold tracking-[0.16em] uppercase transition-colors ${
                  active
                    ? "text-vanilla border-cocoa"
                    : "border-cocoa/15 bg-peach/35 text-cocoa/70 hover:border-cocoa/40 hover:text-cocoa"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="inside-batch-tab"
                    transition={{ type: "spring", stiffness: 360, damping: 28 }}
                    className="absolute inset-0 rounded-full bg-cocoa z-0"
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Surface */}
        <div className="rounded-3xl bg-[#F9E4D4]/50 border border-cocoa/15 p-7 md:p-10">
          <AnimatePresence mode="wait">
            {activeTab === "tasting" && (
              <motion.div
                key="tasting"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="grid md:grid-cols-[1.1fr_0.9fr] gap-8 items-center"
              >
                <div>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.24em] uppercase text-coral">
                    <Sparkles size={13} />
                    Baker&apos;s Note
                  </span>
                  <p className="mt-3 text-base text-cocoa/80 font-light leading-relaxed">
                    {profile.bakerNote}
                  </p>
                </div>

                <div className="space-y-4">
                  {profile.meters.map((m) => (
                    <div key={m.label}>
                      <div className="flex justify-between text-xs font-bold tracking-[0.12em] uppercase text-cocoa mb-1.5">
                        <span>{m.label}</span>
                        <span className="text-coral">{m.value}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-vanilla border border-cocoa/10 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${m.value}%` }}
                          transition={{ duration: 0.7, ease: EASE }}
                          className="h-full rounded-full bg-coral"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "ingredients" && (
              <motion.div
                key="ingredients"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="grid md:grid-cols-2 gap-8"
              >
                <div>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.24em] uppercase text-coral">
                    <Leaf size={13} />
                    Artisanal Ingredients
                  </span>
                  <ul className="mt-3 space-y-2 text-sm text-cocoa/80 font-light">
                    {profile.ingredients.map((ing) => (
                      <li key={ing} className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-coral shrink-0" />
                        <span>{ing}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.24em] uppercase text-coral">
                    <ShieldAlert size={13} />
                    Allergen Information
                  </span>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {profile.allergens.map((a) => (
                      <span
                        key={a}
                        className="rounded-full bg-vanilla border border-cocoa/15 px-3.5 py-1.5 text-xs font-semibold text-cocoa"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "storage" && (
              <motion.div
                key="storage"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="flex flex-col md:flex-row items-start md:items-center gap-6"
              >
                <span className="w-12 h-12 rounded-2xl bg-vanilla border border-cocoa/15 flex items-center justify-center text-coral shrink-0">
                  <Flame size={20} />
                </span>
                <div>
                  <span className="block text-[10px] font-bold tracking-[0.24em] uppercase text-coral">
                    Storage &amp; Serving Tip
                  </span>
                  <p className="mt-2 text-base text-cocoa/80 font-light leading-relaxed">
                    {profile.storageTip}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
