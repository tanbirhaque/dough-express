"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Croissant, Plus, Star } from "lucide-react";
import { toast } from "sonner";
import { PRODUCTS, TAG_STYLES, type Product } from "@/app/data/bakery";
import { useCart } from "@/app/context/CartContext";
import { MarginArtLeft, MarginArtRight } from "../decor/MarginArt";

const EASE = [0.22, 1, 0.36, 1] as const;

function Stars() {
  return (
    <div className="flex gap-0.5 justify-center" aria-label="Rated 5 out of 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={11} className="fill-honey text-honey" />
      ))}
    </div>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const { add } = useCart();
  const [imgError, setImgError] = useState(false);

  const addToCart = () => {
    add(product.id);
    toast.success("Added to your bag", { description: product.name });
  };

  const tagStyle =
    TAG_STYLES[product.tag as keyof typeof TAG_STYLES] ||
    "bg-coral text-vanilla";
  const showImage = Boolean(product.img) && !imgError;

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: (index % 4) * 0.07, duration: 0.7, ease: EASE }}
      className="group"
      data-testid={`product-card-${product.id}`}
    >
      <div className="relative bg-peach/60 rounded-[1.75rem] aspect-square overflow-hidden border border-cocoa/10">
        <span
          className={`absolute top-4 left-4 z-10 rounded-md px-2.5 py-1.5 text-[9px] font-bold tracking-[0.18em] uppercase ${tagStyle}`}
        >
          {product.tag}
        </span>

        {showImage ? (
          <img
            src={product.img}
            alt={product.alt}
            loading="lazy"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
          />
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center bg-[#F9E4D4] text-cocoa/45"
            aria-hidden="true"
          >
            <Croissant size={32} strokeWidth={1.4} />
          </div>
        )}

        <button
          data-testid={`product-add-${product.id}`}
          onClick={addToCart}
          className="absolute bottom-5 left-1/2 -translate-x-1/2 translate-y-16 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100 transition-all duration-300 bg-vanilla/95 text-cocoa rounded-full px-5 py-2.5 text-[10px] font-bold tracking-[0.18em] shadow-lg hover:bg-coral hover:text-vanilla z-10"
        >
          + ADD TO CART
        </button>

        <button
          data-testid={`product-add-touch-${product.id}`}
          onClick={addToCart}
          aria-label={`Add ${product.name} to cart`}
          className="lg:hidden absolute bottom-4 right-4 w-9 h-9 rounded-full bg-cocoa text-vanilla flex items-center justify-center shadow-lg z-10 hover:bg-coral transition-colors"
        >
          <Plus size={15} />
        </button>
      </div>

      <div className="mt-4 text-center">
        <Stars />
        <h3 className="mt-2 text-[13px] font-bold tracking-[0.14em] uppercase text-cocoa">
          {product.name}
        </h3>
        <div className="mt-1 flex items-center justify-center gap-2">
          {"originalPrice" in product &&
            Boolean((product as any).originalPrice) && (
              <span className="font-sans text-sm text-cocoa/45 line-through">
                ৳{(product as any).originalPrice}
              </span>
            )}
          <span className="font-sans font-bold text-base text-coral">
            ৳{product.price}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export default function Products() {
  return (
    <section
      id="popular"
      className="relative py-20 md:py-28 scroll-mt-20 bg-vanilla"
      data-testid="popular-products"
    >
      <MarginArtLeft />
      <MarginArtRight />
      <div className="max-w-[1320px] mx-auto px-6 md:px-16 ">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="text-center"
        >
          <span className="font-script text-3xl text-coral">
            the express favourites
          </span>
          <h2 className="mt-2 font-display font-bold uppercase text-4xl md:text-6xl tracking-[0.04em] text-cocoa">
            Popular Products
          </h2>
          <p className="mt-3 text-[11px] font-semibold tracking-[0.3em] text-cocoa/50 uppercase">
            Baked at dawn · Gone by dusk
          </p>
        </motion.div>

        <div className="mt-12 md:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
