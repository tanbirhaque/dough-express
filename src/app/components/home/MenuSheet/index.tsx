import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { MENU, MENU_CATS } from "@/data/bakery";
import { useCart } from "@/context/CartContext";
import { MarginArtLeft, MarginArtRight } from "@/components/decor/MarginArt";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type MenuItem = (typeof MENU)[number];

interface MenuSheetProps {
  filter: string;
  onFilter: (cat: string) => void;
}

export default function MenuSheet({ filter, onFilter }: MenuSheetProps) {
  const { add } = useCart();
  const visible = MENU.filter(
    (m: MenuItem) => filter === "ALL" || m.cat === filter,
  );

  return (
    <section
      id="menu"
      className="relative py-20 md:py-28 scroll-mt-16"
      data-testid="menu-sheet"
    >
      <MarginArtLeft />
      <MarginArtRight />
      <div className="max-w-6xl mx-auto px-6 md:px-10">
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
              data-testid={`menu-filter-${cat.toLowerCase()}`}
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

        <motion.div
          layout
          className="mt-12 md:mt-16 grid md:grid-cols-2 gap-x-16 gap-y-9"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((item: MenuItem) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: EASE }}
                data-testid={`menu-item-${item.id}`}
              >
                <div className="flex items-baseline">
                  <h4 className="font-display font-semibold uppercase text-xl md:text-2xl tracking-[0.04em] text-cocoa whitespace-nowrap">
                    {item.name}
                  </h4>
                  <span className="leader" aria-hidden="true" />
                  <span className="shrink-0 font-sans font-bold text-sm text-coral">
                    ৳{item.price}
                  </span>
                  <button
                    data-testid={`menu-add-${item.id}`}
                    onClick={() => {
                      add(item.id);
                      toast.success("Added to your bag", {
                        description: item.name,
                      });
                    }}
                    aria-label={`Add ${item.name} to cart`}
                    className="ml-3 shrink-0 w-7 h-7 self-center rounded-full border border-cocoa/25 text-cocoa/60 flex items-center justify-center hover:bg-coral hover:border-coral hover:text-vanilla transition-all duration-300"
                  >
                    <Plus size={13} />
                  </button>
                </div>
                <p className="mt-1 pr-10 text-sm text-cocoa/55 font-light">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
