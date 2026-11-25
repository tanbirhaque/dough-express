"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Croissant } from "lucide-react";
import { MENU, PRODUCTS, type MenuItemType } from "@/app/data/bakery";
import {
  MarginArtLeft,
  MarginArtRight,
} from "@/app/components/decor/MarginArt";
import ProductHero from "@/app/components/product/ProductHero";
import InsideTheBatch from "@/app/components/product/InsideTheBatch";
import ProductReviews from "@/app/components/product/ProductReviews";
import SimilarProducts from "@/app/components/product/SimilarProducts";
import CartDrawer from "@/app/components/home/CartDrawer";
import Footer from "@/app/components/home/Footer";

export default function ProductDetailsPage() {
  const params = useParams<{ id: string }>();
  const rawId = decodeURIComponent(params?.id ?? "");
  const baseId = rawId.split("--")[0];

  const menuItem: MenuItemType | undefined = MENU.find((m) => m.id === baseId);
  const prodMatch = PRODUCTS.find((p) => p.id === baseId);

  const resolvedItem: MenuItemType | undefined =
    menuItem ??
    (prodMatch
      ? {
          id: prodMatch.id,
          name: prodMatch.name,
          price: prodMatch.price,
          cat: prodMatch.cat,
          desc: `${prodMatch.name} — baked fresh daily in small batches at Dough Express Dhaka.`,
          image: prodMatch.img,
          badge: prodMatch.tag,
          originalPrice:
            "originalPrice" in prodMatch
              ? (prodMatch as { originalPrice?: number }).originalPrice
              : undefined,
        }
      : undefined);

  if (!resolvedItem) {
    return (
      <main className="min-h-screen bg-vanilla flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center px-6 pt-32 pb-24 text-center">
          <span className="w-20 h-20 rounded-full bg-[#F9E4D4] border border-cocoa/15 flex items-center justify-center text-cocoa/60">
            <Croissant size={32} strokeWidth={1.4} />
          </span>
          <span className="mt-6 font-script text-3xl text-coral">
            sold out or missing
          </span>
          <h1 className="mt-2 font-display font-bold uppercase text-3xl md:text-5xl text-cocoa">
            Treat Not Found
          </h1>
          <p className="mt-3 max-w-md text-sm text-cocoa/65 font-light">
            We couldn&apos;t find that bake in today&apos;s batch. Head back to
            explore our freshly glazed donuts, brownies, and tub cakes.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-cocoa text-vanilla px-7 py-3.5 text-[11px] font-bold tracking-[0.22em] uppercase hover:bg-coral transition-colors"
          >
            <ArrowLeft size={14} />
            Return to Today&apos;s Batch
          </Link>
        </div>
        <Footer />
        <CartDrawer />
      </main>
    );
  }

  return (
    <main className="relative bg-vanilla min-h-screen overflow-x-clip">
      <MarginArtLeft />
      <MarginArtRight />

      <ProductHero item={resolvedItem} productTag={prodMatch?.tag} />
      <InsideTheBatch item={resolvedItem} />
      <ProductReviews productName={resolvedItem.name} />
      <SimilarProducts currentItem={resolvedItem} />

      <Footer />
      <CartDrawer />
    </main>
  );
}
