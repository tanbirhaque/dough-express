"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, ShoppingBag, X } from "lucide-react";
// import Logo from "@/components/Logo";
import { scrollToId } from "@/app/lib/lenis";
import { useCart } from "@/app/context/CartContext";

interface NavLink {
  label: string;
  id: string;
}

interface NavLinksProps {
  links: NavLink[];
}

const LEFT_LINKS: NavLink[] = [
  { label: "HOME", id: "#home" },
  { label: "MENU", id: "#menu" },
  { label: "EXPRESS ZONES", id: "#zones" },
];
const RIGHT_LINKS: NavLink[] = [
  { label: "BEST SELLER", id: "#story" },
  { label: "CONTACT", id: "#contact" },
];

const linkCls =
  "relative text-[11px] font-bold tracking-[0.22em] text-cocoa/70 hover:text-cocoa transition-colors after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-coral after:transition-transform hover:after:scale-x-100";

function BagButton() {
  const { count, setOpen } = useCart();
  return (
    <button
      data-testid="cart-button"
      onClick={() => setOpen(true)}
      aria-label="Open your bag"
      className="relative flex items-center justify-center w-11 h-11 rounded-full border border-cocoa/15 text-cocoa hover:bg-peach hover:border-cocoa/30 transition-colors"
    >
      <ShoppingBag size={17} strokeWidth={1.8} />
      <AnimatePresence>
        {count > 0 && (
          <motion.span
            data-testid="cart-badge"
            key={count}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 22 }}
            className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-coral text-vanilla text-[10px] font-bold flex items-center justify-center"
          >
            {count}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const go = (id: string) => {
    setMobileOpen(false);
    if (pathname !== "/" && !document.querySelector(id)) {
      router.push(id === "#home" ? "/" : `/${id}`);
      return;
    }
    scrollToId(id);
  };

  const NavLinks = ({ links }: NavLinksProps) =>
    links.map((l) => (
      <button
        key={l.label}
        data-testid={`nav-${l.id.slice(1)}`}
        onClick={() => go(l.id)}
        className={linkCls}
      >
        {l.label}
      </button>
    ));

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-vanilla/85 backdrop-blur-md border-b border-cocoa/10">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 h-[76px] grid grid-cols-[1fr_auto_1fr] items-center">
        <nav
          className="hidden md:flex items-center gap-8"
          data-testid="nav-left"
        >
          <NavLinks links={LEFT_LINKS} />
        </nav>
        <button
          data-testid="mobile-menu-button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          className="md:hidden w-11 h-11 flex items-center justify-center text-cocoa"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div className="justify-self-center">
          <Link
            href="/"
            className="flex items-center font-caveat text-2xl sm:text-4xl font-bold tracking-tight text-[#5C2E14] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F27B58] rounded-lg"
            aria-label="Dough Express Home"
          >
            <span>D</span>
            <span
              className="inline-flex items-center justify-center mx-[1px] translate-y-[1px]"
              aria-hidden="true"
            >
              <svg
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[19px] h-[19px] sm:w-[21px] sm:h-[21px]"
              >
                {/* Outer glazed pink donut ring */}
                <circle
                  cx="12"
                  cy="12"
                  r="9.5"
                  fill="#F59CB0"
                  stroke="#5C2E14"
                  strokeWidth="2.4"
                />
                {/* Donut hole */}
                <circle
                  cx="12"
                  cy="12"
                  r="3.4"
                  fill="#FFF9F5"
                  stroke="#5C2E14"
                  strokeWidth="2"
                />
                {/* Tiny golden honey sprinkles */}
                <path
                  d="M9.5 5.8L11.2 6.5M15.8 7.6L17.2 9M15.5 16.5L13.8 17.5M7.2 14.5L6.5 12.8"
                  stroke="#F7C668"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span className="sr-only">o</span>
            <span>ugh&nbsp;</span>
            <span className="text-[#F27B58]">Express</span>
            {/* <Truck
                            className="w-5 h-5 ml-1.5 text-[#5C2E14] shrink-0"
                            strokeWidth={2.3}
                            aria-hidden="true"
                        /> */}
          </Link>
          {/* <Logo /> */}
        </div>

        <div className="flex items-center justify-end gap-8">
          <nav
            className="hidden md:flex items-center gap-8"
            data-testid="nav-right"
          >
            <NavLinks links={RIGHT_LINKS} />
          </nav>
          <BagButton />
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            data-testid="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden border-t border-cocoa/10 bg-vanilla/95"
          >
            <div className="flex flex-col gap-5 px-6 py-6">
              {[...LEFT_LINKS, ...RIGHT_LINKS].map((l) => (
                <button
                  key={l.label}
                  onClick={() => go(l.id)}
                  className="text-left text-xs font-bold tracking-[0.24em] text-cocoa/80"
                >
                  {l.label}
                </button>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
