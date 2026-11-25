import { Globe, Heart, MessageCircle } from "lucide-react";
import { FOOTER_BAKES, INSTAGRAM } from "@/data/bakery";
import { scrollToId } from "@/lib/lenis";
import Logo from "@/components/Logo";
import type { LucideIcon } from "lucide-react";

interface FooterBake {
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
  { label: "Our Story", id: "#story" },
  { label: "Fresh Menu", id: "#menu" },
  { label: "Express Zones", id: "#zones" },
];

const SOCIAL_ICONS: LucideIcon[] = [Heart, Globe, MessageCircle];

export default function Footer() {
  return (
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
              A boutique express bakery in the heart of Dhaka &mdash; small
              batches, real Belgian chocolate, and donuts that leave the oven
              still warm.
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
                <div key={i} className="flex items-center gap-3">
                  <img
                    src={b.img}
                    alt={b.alt}
                    loading="lazy"
                    className="w-14 h-14 rounded-xl object-cover bg-peach/20"
                  />
                  <span className="text-sm text-vanilla/65 font-light">
                    from this morning&apos;s batch
                  </span>
                </div>
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
                  <img
                    src={post.img}
                    alt={post.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
            &copy; {new Date().getFullYear()} DOUGH EXPRESS &mdash; BAKED WITH
            BUTTER IN DHAKA
          </span>
          <span>DEMO STOREFRONT &mdash; ORDERS ARE SIMULATED</span>
        </div>
      </div>
    </footer>
  );
}
