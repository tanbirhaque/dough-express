"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Croissant } from "lucide-react";
import { toast } from "sonner";
import { IMAGES } from "@/data/bakery";
import { useCart } from "@/context/CartContext";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function SplitFeature() {
  const { add, setOpen } = useCart();
  const [imgError, setImgError] = useState(false);

  const orderNow = () => {
    add("m19--500-ml");
    toast.success("Added to your bag", {
      description: "Chocolate Overload Heavy Ganache Tub (500 ml) · ৳500",
    });
    setOpen(true);
  };

  return (
    <section id="story" className="scroll-mt-16" data-testid="split-feature">
      <div className="grid lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1 }}
          className="relative min-h-[360px] lg:min-h-[600px] overflow-hidden bg-[#F9E4D4]"
        >
          {!imgError ? (
            <motion.img
              initial={{ scale: 1.15 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.8, ease: EASE }}
              src={IMAGES.split}
              alt="Chocolate Overload Heavy Ganache Tub Cake"
              onError={() => setImgError(true)}
              className="absolute inset-0 w-full h-full object-cover object-[50%_80%]"
            />
          ) : (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center bg-[#F9E4D4] text-cocoa/45"
              aria-hidden="true"
            >
              <Croissant size={48} strokeWidth={1.3} />
            </div>
          )}
        </motion.div>

        <div className="bg-peach flex flex-col justify-center p-8 md:p-16 lg:p-24">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <span className="font-script text-3xl text-coral">
              our #1 bestseller
            </span>
            <h2 className="mt-4 font-display font-bold uppercase text-3xl md:text-[2.75rem] leading-[1.1] text-cocoa">
              Have you tried our Chocolate Overload Heavy Ganache Tub?
            </h2>
            <p className="mt-6 max-w-md text-cocoa/70 leading-relaxed font-light">
              Baked fresh every morning in small batches&mdash;ultra-moist
              Belgian chocolate sponge drenched in thick, velvety dark ganache.
              Available in 500 ml (৳500) and 1000 ml (৳800) tubs, delivered warm
              to your doorstep across Dhaka in 60 minutes.
            </p>
            <button
              data-testid="order-belgian-fudge"
              onClick={orderNow}
              className="mt-9 group inline-flex items-center gap-3 self-start border-b-2 border-coral pb-2 text-[11px] font-bold tracking-[0.3em] uppercase text-cocoa hover:text-coral transition-colors"
            >
              Order Now
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1.5"
              />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
