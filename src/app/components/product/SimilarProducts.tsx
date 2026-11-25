"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Croissant, Plus } from "lucide-react";
import { toast } from "sonner";
import { MENU, type MenuItemType } from "@/app/data/bakery";
import { useCart } from "@/app/context/CartContext";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function SimilarCard({ item, index }: { item: MenuItemType; index: number }) {
  const { add } = useCart();
  const [imgError, setImgError] = useState(false);

  const showImage = Boolean(item.image) && !imgError;
  const cartId =
    item.variants && item.variants.length > 0
      ? `${item.id}--${item.variants[0].label.toLowerCase().replace(/\s+/g, "-")}`
      : item.id;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.07, duration: 0.6, ease: EASE }}
      className="group"
    >
      <div className="relative bg-peach/60 rounded-[1.75rem] aspect-square overflow-hidden border border-cocoa/10">
        <Link
          href={`/product/${item.id}`}
          className="block w-full h-full"
          aria-label={`View ${item.name}`}
        >
          {showImage ? (
            <img
              src={item.image}
              alt={item.name}
              loading="lazy"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover object-bottom transition-transform duration-500 ease-out group-hover:scale-[1.06]"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center bg-[#F9E4D4] text-cocoa/45"
              aria-hidden="true"
            >
              <Croissant size={32} strokeWidth={1.4} />
            </div>
          )}
        </Link>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            add(cartId);
            toast.success("Added to your bag", { description: item.name });
          }}
          aria-label={`Quick add ${item.name}`}
          className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-1 rounded-full bg-cocoa text-vanilla px-3.5 py-2 text-[10px] font-bold tracking-[0.14em] uppercase shadow-lg hover:bg-coral transition-colors"
        >
          <Plus size={12} />
          <span>Add</span>
        </button>
      </div>

      <div className="mt-4 text-center">
        <Link
          href={`/product/${item.id}`}
          className="block text-[13px] font-bold tracking-[0.12em] uppercase text-cocoa hover:text-coral transition-colors"
        >
          {item.name}
        </Link>
        <div className="mt-1 flex items-center justify-center gap-2">
          {item.originalPrice && item.originalPrice > item.price && (
            <span className="font-sans text-xs text-cocoa/45 line-through">
              ৳{item.originalPrice}
            </span>
          )}
          <span className="font-sans font-bold text-sm text-coral">
            ৳{item.price}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export default function SimilarProducts({
  currentItem,
}: {
  currentItem: MenuItemType;
}) {
  const sameCat = MENU.filter(
    (m) => m.id !== currentItem.id && m.cat === currentItem.cat,
  );
  const complementary = MENU.filter(
    (m) =>
      m.id !== currentItem.id && m.cat !== currentItem.cat && Boolean(m.image),
  );

  const related = [...sameCat, ...complementary].slice(0, 4);

  return (
    <section className="relative bg-peach/30 pt-20 pb-24">
      {/* Smooth wave SVG divider */}
      <svg
        className="absolute top-0 left-0 w-full h-10 md:h-14 text-vanilla -translate-y-px"
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,0 L1440,0 L1440,25 C1160,60 880,10 620,38 C360,65 160,15 0,40 Z"
          fill="currentColor"
        />
      </svg>

      <div className="max-w-[1320px] mx-auto px-6 md:px-10">
        <div className="text-center">
          <span className="font-script text-3xl text-coral">pair it with</span>
          <h2 className="mt-1 font-display font-bold uppercase text-3xl md:text-5xl tracking-[0.04em] text-cocoa">
            Similar Fresh Treats
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {related.map((item, i) => (
            <SimilarCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
