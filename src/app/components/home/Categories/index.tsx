import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/app/data/bakery";
import { scrollToId } from "@/app/lib/lenis";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Categories({
  onFilter,
}: {
  onFilter: (filter: string) => void;
}) {
  return (
    <section
      id="categories"
      className="py-20 md:py-28"
      data-testid="category-showcase"
    >
      <div className="max-w-[1320px] mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="text-center"
        >
          <span className="font-script text-3xl text-coral">
            pick a craving
          </span>
          <h2 className="mt-2 font-display font-bold uppercase text-3xl md:text-5xl tracking-[0.05em] text-cocoa">
            Four Ways to Express
          </h2>
        </motion.div>

        <div className="mt-12 md:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {CATEGORIES.map((cat, i) => (
            <motion.button
              key={cat.filter}
              data-testid={`category-${cat.filter.toLowerCase()}`}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.08, duration: 0.8, ease: EASE }}
              onClick={() => {
                onFilter(cat.filter);
                scrollToId("#menu");
              }}
              className="group text-left"
            >
              <div
                className={`overflow-hidden aspect-[4/5] bg-peach/60 ${
                  cat.shape === "arch"
                    ? "rounded-t-[10rem] rounded-b-[1.5rem]"
                    : "rounded-b-[10rem] rounded-t-[1.5rem]"
                }`}
              >
                <img
                  src={cat.img}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.07]"
                />
              </div>
              <h3 className="mt-5 font-display font-semibold text-lg md:text-xl tracking-[0.08em] uppercase text-cocoa group-hover:text-coral transition-colors">
                {cat.name}
              </h3>
              <p className="mt-1 text-sm text-cocoa/60 font-light leading-relaxed">
                {cat.desc}
              </p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.24em] text-coral opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                EXPRESS ME <ArrowRight size={12} />
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
