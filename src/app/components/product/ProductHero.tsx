"use client";

import { useState, type MouseEvent } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Bike,
  Check,
  ChevronRight,
  Croissant,
  Gift,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  ZoomIn,
} from "lucide-react";
import { toast } from "sonner";
import {
  CATEGORY_PROFILES,
  TAG_STYLES,
  ZONES,
  type MenuItemType,
} from "@/app/data/bakery";
import { useCart } from "@/app/context/CartContext";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const DELIVERY_AREAS = [
  { label: "Dhanmondi", zoneName: "Dhanmondi" },
  { label: "Gulshan / Banani", zoneName: "Gulshan" },
  { label: "Uttara", zoneName: "Uttara" },
  { label: "Mirpur", zoneName: "Mirpur" },
];

function MiniStamp() {
  return (
    <svg
      viewBox="0 0 120 120"
      className="w-20 h-20 md:w-24 md:h-24 animate-spin-slower opacity-80"
      aria-hidden="true"
    >
      <defs>
        <path
          id="product-stamp-circle"
          d="M60 60 m-42 0 a42 42 0 1 1 84 0 a42 42 0 1 1 -84 0"
          fill="none"
        />
      </defs>
      <circle
        cx="60"
        cy="60"
        r="54"
        fill="#FFF9F5"
        fillOpacity="0.92"
        stroke="#5C2E14"
        strokeOpacity="0.18"
        strokeWidth="1"
      />
      <text
        fill="#5C2E14"
        style={{
          fontSize: "9.2px",
          letterSpacing: "2px",
          fontWeight: 700,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
      >
        <textPath href="#product-stamp-circle">
          BAKED FRESH AT 6 AM • DHAKA EXPRESS •
        </textPath>
      </text>
      <g stroke="#5C2E14" strokeWidth="1.5" fill="none" opacity="0.8">
        <circle cx="60" cy="60" r="13" />
        <circle cx="60" cy="60" r="4" />
      </g>
    </svg>
  );
}

interface ProductHeroProps {
  item: MenuItemType;
  productTag?: string;
}

export default function ProductHero({ item, productTag }: ProductHeroProps) {
  const { add, setOpen, zone, setZone } = useCart();

  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedFlavorIdx, setSelectedFlavorIdx] = useState(0);
  const [qty, setQty] = useState<number>(item.minOrder ?? 1);
  const [giftOpen, setGiftOpen] = useState(false);
  const [giftNote, setGiftNote] = useState("");
  const [imgError, setImgError] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [lensPos, setLensPos] = useState({ x: 50, y: 50 });

  const hasVariants = Boolean(item.variants && item.variants.length > 0);
  const activeVariant = hasVariants ? item.variants![selectedVariantIdx] : null;
  const activePrice = activeVariant ? activeVariant.price : item.price;
  const activeOriginal = activeVariant
    ? activeVariant.originalPrice
    : item.originalPrice;

  const hasFlavors = Boolean(item.flavors && item.flavors.length > 0);
  const activeFlavor = hasFlavors ? item.flavors![selectedFlavorIdx] : null;

  const minQty = item.minOrder ?? 1;
  const totalPrice = activePrice * qty;
  const profile = CATEGORY_PROFILES[item.cat] ?? CATEGORY_PROFILES["TUB CAKE"];

  const badgeLabel = item.badge || productTag;
  const badgeStyle =
    (badgeLabel && TAG_STYLES[badgeLabel as keyof typeof TAG_STYLES]) ||
    "bg-coral text-vanilla";

  const activeZone = ZONES.find((z) => z.name === zone) ?? ZONES[0];

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setLensPos({ x, y });
  };

  const handleAddToBag = () => {
    const slugParts = [item.id];
    if (activeVariant) {
      slugParts.push(activeVariant.label.toLowerCase().replace(/\s+/g, "-"));
    }
    if (activeFlavor) {
      slugParts.push(activeFlavor.toLowerCase().replace(/\s+/g, "-"));
    }
    const cartId = slugParts.join("--");
    add(cartId, qty);

    const details = [
      activeVariant?.label,
      activeFlavor,
      giftNote.trim() ? `Note: "${giftNote.trim()}"` : null,
    ]
      .filter(Boolean)
      .join(" · ");

    toast.success("Added to your express bag", {
      description: `${qty} × ${item.name}${details ? ` (${details})` : ""} — ৳${totalPrice}`,
      action: {
        label: "Open Bag →",
        onClick: () => setOpen(true),
      },
    });
  };

  const showImage = Boolean(item.image) && !imgError;

  return (
    <section className="relative pt-24 md:pt-24 pb-16 md:pb-24">
      <div className="max-w-[1320px] mx-auto px-6 md:px-10">
        {/* ── Top Breadcrumb & Back Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-cocoa/10"
        >
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold tracking-[0.16em] uppercase text-cocoa/55"
          >
            <Link href="/" className="hover:text-coral transition-colors">
              Home
            </Link>
            <ChevronRight size={12} className="text-cocoa/35" />
            <Link href="/#menu" className="hover:text-coral transition-colors">
              Menu
            </Link>
            <ChevronRight size={12} className="text-cocoa/35" />
            <span className="text-cocoa/70">{item.cat}</span>
            <ChevronRight size={12} className="text-cocoa/35" />
            <span className="text-cocoa truncate max-w-[200px] sm:max-w-xs">
              {item.name}
            </span>
          </nav>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-cocoa hover:text-coral transition-colors"
            data-testid="back-to-batch"
          >
            <ArrowLeft size={14} />
            Back to Today&apos;s Fresh Batch
          </Link>
        </motion.div>

        {/* ── Asymmetric Editorial Split ── */}
        <div className="mt-10 md:mt-14 grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left Column — Arch & Tactile Frame Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative"
          >
            <div
              onClick={() => showImage && setZoomed((z) => !z)}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setZoomed(false)}
              className={`group relative overflow-hidden rounded-t-[160px] md:rounded-t-[220px] rounded-b-[2rem] bg-peach/60 border border-cocoa/15 aspect-[4/4.4] shadow-[0_36px_70px_-34px_rgba(92,46,20,0.35)] ${
                showImage ? "cursor-zoom-in" : ""
              }`}
              data-testid="product-hero-frame"
            >
              {/* Top-left TAG_STYLES badge */}
              {badgeLabel && (
                <span
                  className={`absolute top-6 left-6 z-20 rounded-md px-3 py-1.5 text-[10px] font-bold tracking-[0.2em] uppercase shadow-sm ${badgeStyle}`}
                >
                  {badgeLabel}
                </span>
              )}

              {showImage ? (
                <img
                  src={item.image}
                  alt={item.name}
                  onError={() => setImgError(true)}
                  style={
                    zoomed
                      ? { transformOrigin: `${lensPos.x}% ${lensPos.y}%` }
                      : undefined
                  }
                  className={`w-full h-full object-cover object-bottom transition-transform duration-500 ease-out ${
                    zoomed ? "scale-[1.45]" : "group-hover:scale-[1.06]"
                  }`}
                />
              ) : (
                <div
                  className="w-full h-full flex flex-col items-center justify-center bg-[#F9E4D4] text-cocoa/45 gap-3"
                  aria-hidden="true"
                >
                  <Croissant size={56} strokeWidth={1.3} />
                  <span className="font-script text-2xl text-cocoa/60">
                    fresh from the oven
                  </span>
                </div>
              )}

              {/* Hover / Click zoom cue */}
              {showImage && (
                <div className="absolute bottom-4 left-5 z-20 inline-flex items-center gap-1.5 rounded-full bg-vanilla/90 backdrop-blur-sm border border-cocoa/15 px-3.5 py-1.5 text-[10px] font-semibold tracking-[0.12em] text-cocoa/80 shadow-sm">
                  <ZoomIn size={12} className="text-coral" />
                  <span>
                    {zoomed
                      ? "Click to reset view"
                      : "Hover or click to inspect glaze & texture"}
                  </span>
                </div>
              )}
            </div>

            {/* Bottom-right rotating mini-stamp */}
            <div className="absolute -bottom-6 right-2 md:-right-4 z-20 pointer-events-none">
              <MiniStamp />
            </div>
          </motion.div>

          {/* Right Column — Interactive Ordering & Live Price Studio */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="lg:pt-4"
          >
            <span className="font-script text-3xl text-coral">
              {profile.eyebrow}
            </span>

            <h1 className="mt-2 font-display font-bold uppercase text-3xl md:text-5xl leading-[1.05] tracking-[0.03em] text-cocoa">
              {item.name}
            </h1>

            {/* Rating summary pill */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <a
                href="#reviews"
                className="inline-flex items-center gap-1.5 rounded-full bg-peach/70 border border-cocoa/15 px-3.5 py-1.5 text-xs font-semibold text-cocoa hover:border-coral transition-colors"
              >
                <Star size={13} className="fill-honey text-honey" />
                <span>4.9 · 48 Dhaka Reviews</span>
              </a>
              {item.minOrderNote && (
                <span className="inline-flex items-center rounded-full bg-honey/35 px-3.5 py-1.5 text-[11px] font-bold tracking-[0.14em] uppercase text-cocoa">
                  {item.minOrderNote}
                </span>
              )}
            </div>

            {/* Dynamic Price Display */}
            <div className="mt-6 flex items-baseline gap-3">
              {activeOriginal && activeOriginal > activePrice && (
                <span className="font-sans text-xl text-cocoa/45 line-through">
                  ৳{activeOriginal}
                </span>
              )}
              <span
                className="font-sans font-bold text-3xl text-coral"
                data-testid="product-active-price"
              >
                ৳{activePrice}
              </span>
              {activeOriginal && activeOriginal > activePrice && (
                <span className="rounded-full bg-coral/15 px-2.5 py-0.5 text-[10px] font-bold tracking-[0.14em] uppercase text-coral">
                  Save ৳{activeOriginal - activePrice}
                </span>
              )}
            </div>

            <p className="mt-4 text-base text-cocoa/75 font-light leading-relaxed max-w-xl">
              {item.desc}
            </p>

            {/* Variant Size Selectors */}
            {hasVariants && (
              <div className="mt-7">
                <span className="block text-[10px] font-bold tracking-[0.26em] uppercase text-cocoa/60">
                  Select Size
                </span>
                <div className="mt-2.5 flex flex-wrap gap-2.5">
                  {item.variants!.map((v, i) => {
                    const active = selectedVariantIdx === i;
                    return (
                      <button
                        key={v.label}
                        type="button"
                        onClick={() => setSelectedVariantIdx(i)}
                        className={`relative isolate rounded-full border px-5 py-2 text-xs font-bold tracking-[0.14em] uppercase transition-colors ${
                          active
                            ? "text-vanilla border-cocoa"
                            : "border-cocoa/20 bg-vanilla/70 text-cocoa/75 hover:border-cocoa/50 hover:text-cocoa"
                        }`}
                      >
                        {active && (
                          <motion.span
                            layoutId="active-variant-pill"
                            transition={{
                              type: "spring",
                              stiffness: 380,
                              damping: 30,
                            }}
                            className="absolute inset-0 rounded-full bg-cocoa z-0"
                          />
                        )}
                        <span className="relative z-10">
                          {v.label} · ৳{v.price}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Multi-Flavor Pills */}
            {hasFlavors && (
              <div className="mt-6">
                <span className="block text-[10px] font-bold tracking-[0.26em] uppercase text-cocoa/60">
                  Choose Filling / Flavor
                </span>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {item.flavors!.map((f, i) => {
                    const active = selectedFlavorIdx === i;
                    return (
                      <button
                        key={f}
                        type="button"
                        onClick={() => setSelectedFlavorIdx(i)}
                        className={`relative isolate rounded-full border px-4 py-1.5 text-xs font-semibold tracking-[0.06em] transition-colors ${
                          active
                            ? "text-vanilla border-coral"
                            : "border-cocoa/20 bg-vanilla/70 text-cocoa/75 hover:border-cocoa/50 hover:text-cocoa"
                        }`}
                      >
                        {active && (
                          <motion.span
                            layoutId="active-flavor-pill"
                            transition={{
                              type: "spring",
                              stiffness: 380,
                              damping: 30,
                            }}
                            className="absolute inset-0 rounded-full bg-coral z-0"
                          />
                        )}
                        <span className="relative z-10">{f}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Handwritten Gift Card Note Toggle */}
            <div className="mt-6">
              <button
                type="button"
                onClick={() => setGiftOpen((v) => !v)}
                className="inline-flex items-center gap-2 text-xs font-semibold text-cocoa/75 hover:text-coral transition-colors"
              >
                <Gift size={14} className="text-coral" />
                <span>Add a handwritten gift card note (Free)</span>
              </button>
              <AnimatePresence>
                {giftOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <input
                      type="text"
                      value={giftNote}
                      onChange={(e) => setGiftNote(e.target.value)}
                      maxLength={120}
                      placeholder="e.g., Happy Birthday! Enjoy it warm 🤎"
                      className="mt-2.5 w-full rounded-xl border border-cocoa/20 bg-vanilla px-4 py-2.5 text-sm text-cocoa placeholder:text-cocoa/40 focus:outline-none focus:border-coral"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quantity Stepper & Primary CTA */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <div className="inline-flex items-center justify-between rounded-full border border-cocoa/25 bg-vanilla px-2 py-1.5 sm:w-36 shrink-0">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(minQty, q - 1))}
                  disabled={qty <= minQty}
                  aria-label="Decrease quantity"
                  className="w-9 h-9 rounded-full flex items-center justify-center text-cocoa hover:bg-peach disabled:opacity-35 transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span
                  className="font-sans font-bold text-sm text-cocoa"
                  data-testid="product-qty"
                >
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.min(99, q + 1))}
                  aria-label="Increase quantity"
                  className="w-9 h-9 rounded-full flex items-center justify-center text-cocoa hover:bg-peach transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToBag}
                data-testid="product-add-to-bag"
                className="flex-1 inline-flex items-center justify-center gap-2.5 rounded-full bg-cocoa text-vanilla px-7 py-4 text-[11px] font-bold tracking-[0.22em] uppercase hover:bg-coral transition-colors duration-300 shadow-[0_14px_30px_-14px_rgba(92,46,20,0.45)]"
              >
                <ShoppingBag size={15} />
                <span>ADD TO EXPRESS BAG — ৳{totalPrice}</span>
              </button>
            </div>

            {minQty > 1 && (
              <p className="mt-2.5 text-xs text-cocoa/60 font-light">
                {item.cat === "DONUTS" && minQty === 4
                  ? "Freshly fried per batch — minimum order is 4 pieces for artisan donuts."
                  : `Minimum order for this treat is ${minQty} pieces.`}
              </p>
            )}

            {/* Live Dhaka Express Delivery Promise Bar */}
            <div className="mt-8 rounded-2xl bg-[#F9E4D4] border border-cocoa/15 p-4 md:p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-cocoa">
                  <Bike size={15} className="text-coral" />
                  Dhaka Express Delivery
                </span>
                <span className="text-xs font-semibold text-cocoa">
                  Delivered warm in ~{activeZone.eta.toLowerCase()} · ৳
                  {activeZone.fee}
                </span>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {DELIVERY_AREAS.map((area) => {
                  const isActive = zone === area.zoneName;
                  return (
                    <button
                      key={area.label}
                      type="button"
                      onClick={() => setZone(area.zoneName)}
                      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-bold tracking-[0.12em] uppercase transition-colors ${
                        isActive
                          ? "bg-cocoa text-vanilla"
                          : "bg-vanilla/70 text-cocoa/70 hover:bg-vanilla hover:text-cocoa"
                      }`}
                    >
                      {isActive && <Check size={10} />}
                      {area.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
