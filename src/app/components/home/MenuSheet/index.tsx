"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Croissant, Plus } from "lucide-react";
import { toast } from "sonner";
import { MENU, MENU_CATS, type MenuItemType } from "@/data/bakery";
import { useCart } from "@/context/CartContext";
import { MarginArtLeft, MarginArtRight } from "@/components/decor/MarginArt";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Category-specific sub-banner notes */
const CAT_NOTES: Record<string, string> = {
  DONUTS: "Donut / Bomboloni — Minimum order starts from 4 pieces",
  CHEESECAKE: "Bento Bake Cheesecake • Net Weight: 350–380 gm",
};

interface MenuSheetProps {
  filter: string;
  onFilter: (cat: string) => void;
}

/** Individual menu card with thumbnail, fallback, and optional variant selector */
function MenuCard({
  item,
  addToCart,
}: {
  item: MenuItemType;
  addToCart: (id: string, qty?: number) => void;
}) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [imgError, setImgError] = useState(false);

  const hasVariants = item.variants && item.variants.length > 0;
  const activeVariant = hasVariants ? item.variants![selectedIdx] : null;
  const displayPrice = activeVariant ? activeVariant.price : item.price;
  const displayOriginal = activeVariant
    ? activeVariant.originalPrice
    : item.originalPrice;

  const cartId = hasVariants
    ? `${item.id}--${item.variants![selectedIdx].label.toLowerCase().replace(/\s+/g, "-")}`
    : item.id;

  const toastDesc = hasVariants
    ? `${item.name} · ${item.variants![selectedIdx].label}`
    : item.name;

  const showImage = Boolean(item.image) && !imgError;

  return (
    <div className="group flex items-start gap-4">
      {/* ── Product Thumbnail ── */}
      <Link
        href={`/product/${item.id}`}
        aria-label={`View ${item.name}`}
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 border border-cocoa/15 bg-peach/40 flex items-center justify-center"
      >
        {showImage ? (
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center bg-[#F9E4D4] text-cocoa/45"
            aria-hidden="true"
          >
            <Croissant size={24} strokeWidth={1.4} />
          </div>
        )}
      </Link>

      {/* ── Item Details ── */}
      <div className="flex-1 min-w-0">
        {/* Name row with badge / minOrderNote */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <Link
            href={`/product/${item.id}`}
            className="font-display font-semibold uppercase text-lg md:text-xl tracking-[0.04em] text-cocoa hover:text-coral transition-colors leading-tight"
          >
            {item.name}
          </Link>
          {item.badge && (
            <span className="inline-flex shrink-0 rounded-full bg-coral/15 px-2.5 py-0.5 text-[9px] font-bold tracking-[0.14em] text-coral uppercase">
              {item.badge}
            </span>
          )}
          {item.minOrderNote && !item.badge && (
            <span className="inline-flex shrink-0 rounded-full bg-honey/30 px-2.5 py-0.5 text-[9px] font-bold tracking-[0.14em] text-cocoa/70 uppercase">
              {item.minOrderNote}
            </span>
          )}
        </div>

        {/* Variant pills */}
        {hasVariants && (
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {item.variants!.map((v, i) => (
              <button
                key={v.label}
                onClick={() => setSelectedIdx(i)}
                className={`rounded-full border px-3 py-1 text-[10px] font-bold tracking-[0.12em] transition-all duration-200 ${
                  selectedIdx === i
                    ? "bg-cocoa text-vanilla border-cocoa"
                    : "border-cocoa/20 text-cocoa/55 hover:border-cocoa/45 hover:text-cocoa"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        )}

        {/* Price row + add button */}
        <div className="mt-2 flex items-center gap-2">
          {displayOriginal && displayOriginal > displayPrice && (
            <span className="font-sans text-sm text-cocoa/45 line-through">
              ৳{displayOriginal}
            </span>
          )}
          <span className="font-sans font-bold text-sm text-coral">
            ৳{displayPrice}
          </span>
          <button
            data-testid={`menu-add-${item.id}`}
            onClick={(e) => {
              e.stopPropagation();
              addToCart(cartId);
              toast.success("Added to your bag", { description: toastDesc });
            }}
            aria-label={`Add ${item.name} to cart`}
            className="ml-auto shrink-0 w-7 h-7 rounded-full border border-cocoa/25 text-cocoa/60 flex items-center justify-center hover:bg-coral hover:border-coral hover:text-vanilla transition-all duration-300"
          >
            <Plus size={13} />
          </button>
        </div>

        {/* Description */}
        <p className="mt-1 pr-4 text-sm text-cocoa/55 font-light">
          {item.desc}
        </p>
      </div>
    </div>
  );
}

export default function MenuSheet({ filter, onFilter }: MenuSheetProps) {
  const { add } = useCart();
  const visible = MENU.filter(
    (m: MenuItemType) => filter === "ALL" || m.cat === filter,
  );

  const categoryNote = CAT_NOTES[filter] ?? null;

  return (
    <section
      id="menu"
      className="relative py-20 md:py-28 scroll-mt-16"
      data-testid="menu-sheet"
    >
      <MarginArtLeft />
      <MarginArtRight />
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="text-center"
        >
          <span className="font-script text-3xl text-coral">
            baked at 6 AM sharp
          </span>
          <h2 className="mt-2 font-display font-bold uppercase text-4xl md:text-6xl tracking-[0.04em] text-cocoa">
            Today&apos;s Fresh Menu
          </h2>
        </motion.div>

        {/* ── Category filter pills ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mt-8 flex flex-wrap justify-center gap-2"
          data-testid="menu-filters"
        >
          {MENU_CATS.map((cat: string) => (
            <button
              key={cat}
              data-testid={`menu-filter-${cat.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={() => onFilter(cat)}
              className={`rounded-full border px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] transition-all duration-300 ${
                filter === cat
                  ? "bg-cocoa text-vanilla border-cocoa"
                  : "border-cocoa/20 text-cocoa/60 hover:border-cocoa/50 hover:text-cocoa"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* ── Category sub-banner note ── */}
        <AnimatePresence mode="wait">
          {categoryNote && (
            <motion.p
              key={filter}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="mt-4 text-center text-sm italic text-cocoa/60 font-light"
            >
              {categoryNote}
            </motion.p>
          )}
        </AnimatePresence>

        {/* ── Menu grid ── */}
        <motion.div
          layout
          className="mt-12 md:mt-16 grid md:grid-cols-2 gap-x-16 gap-y-9"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((item: MenuItemType) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: EASE }}
                data-testid={`menu-item-${item.id}`}
              >
                <MenuCard item={item} addToCart={add} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
