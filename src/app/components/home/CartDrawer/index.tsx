import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Croissant,
  Loader2,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { PAYMENT_OPTIONS, ZONES } from "@/data/bakery";
import { useCart, type DetailedCartItem } from "@/context/CartContext";
import { scrollToId, startLenis, stopLenis } from "@/lib/lenis";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface OrderLine {
  id: string;
  name: string;
  price: number;
  qty: number;
}

interface Order {
  id: string;
  lines: OrderLine[];
  fee: number;
  total: number;
  zone: string;
  eta: string | undefined;
  payment: string;
}

interface ReceiptProps {
  order: Order;
  onDone: () => void;
}

function Receipt({ order, onDone }: ReceiptProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="flex-1 flex flex-col items-center justify-center px-8 text-center"
      data-testid="order-receipt"
    >
      <span className="w-16 h-16 rounded-full bg-honey flex items-center justify-center">
        <Check size={28} className="text-cocoa" strokeWidth={2.5} />
      </span>
      <h3 className="mt-5 font-display font-bold uppercase text-2xl tracking-[0.08em] text-cocoa">
        Order Confirmed
      </h3>
      <p className="mt-1 font-script text-2xl text-coral">
        rider is warming up
      </p>

      <div className="mt-6 w-full rounded-2xl bg-peach/50 p-5 text-left text-sm text-cocoa/80 space-y-1.5">
        <p className="flex justify-between font-sans font-semibold text-cocoa">
          <span>ORDER {order.id}</span>
          <span>{order.payment.toUpperCase()}</span>
        </p>
        {order.lines.map((l: OrderLine) => (
          <p key={l.id} className="flex justify-between font-sans">
            <span>
              {l.qty} × {l.name}
            </span>
            <span>৳{l.qty * l.price}</span>
          </p>
        ))}
        <p className="flex justify-between font-sans text-cocoa/60">
          <span>Delivery · {order.zone}</span>
          <span>৳{order.fee}</span>
        </p>
        <p className="flex justify-between border-t border-cocoa/15 pt-2 mt-2 font-sans font-bold text-cocoa">
          <span>TOTAL</span>
          <span>৳{order.total}</span>
        </p>
        <p className="text-center text-xs text-cocoa/60 pt-2 font-light">
          Express window {order.eta} · pay {order.payment.toLowerCase()} at your
          door
        </p>
      </div>

      <p className="mt-4 text-[10px] tracking-[0.2em] text-cocoa/40 uppercase">
        Simulated order — no payment was taken
      </p>
      <button
        data-testid="receipt-done-button"
        onClick={onDone}
        className="mt-6 bg-cocoa text-vanilla rounded-full px-8 py-3.5 text-[11px] font-bold tracking-[0.24em] hover:bg-coral transition-colors"
      >
        BACK TO BROWSING
      </button>
    </motion.div>
  );
}

