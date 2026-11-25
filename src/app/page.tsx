"use client";

import { useState } from "react";
import Categories from "./components/home/Categories";
import Hero from "./components/home/hero";
import QuoteBanner from "./components/home/QuoteBanner";
import Marquee from "./components/Marquee";
import Products from "./components/Products";
import SplitFeature from "./components/home/SplitFeature";
import MenuSheet from "./components/home/MenuSheet";
import ExpressZones from "./components/home/ExpressZones";
import CartDrawer from "./components/home/CartDrawer";
import Footer from "./components/home/Footer";

export default function Home() {
  const [menuFilter, setMenuFilter] = useState("ALL");
  return (
    <>
      <Hero />
      <Marquee />
      <Products />
      <QuoteBanner />
      <Categories onFilter={setMenuFilter} />
      <SplitFeature />
      <MenuSheet filter={menuFilter} onFilter={setMenuFilter} />
      <ExpressZones />
      <Footer />
      <CartDrawer />
    </>
  );
}
