"use client";

import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";
import { PRODUCTS, ZONES } from "@/app/data/bakery";

export type Product = (typeof PRODUCTS)[number];

export interface CartItem {
  id: string;
  qty: number;
}

export interface DetailedCartItem extends CartItem {
  product?: Product;
}

export interface CartContextType {
  items: DetailedCartItem[];
  count: number;
  subtotal: number;
  deliveryFee: number;
  zone: string;
  setZone: Dispatch<SetStateAction<string>>;
  payment: string;
  setPayment: Dispatch<SetStateAction<string>>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  order: unknown;
  setOrder: Dispatch<SetStateAction<unknown>>;
  add: (id: string, qty?: number) => void;
  inc: (id: string) => void;
  dec: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([]); // [{ id, qty }]
  const [zone, setZone] = useState<string>(ZONES[0].name);
  const [payment, setPayment] = useState<string>("bKash");
  const [open, setOpen] = useState<boolean>(false);
  const [order, setOrder] = useState<unknown>(null);

  const add = (id: string, qty = 1) =>
    setItems((prev) => {
      const existing = prev.find((i) => i.id === id);
      return existing
        ? prev.map((i) =>
            i.id === id ? { ...i, qty: Math.min(99, i.qty + qty) } : i,
          )
        : [...prev, { id, qty }];
    });

  const inc = (id: string) =>
    setItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, qty: Math.min(99, i.qty + 1) } : i,
      ),
    );

  const dec = (id: string) =>
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0),
    );

  const remove = (id: string) =>
    setItems((prev) => prev.filter((i) => i.id !== id));

  const clear = () => setItems([]);

  const detailed = useMemo<DetailedCartItem[]>(
    () =>
      items.map((i) => ({
        ...i,
        product: PRODUCTS.find((p) => p.id === i.id),
      })),
    [items],
  );

  const subtotal = useMemo(
    () => detailed.reduce((s, i) => s + (i.product?.price ?? 0) * i.qty, 0),
    [detailed],
  );
  const count = useMemo(() => items.reduce((s, i) => s + i.qty, 0), [items]);
  const deliveryFee = ZONES.find((z) => z.name === zone)?.fee ?? 0;

  const value: CartContextType = {
    items: detailed,
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
    add,
    inc,
    dec,
    remove,
    clear,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