export default function CartDrawer() {
  const {
    items,
    count,
    subtotal,
    deliveryFee,
    zone,
    setZone,
    payment,
    setPayment,
    open,
    setOpen,
    order,
    setOrder,
    inc,
    dec,
    remove,
    clear,
  } = useCart();
  const [placing, setPlacing] = useState(false);

  useEffect(() => {
    if (open) {
      stopLenis();
      document.body.style.overflow = "hidden";
    } else {
      startLenis();
      document.body.style.overflow = "";
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);

  const placeOrder = () => {
    setPlacing(true);
    setTimeout(() => {
      setOrder({
        id: `DX-${Math.floor(1000 + Math.random() * 9000)}`,
        lines: items.map((i: DetailedCartItem) => ({
          id: i.id,
          name: i.product?.name ?? "",
          price: i.product?.price ?? 0,
          qty: i.qty,
        })),
        fee: deliveryFee,
        total: subtotal + deliveryFee,
        zone,
        eta: ZONES.find((z: (typeof ZONES)[number]) => z.name === zone)?.eta,
        payment,
      });
      clear();
      setPlacing(false);
    }, 1500);
  };

  const done = () => {
    setOrder(null);
    setOpen(false);
    scrollToId("#popular");
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[70] bg-cocoa/45 backdrop-blur-sm"
            data-testid="cart-backdrop"
          />
          <motion.aside
            initial={{ x: "105%" }}
            animate={{ x: 0 }}
            exit={{ x: "105%" }}
            transition={{ type: "spring", stiffness: 280, damping: 32 }}
            className="fixed right-0 top-0 z-[80] h-full w-full max-w-[440px] bg-vanilla flex flex-col shadow-[-30px_0_60px_-30px_rgba(92,46,20,0.4)]"
            data-testid="cart-drawer"
          >
            <div className="flex items-center justify-between px-7 py-6 border-b border-cocoa/10">
              <div>
                <h3 className="font-display font-bold uppercase text-xl tracking-[0.08em] text-cocoa">
                  Your Express Bag
                </h3>
                <p className="text-[10px] font-semibold tracking-[0.28em] text-cocoa/45 uppercase">
                  {count} item{count === 1 ? "" : "s"} · 60-min delivery
                </p>
              </div>
              <button
                data-testid="cart-close-button"
                onClick={() => setOpen(false)}
                aria-label="Close cart"
                className="w-10 h-10 rounded-full border border-cocoa/15 flex items-center justify-center text-cocoa hover:bg-peach transition-colors"
              >
                <X size={17} />
              </button>
            </div>

            {order ? (
              <Receipt order={order as Order} onDone={done} />
            ) : items.length === 0 ? (
              <div
                className="flex-1 flex flex-col items-center justify-center px-8 text-center"
                data-testid="cart-empty-state"
              >
                <span className="w-16 h-16 rounded-full bg-peach flex items-center justify-center text-cocoa/60">
                  <ShoppingBag size={24} strokeWidth={1.6} />
                </span>
                <p className="mt-5 font-script text-3xl text-cocoa">
                  your bag is feeling hungry
                </p>
                <p className="mt-2 text-sm text-cocoa/55 font-light">
                  Add a warm bake from today&apos;s batch and it will land in
                  the bag here.
                </p>
                <button
                  data-testid="cart-empty-browse-button"
                  onClick={() => {
                    setOpen(false);
                    scrollToId("#popular");
                  }}
                  className="mt-6 bg-cocoa text-vanilla rounded-full px-8 py-3.5 text-[11px] font-bold tracking-[0.24em] hover:bg-coral transition-colors"
                >
                  BROWSE THE BATCH
                </button>
              </div>
            ) : (
              <>
                <div
                  className="flex-1 overflow-y-auto px-7 py-6 space-y-5"
                  data-lenis-prevent
                  data-testid="cart-items"
                >
                  <AnimatePresence initial={false}>
                    {items.map((i: DetailedCartItem) => (
                      <motion.div
                        key={i.id}
                        layout
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 30 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="flex gap-4"
                        data-testid={`cart-item-${i.id}`}
                      >
                        {i.product?.img ? (
                          <img
                            src={i.product.img}
                            alt={i.product.alt}
                            className="w-16 h-16 rounded-xl object-cover bg-peach/60 shrink-0"
                          />
                        ) : (
                          <div
                            className="w-16 h-16 rounded-xl bg-[#F9E4D4] text-cocoa/45 flex items-center justify-center shrink-0"
                            aria-hidden="true"
                          >
                            <Croissant size={20} strokeWidth={1.4} />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-[12px] font-bold tracking-[0.1em] uppercase text-cocoa leading-snug">
                              {i.product?.name}
                            </h4>
                            <button
                              data-testid={`cart-remove-${i.id}`}
                              onClick={() => remove(i.id)}
                              aria-label={`Remove ${i.product?.name}`}
                              className="text-cocoa/35 hover:text-coral transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                          <p className="mt-0.5 font-sans font-bold text-sm text-coral">
                            ৳{i.product?.price}
                          </p>
                          <div className="mt-2 flex items-center gap-3">
                            <div className="flex items-center rounded-full border border-cocoa/20">
                              <button
                                data-testid={`cart-dec-${i.id}`}
                                onClick={() => dec(i.id)}
                                aria-label="Decrease quantity"
                                className="w-8 h-8 flex items-center justify-center text-cocoa/60 hover:text-coral"
                              >
                                <Minus size={12} />
                              </button>
                              <span
                                className="w-6 text-center text-xs font-bold"
                                data-testid={`cart-qty-${i.id}`}
                              >
                                {i.qty}
                              </span>
                              <button
                                data-testid={`cart-inc-${i.id}`}
                                onClick={() => inc(i.id)}
                                aria-label="Increase quantity"
                                className="w-8 h-8 flex items-center justify-center text-cocoa/60 hover:text-coral"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                            <span className="text-xs font-semibold text-cocoa/60 ml-auto">
                              ৳{(i.product?.price ?? 0) * i.qty}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <div
                  className="border-t border-cocoa/10 px-7 py-6 space-y-4"
                  data-testid="cart-checkout"
                >
                  <div>
                    <label
                      htmlFor="zone-select"
                      className="text-[10px] font-bold tracking-[0.28em] uppercase text-cocoa/50"
                    >
                      Delivery zone · Dhaka
                    </label>
                    <select
                      id="zone-select"
                      data-testid="cart-zone-select"
                      value={zone}
                      onChange={(e) => setZone(e.target.value)}
                      className="mt-2 w-full appearance-none rounded-full border border-cocoa/20 bg-vanilla px-5 py-3 text-xs font-semibold tracking-[0.12em] uppercase text-cocoa focus:outline-none"
                    >
                      {ZONES.map((z: (typeof ZONES)[number]) => (
                        <option key={z.name} value={z.name}>
                          {z.name.toUpperCase()} — {z.eta} · FEE ৳{z.fee}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold tracking-[0.28em] uppercase text-cocoa/50">
                      Payment
                    </span>
                    <div
                      className="mt-2 grid grid-cols-3 gap-2"
                      data-testid="payment-options"
                    >
                      {PAYMENT_OPTIONS.map((p: string) => (
                        <button
                          key={p}
                          data-testid={`payment-${p.toLowerCase().replace(/\s+/g, "-")}`}
                          onClick={() => setPayment(p)}
                          className={`rounded-xl border px-2 py-2.5 text-[10px] font-bold tracking-[0.08em] transition-all duration-300 ${
                            payment === p
                              ? "bg-coral text-vanilla border-coral"
                              : "border-cocoa/20 text-cocoa/60 hover:border-cocoa/50"
                          }`}
                        >
                          {p.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div
                    className="space-y-1.5 text-sm text-cocoa/70 pt-1"
                    data-testid="cart-summary"
                  >
                    <p className="flex justify-between">
                      <span>Subtotal</span>
                      <span>৳{subtotal}</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Delivery · {zone}</span>
                      <span>৳{deliveryFee}</span>
                    </p>
                    <p className="flex justify-between font-sans font-bold text-cocoa text-base pt-1.5 border-t border-cocoa/10">
                      <span>TOTAL</span>
                      <span data-testid="cart-total">
                        ৳{subtotal + deliveryFee}
                      </span>
                    </p>
                  </div>

                  <button
                    data-testid="place-order-button"
                    onClick={placeOrder}
                    disabled={placing}
                    className="w-full flex items-center justify-center gap-2.5 bg-coral text-vanilla rounded-full py-4 text-[11px] font-bold tracking-[0.26em] hover:bg-cocoa transition-colors duration-300 disabled:opacity-70"
                  >
                    {placing ? (
                      <>
                        <Loader2 size={15} className="animate-spin" /> FIRING UP
                        THE OVENS…
                      </>
                    ) : (
                      "PLACE EXPRESS ORDER"
                    )}
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
