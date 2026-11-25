"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUp,
  Croissant,
  Globe,
  Heart,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";
import { FOOTER_BAKES, INSTAGRAM } from "@/data/bakery";
import { scrollToId } from "@/lib/lenis";
import Logo from "@/components/Logo";

interface FooterBake {
  name: string;
  tag: string;
  img: string;
  alt: string;
}

interface InstaPost {
  img: string;
  alt: string;
}

const LINKS = [
  { label: "Home", id: "#home" },
  { label: "Popular Products", id: "#popular" },
  { label: "Best Seller", id: "#story" },
  { label: "Today's Fresh Menu", id: "#menu" },
  { label: "Dhaka Express Zones", id: "#zones" },
];

const SOCIAL_ICONS: LucideIcon[] = [Heart, Globe, MessageCircle];

function FooterImage({
  src,
  alt,
  className,
  fallbackClassName,
  iconSize = 18,
}: {
  src: string;
  alt: string;
  className: string;
  fallbackClassName: string;
  iconSize?: number;
}) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className={`${fallbackClassName} flex items-center justify-center bg-peach/15 text-vanilla/50`}
        aria-hidden="true"
      >
        <Croissant size={iconSize} strokeWidth={1.5} />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 360);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            onClick={() => scrollToId("#home", 0)}
            aria-label="Go to top"
            data-testid="go-to-top"
            className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-cocoa text-vanilla border border-vanilla/20 shadow-[0_12px_28px_-8px_rgba(92,46,20,0.5)] flex items-center justify-center hover:bg-coral transition-colors duration-300"
          >
            <ArrowUp size={18} strokeWidth={2} />
          </motion.button>
        )}
      </AnimatePresence>

      <footer
        id="contact"
        className="bg-cocoa text-vanilla scroll-mt-16"
        data-testid="footer"
      >
        <div className="max-w-[1320px] mx-auto px-6 md:px-10 pt-16 md:pt-20 pb-10">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.9fr_1.2fr]">
            <div>
              <Logo dark />
              <p className="mt-5 max-w-xs text-sm text-vanilla/60 font-light leading-relaxed">
                Small-batch filled bomboloni, fudgy Belgian brownies, bento
                cheesecakes &amp; viral tub cakes&mdash;baked fresh daily in
                Dhaka with 60-minute express delivery.
              </p>
              <p className="mt-3 text-xs text-honey/90 font-light">
                Daily Baking Hours: 10:00 AM – 10:00 PM · Dhaka Express Delivery
              </p>
              <div className="mt-6 flex gap-3">
                {SOCIAL_ICONS.map((Icon: LucideIcon, i: number) => (
                  <a
                    key={i}
                    href="#contact"
                    onClick={(e) => e.preventDefault()}
                    aria-label="Social link"
                    className="w-9 h-9 rounded-full border border-vanilla/20 flex items-center justify-center text-vanilla/70 hover:bg-coral hover:border-coral hover:text-vanilla transition-all duration-300"
                  >
                    <Icon size={15} strokeWidth={1.8} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-[11px] font-bold tracking-[0.3em] text-honey uppercase">
                Useful Links
              </h4>
              <ul className="mt-5 space-y-3">
                {LINKS.map((l) => (
                  <li key={l.label}>
                    <button
                      data-testid={`footer-link-${l.id.slice(1)}`}
                      onClick={() => scrollToId(l.id)}
                      className="text-sm text-vanilla/65 hover:text-coral transition-colors font-light"
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] font-bold tracking-[0.3em] text-honey uppercase">
                Latest Bakes
              </h4>
              <div className="mt-5 flex flex-col gap-3">
                {FOOTER_BAKES.map((b: FooterBake, i: number) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => scrollToId("#menu")}
                    className="group flex items-center gap-3 text-left"
                  >
                    <FooterImage
                      src={b.img}
                      alt={b.alt}
                      className="w-14 h-14 rounded-xl object-cover bg-peach/20 shrink-0 transition-transform duration-300 group-hover:scale-105"
                      fallbackClassName="w-14 h-14 rounded-xl shrink-0"
                      iconSize={18}
                    />
                    <span className="min-w-0">
                      <span className="block text-sm text-vanilla/85 group-hover:text-coral transition-colors font-medium leading-snug">
                        {b.name}
                      </span>
                      <span className="block text-xs text-vanilla/55 font-light mt-0.5">
                        {b.tag}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-[11px] font-bold tracking-[0.3em] text-honey uppercase">
                Instagram
              </h4>
              <div
                className="mt-5 grid grid-cols-3 gap-2"
                data-testid="instagram-grid"
              >
                {INSTAGRAM.map((post: InstaPost, i: number) => (
                  <a
                    key={i}
                    href="#contact"
                    onClick={(e) => e.preventDefault()}
                    className="group relative aspect-square rounded-lg overflow-hidden bg-peach/10"
                    aria-label="Instagram post"
                  >
                    <FooterImage
                      src={post.img}
                      alt={post.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      fallbackClassName="w-full h-full"
                      iconSize={20}
                    />
                    <span className="absolute inset-0 bg-coral/0 group-hover:bg-coral/30 transition-colors duration-300 flex items-center justify-center">
                      <Heart
                        size={16}
                        className="text-vanilla opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-14 pt-6 border-t border-vanilla/15 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] tracking-[0.14em] text-vanilla/45">
            <span>
              &copy; {new Date().getFullYear()} DOUGH EXPRESS &mdash; BAKED
              FRESH DAILY IN DHAKA
            </span>
            <span>60-MIN EXPRESS DELIVERY &middot; DHAKA, BANGLADESH</span>
          </div>
        </div>
      </footer>
    </>
  );
}
