"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, MessageSquarePlus, Star } from "lucide-react";
import { toast } from "sonner";
import { INITIAL_REVIEWS, type CustomerReview } from "@/app/data/bakery";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type FilterKey = "all" | "verified" | "flavor";

const DISTRIBUTION = [
  { stars: 5, pct: 91 },
  { stars: 4, pct: 7 },
  { stars: 3, pct: 2 },
  { stars: 2, pct: 0 },
  { stars: 1, pct: 0 },
];

export default function ProductReviews({
  productName,
}: {
  productName: string;
}) {
  const [reviews, setReviews] = useState<CustomerReview[]>(INITIAL_REVIEWS);
  const [filter, setFilter] = useState<FilterKey>("all");
  const [formOpen, setFormOpen] = useState(false);

  const [name, setName] = useState("");
  const [area, setArea] = useState("Dhanmondi");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const visible = reviews.filter((r) => {
    if (filter === "verified") return r.verified;
    if (filter === "flavor") return r.hasFlavorNote;
    return true;
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) {
      toast.error("Please add your name and review comment.");
      return;
    }

    const newReview: CustomerReview = {
      id: `r-${Date.now()}`,
      name: name.trim(),
      area,
      rating,
      ordered: productName,
      verified: true,
      hasFlavorNote: true,
      comment: comment.trim(),
      date: "Just now",
    };

    setReviews((prev) => [newReview, ...prev]);
    setName("");
    setComment("");
    setRating(5);
    setFormOpen(false);
    toast.success("Thank you for your Dhaka review!");
  };

  return (
    <section id="reviews" className="py-16 md:py-24 scroll-mt-20">
      <div className="max-w-[1320px] mx-auto px-6 md:px-10">
        <div className="text-center mb-12">
          <span className="font-script text-3xl text-coral">
            loved across dhaka
          </span>
          <h2 className="mt-1 font-display font-bold uppercase text-3xl md:text-5xl tracking-[0.04em] text-cocoa">
            Customer Reviews
          </h2>
        </div>

        <div className="grid lg:grid-cols-[0.85fr_1.45fr] gap-8 lg:gap-12 items-start">
          {/* Editorial Rating Overview Card */}
          <div className="bg-peach/50 border border-cocoa/15 rounded-3xl p-8">
            <div className="flex items-baseline gap-2">
              <span className="font-display font-bold text-5xl md:text-6xl text-cocoa">
                4.9
              </span>
              <span className="font-sans text-lg text-cocoa/55">/ 5.0</span>
            </div>

            <div className="mt-3 flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className="fill-[#F7C668] text-[#F7C668]"
                />
              ))}
              <span className="ml-2 text-xs font-semibold text-cocoa/65">
                Based on {43 + reviews.length} Dhaka deliveries
              </span>
            </div>

            {/* Distribution bars */}
            <div className="mt-6 space-y-2.5">
              {DISTRIBUTION.map((row) => (
                <div
                  key={row.stars}
                  className="flex items-center gap-3 text-xs"
                >
                  <span className="w-8 font-bold text-cocoa/75">
                    {row.stars} ★
                  </span>
                  <div className="flex-1 h-2 rounded-full bg-vanilla overflow-hidden border border-cocoa/10">
                    <div
                      style={{ width: `${row.pct}%` }}
                      className="h-full rounded-full bg-[#F7C668]"
                    />
                  </div>
                  <span className="w-8 text-right text-cocoa/55">
                    {row.pct}%
                  </span>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setFormOpen((v) => !v)}
              className="mt-7 w-full inline-flex items-center justify-center gap-2 rounded-full bg-cocoa text-vanilla py-3.5 text-[11px] font-bold tracking-[0.22em] uppercase hover:bg-coral transition-colors"
            >
              <MessageSquarePlus size={15} />
              <span>{formOpen ? "Close Review Form" : "Write a Review"}</span>
            </button>

            {/* Inline Review Form */}
            <AnimatePresence>
              {formOpen && (
                <motion.form
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  onSubmit={handleSubmit}
                  className="overflow-hidden"
                >
                  <div className="mt-5 pt-5 border-t border-cocoa/15 space-y-3">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name (e.g., Ayesha Karim)"
                      className="w-full rounded-xl border border-cocoa/20 bg-vanilla px-3.5 py-2.5 text-sm text-cocoa focus:outline-none focus:border-coral"
                    />
                    <div className="grid grid-cols-2 gap-2.5">
                      <select
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        className="rounded-xl border border-cocoa/20 bg-vanilla px-3 py-2.5 text-xs font-semibold text-cocoa focus:outline-none focus:border-coral"
                      >
                        <option value="Dhanmondi">Dhanmondi</option>
                        <option value="Gulshan">Gulshan</option>
                        <option value="Banani">Banani</option>
                        <option value="Uttara">Uttara</option>
                        <option value="Mirpur">Mirpur</option>
                      </select>
                      <select
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        className="rounded-xl border border-cocoa/20 bg-vanilla px-3 py-2.5 text-xs font-semibold text-cocoa focus:outline-none focus:border-coral"
                      >
                        <option value={5}>5 ★ Loved it</option>
                        <option value={4}>4 ★ Great</option>
                        <option value={3}>3 ★ Good</option>
                      </select>
                    </div>
                    <textarea
                      rows={3}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Share how it tasted and how fast it arrived..."
                      className="w-full rounded-xl border border-cocoa/20 bg-vanilla px-3.5 py-2.5 text-sm text-cocoa focus:outline-none focus:border-coral"
                    />
                    <button
                      type="submit"
                      className="w-full rounded-full bg-coral text-vanilla py-2.5 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-cocoa transition-colors"
                    >
                      Post Review
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Right Side: Filter Pills & 2-Column Editorial Grid */}
          <div>
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                { key: "all" as const, label: "All Reviews" },
                { key: "verified" as const, label: "Verified Dhaka Orders" },
                { key: "flavor" as const, label: "With Flavor Notes" },
              ].map((pill) => (
                <button
                  key={pill.key}
                  type="button"
                  onClick={() => setFilter(pill.key)}
                  className={`rounded-full border px-4 py-1.5 text-[10px] font-bold tracking-[0.16em] uppercase transition-colors ${
                    filter === pill.key
                      ? "bg-cocoa text-vanilla border-cocoa"
                      : "border-cocoa/20 text-cocoa/65 hover:border-cocoa/50 hover:text-cocoa"
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {visible.map((rev, i) => (
                <motion.article
                  key={rev.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: i * 0.05, duration: 0.45, ease: EASE }}
                  className="rounded-2xl bg-vanilla border border-cocoa/15 p-6 shadow-[0_14px_30px_-24px_rgba(92,46,20,0.3)]"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex gap-0.5">
                      {Array.from({ length: rev.rating }).map((_, idx) => (
                        <Star
                          key={idx}
                          size={12}
                          className="fill-[#F7C668] text-[#F7C668]"
                        />
                      ))}
                    </div>
                    <span className="text-[11px] text-cocoa/45">
                      {rev.date}
                    </span>
                  </div>

                  <p className="mt-3 text-sm text-cocoa/80 font-light leading-relaxed">
                    &ldquo;{rev.comment}&rdquo;
                  </p>

                  <div className="mt-4 pt-3 border-t border-cocoa/10 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="block text-xs font-bold text-cocoa">
                        {rev.name} · {rev.area}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-coral mt-0.5">
                        <CheckCircle2 size={11} />
                        Ordered: {rev.ordered}
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
