export const IMAGES = {
  hero: "/cake_images/Donut_Bomboloni/donut_king_chocolate_overload.jpg",
  split: "/cake_images/Tub_Cake/chocolate_overload_heavy_ganache_tub_cake.jpg",
};

export const TAG_STYLES = {
  BESTSELLER: "bg-coral text-vanilla",
  FRESH: "bg-honey text-cocoa",
  NEW: "bg-coral text-vanilla",
  HOT: "bg-coral text-vanilla",
  OFFER: "bg-coral text-vanilla",
};

export type Product = (typeof PRODUCTS)[number];

export const PRODUCTS = [
  {
    id: "m19",
    name: "Chocolate Overload Heavy Ganache Tub",
    price: 500,
    tag: "BESTSELLER",
    cat: "TUB CAKE",
    img: "/cake_images/Tub_Cake/chocolate_overload_heavy_ganache_tub_cake.jpg",
    alt: "Chocolate Overload Heavy Ganache Tub Cake",
  },
  {
    id: "m4",
    name: "Donut King (Chocolate Overload)",
    price: 250,
    tag: "HOT",
    cat: "DONUTS",
    img: "/cake_images/Donut_Bomboloni/donut_king_chocolate_overload.jpg",
    alt: "Donut King Chocolate Overload",
  },
  {
    id: "m30",
    name: "Brown Bites Box (20–24 Pcs)",
    price: 500,
    originalPrice: 600,
    tag: "OFFER",
    cat: "NOVEMBER OFFER",
    img: "/cake_images/November_Offer/brown_bites_box.jpg",
    alt: "Brown Bites Box 20-24 Pcs",
  },
  {
    id: "m12",
    name: "Biscoff Bento Cheesecake",
    price: 1050,
    tag: "FRESH",
    cat: "CHEESECAKE",
    img: "/cake_images/Cheesecake-Bento_Bake_Cheesecak _Size_350–380-gm/biscoff_cheesecake.jpg",
    alt: "Biscoff Bento Cheesecake",
  },
  {
    id: "m5",
    name: "Premium Filling Donut",
    price: 250,
    tag: "NEW",
    cat: "DONUTS",
    img: "/cake_images/Donut_Bomboloni/premium_filling_donut_pistachio_hazelnut_bueno_biscoff.jpg",
    alt: "Premium Filling Donut",
  },
  {
    id: "m21",
    name: "Dream Cake Tub",
    price: 400,
    tag: "BESTSELLER",
    cat: "TUB CAKE",
    img: "/cake_images/Tub_Cake/dream_cake_tub.jpg",
    alt: "Dream Cake Tub",
  },
  {
    id: "m10",
    name: "Fudge Brownie Heavy Ganache",
    price: 1100,
    tag: "FRESH",
    cat: "BROWNIES",
    img: "/cake_images/Brownie/fudge_brownie_heavy_ganache_filling.jpg",
    alt: "Fudge Brownie Heavy Ganache",
  },
  {
    id: "m6",
    name: "Malai Donut Box (5 Pcs)",
    price: 600,
    tag: "NEW",
    cat: "DONUTS",
    img: "/cake_images/Donut_Bomboloni/malai_donut_box.jpg",
    alt: "Malai Donut Box 5 Pcs",
  },
];

export interface MenuVariant {
  label: string;
  price: number;
  originalPrice?: number;
}

export interface MenuItemType {
  id: string;
  name: string;
  price: number;
  cat: string;
  desc: string;
  image?: string;
  badge?: string;
  originalPrice?: number;
  minOrderNote?: string;
  minOrder?: number;
  flavors?: string[];
  variants?: MenuVariant[];
}

export const MENU: MenuItemType[] = [
  // ── DONUTS ──────────────────────────────────────────────
  {
    id: "m1",
    name: "Cream Filling Donut (Vanilla)",
    price: 120,
    cat: "DONUTS",
    desc: "Soft, pillowy bomboloni filled with classic Madagascar vanilla bean cream.",
    image: "/cake_images/Donut_Bomboloni/cream_filling_donut_vanilla.jpg",
    minOrderNote: "Min. order 2 pcs",
    minOrder: 2,
  },
  {
    id: "m2",
    name: "Red Velvet & Chocolate Filling Donut",
    price: 200,
    cat: "DONUTS",
    desc: "Choice of rich red velvet cream cheese or silky Belgian chocolate filling.",
    image:
      "/cake_images/Donut_Bomboloni/red_velvet_&_chocolate_filling_donut.jpg",
    minOrder: 4,
    flavors: ["Red Velvet Cream Cheese", "Belgian Chocolate"],
  },
  {
    id: "m3",
    name: "Blueberry & Strawberry Cream Cheese Donut",
    price: 200,
    cat: "DONUTS",
    desc: "Tangy whipped cream cheese infused with real blueberry or strawberry compote.",
    image:
      "/cake_images/Donut_Bomboloni/blueberry_&_strawberry_cream_cheese_donut.jfif",
    minOrder: 4,
    flavors: ["Blueberry Compote", "Strawberry Compote"],
  },
  {
    id: "m4",
    name: "Donut King (Chocolate Overload)",
    price: 250,
    cat: "DONUTS",
    desc: "Our signature loaded chocolate donut drenched in dark ganache and chocolate chunks.",
    image: "/cake_images/Donut_Bomboloni/donut_king_chocolate_overload.jpg",
    badge: "CHOCOLATE OVERLOAD",
    minOrder: 4,
  },
  {
    id: "m5",
    name: "Premium Filling Donut (Pistachio / Hazelnut / Bueno / Biscoff)",
    price: 250,
    cat: "DONUTS",
    desc: "Artisanal bomboloni generously piped with your choice of Roasted Pistachio, Hazelnut, Kinder Bueno, or Lotus Biscoff spread.",
    image:
      "/cake_images/Donut_Bomboloni/premium_filling_donut_pistachio_hazelnut_bueno_biscoff.jpg",
    minOrder: 4,
    flavors: ["Roasted Pistachio", "Hazelnut", "Kinder Bueno", "Lotus Biscoff"],
  },
  {
    id: "m6",
    name: "Malai Donut Box (5 Pcs)",
    price: 600,
    cat: "DONUTS",
    desc: "Five freshly fried donuts soaked in aromatic saffron-cardamom malai cream.",
    image: "/cake_images/Donut_Bomboloni/malai_donut_box.jpg",
  },

  // ── BROWNIES ────────────────────────────────────────────
  {
    id: "m7",
    name: "Brown Bites Box (20–24 Pcs)",
    price: 600,
    cat: "BROWNIES",
    desc: "Bite-sized fudgy Belgian chocolate brownie cubes—our everyday crowd favorite.",
    image: "/cake_images/Brownie/brown_bites.jpg",
    badge: "REGULAR BESTSELLER",
  },
  {
    id: "m8",
    name: "Fudge Brownie (Big Size — 9 Pcs)",
    price: 650,
    cat: "BROWNIES",
    desc: "Nine thick, crackly-top, ultra-fudgy dark chocolate brownie squares.",
  },
  {
    id: "m9",
    name: "Fudge Brownie (Big Size — 12 Pcs)",
    price: 850,
    cat: "BROWNIES",
    desc: "Twelve generous squares of rich, dense Belgian chocolate fudge brownie.",
  },
  {
    id: "m10",
    name: "Fudge Brownie Heavy Ganache Filling",
    price: 1100,
    cat: "BROWNIES",
    desc: "Decadent brownie slab layered and topped with thick, velvety dark chocolate ganache.",
    image: "/cake_images/Brownie/fudge_brownie_heavy_ganache_filling.jpg",
    variants: [
      { label: "6 Inch", price: 1100 },
      { label: "8 Inch", price: 1500 },
      { label: "10 Inch", price: 1800 },
    ],
  },
  {
    id: "m11",
    name: "Bento Brownie",
    price: 500,
    cat: "BROWNIES",
    desc: "Personal-sized fudgy brownie cake box, perfect for gifting or solo cravings.",
  },

  // ── CHEESECAKE ──────────────────────────────────────────
  {
    id: "m12",
    name: "Biscoff Cheesecake",
    price: 1050,
    cat: "CHEESECAKE",
    desc: "Creamy baked bento cheesecake (350–380g) topped with melted Lotus Biscoff spread & biscuit crumble.",
    image:
      "/cake_images/Cheesecake-Bento_Bake_Cheesecak _Size_350–380-gm/biscoff_cheesecake.jpg",
  },
  {
    id: "m13",
    name: "Pistachio Cheesecake",
    price: 1050,
    cat: "CHEESECAKE",
    desc: "Velvety baked cheesecake (350–380g) finished with roasted pistachio paste and crushed nuts.",
    image:
      "/cake_images/Cheesecake-Bento_Bake_Cheesecak _Size_350–380-gm/pistachio_cheesecake.jpg",
  },
  {
    id: "m14",
    name: "Bueno Cheesecake",
    price: 1000,
    cat: "CHEESECAKE",
    desc: "Rich hazelnut-chocolate Kinder Bueno baked cheesecake (350–380g).",
  },
  {
    id: "m15",
    name: "Hazelnut Cheesecake",
    price: 1050,
    cat: "CHEESECAKE",
    desc: "Smooth roasted hazelnut praline baked cheesecake (350–380g).",
  },
  {
    id: "m16",
    name: "Blueberry Cheesecake",
    price: 950,
    cat: "CHEESECAKE",
    desc: "Classic baked cream cheesecake (350–380g) crowned with sweet-tart blueberry glaze.",
  },
  {
    id: "m17",
    name: "Strawberry Cheesecake",
    price: 950,
    cat: "CHEESECAKE",
    desc: "Baked vanilla cheesecake (350–380g) layered with fresh strawberry compote.",
  },
  {
    id: "m18",
    name: "Assorted Cheesecake",
    price: 1200,
    cat: "CHEESECAKE",
    desc: "Sampler bento baked cheesecake (350–380g) featuring multiple signature gourmet toppings.",
  },

  // ── TUB CAKE ────────────────────────────────────────────
  {
    id: "m19",
    name: "Chocolate Overload Heavy Ganache Tub Cake",
    price: 500,
    cat: "TUB CAKE",
    desc: "Our #1 bestseller—moist chocolate sponge drenched in heavy Belgian chocolate ganache.",
    image:
      "/cake_images/Tub_Cake/chocolate_overload_heavy_ganache_tub_cake.jpg",
    badge: "MOST SELLING",
    variants: [
      { label: "500 ml", price: 500 },
      { label: "1000 ml", price: 800 },
    ],
  },
  {
    id: "m20",
    name: "Chocolate Overload Tub Cake",
    price: 450,
    cat: "TUB CAKE",
    desc: "Layers of rich chocolate cake, silky chocolate mousse, and dark chocolate curls.",
    image: "/cake_images/Tub_Cake/chocolate_overload_tub_cake.jpg",
    variants: [
      { label: "500 ml", price: 450 },
      { label: "1000 ml", price: 700 },
    ],
  },
  {
    id: "m21",
    name: "Dream Cake Tub",
    price: 400,
    cat: "TUB CAKE",
    desc: "Multi-layered viral chocolate dream cake with a crisp cocoa-dusted chocolate shell.",
    image: "/cake_images/Tub_Cake/dream_cake_tub.jpg",
    variants: [
      { label: "500 ml", price: 400 },
      { label: "1000 ml", price: 700 },
    ],
  },
  {
    id: "m22",
    name: "Pandan Flavor Tub Cake",
    price: 350,
    cat: "TUB CAKE",
    desc: "Fragrant pandan-infused sponge layered with light, cloud-like whipped cream.",
    image: "/cake_images/Tub_Cake/pandan_flavor_tub_cake.jpg",
    variants: [
      { label: "500 ml", price: 350 },
      { label: "1000 ml", price: 600 },
    ],
  },
  {
    id: "m23",
    name: "Vanilla Flavor Tub Cake",
    price: 350,
    cat: "TUB CAKE",
    desc: "Classic soft Madagascar vanilla sponge with smooth vanilla bean cream frosting.",
    variants: [
      { label: "500 ml", price: 350 },
      { label: "1000 ml", price: 650 },
    ],
  },
  {
    id: "m24",
    name: "Lemon Flavor Tub Cake (1000 ml)",
    price: 750,
    cat: "TUB CAKE",
    desc: "Zesty, refreshing lemon curd and light citrus cream layered over moist vanilla sponge.",
    image: "/cake_images/Tub_Cake/lemon_flavor_tub_cake.jpg",
  },
  {
    id: "m25",
    name: "Orange Flavor Tub Cake (1000 ml)",
    price: 800,
    cat: "TUB CAKE",
    desc: "Bright, tangy mandarin-orange infused cream cake in a generous 1000 ml tub.",
    image: "/cake_images/Tub_Cake/orange_flavor_tub_cake.jfif",
  },
  {
    id: "m26",
    name: "Red Velvet Cream Cheese Tub Cake (1000 ml Box)",
    price: 900,
    cat: "TUB CAKE",
    desc: "Velvety crimson sponge layered with authentic tangy cream cheese frosting (1000 ml box).",
    image: "/cake_images/Tub_Cake/red_velvet_cream_cheese_tub_cake.jpg",
  },
  {
    id: "m27",
    name: "Butterscotch Cake Tub (1000 ml)",
    price: 800,
    cat: "TUB CAKE",
    desc: "Caramelized butterscotch crunch and golden toffee cream layered in a 1000 ml tub.",
    image: "/cake_images/Tub_Cake/butterscotch_cake_tub.jpg",
  },

  // ── NOVEMBER OFFER ──────────────────────────────────────
  {
    id: "m28",
    name: "Chocolate Overload Heavy Ganache Tub Cake",
    price: 400,
    originalPrice: 500,
    cat: "NOVEMBER OFFER",
    desc: "Limited-time November special on our #1 bestselling Heavy Ganache Tub Cake.",
    image:
      "/cake_images/November_Offer/chocolate_overload_heavy_ganache_tub_cake.jpg",
    badge: "NOVEMBER OFFER",
    variants: [
      { label: "500 ml", price: 400, originalPrice: 500 },
      { label: "1000 ml", price: 700, originalPrice: 800 },
    ],
  },
  {
    id: "m29",
    name: "Chocolate Overload Tub Cake",
    price: 400,
    originalPrice: 450,
    cat: "NOVEMBER OFFER",
    desc: "Special November offer pricing on our signature Chocolate Overload Tub Cake.",
    image: "/cake_images/November_Offer/chocolate_overload_tub_cake.jpg",
    badge: "NOVEMBER OFFER",
    variants: [
      { label: "500 ml", price: 400, originalPrice: 450 },
      { label: "1000 ml", price: 650, originalPrice: 700 },
    ],
  },
  {
    id: "m30",
    name: "Brown Bites Box 20–24 Pcs",
    price: 500,
    originalPrice: 600,
    cat: "NOVEMBER OFFER",
    desc: "Save ৳100 this November on our regular bestselling 20–24 piece Brown Bites box.",
    image: "/cake_images/November_Offer/brown_bites_box.jpg",
    badge: "NOVEMBER OFFER",
  },
];

export const MENU_CATS = [
  "ALL",
  "DONUTS",
  "BROWNIES",
  "CHEESECAKE",
  "TUB CAKE",
  "NOVEMBER OFFER",
];

export const CATEGORIES = [
  {
    name: "DONUT & BOMBOLONI",
    filter: "DONUTS",
    desc: "Pillow-soft filled rings & malai boxes, glazed fresh daily",
    shape: "arch",
    img: "/cake_images/Donut_Bomboloni/premium_filling_donut_pistachio_hazelnut_bueno_biscoff.jpg",
  },
  {
    name: "FUDGY BROWNIES",
    filter: "BROWNIES",
    desc: "Crackly-top Belgian chocolate bites, slabs & heavy ganache",
    shape: "bowl",
    img: "/cake_images/Brownie/fudge_brownie_heavy_ganache_filling.jpg",
  },
  {
    name: "BENTO CHEESECAKES",
    filter: "CHEESECAKE",
    desc: "Creamy 350–380g baked cheesecakes in Biscoff, Pistachio & more",
    shape: "arch",
    img: "/cake_images/Cheesecake-Bento_Bake_Cheesecak _Size_350–380-gm/pistachio_cheesecake.jpg",
  },
  {
    name: "SIGNATURE TUB CAKES",
    filter: "TUB CAKE",
    desc: "Viral Dream Cake & Chocolate Overload tubs in 500ml & 1000ml",
    shape: "bowl",
    img: "/cake_images/Tub_Cake/chocolate_overload_heavy_ganache_tub_cake.jpg",
  },
];

export const ZONES = [
  { name: "Gulshan", eta: "35–45 MIN", fee: 60, x: 66, y: 46 },
  { name: "Banani", eta: "40–50 MIN", fee: 60, x: 59, y: 60 },
  { name: "Dhanmondi", eta: "50–60 MIN", fee: 80, x: 27, y: 60 },
  { name: "Mirpur", eta: "50–60 MIN", fee: 80, x: 33, y: 34 },
  { name: "Uttara", eta: "55–65 MIN", fee: 100, x: 46, y: 15 },
];

export const PAYMENT_OPTIONS = ["bKash", "Nagad", "Cash on Delivery"];

export const FOOTER_BAKES = [
  {
    name: "Donut King (Chocolate Overload)",
    tag: "60-Min Express · ৳250",
    img: "/cake_images/Donut_Bomboloni/donut_king_chocolate_overload.jpg",
    alt: "Donut King Chocolate Overload",
  },
  {
    name: "Heavy Ganache Tub Cake",
    tag: "Most Selling · ৳500+",
    img: "/cake_images/Tub_Cake/chocolate_overload_heavy_ganache_tub_cake.jpg",
    alt: "Chocolate Overload Heavy Ganache Tub Cake",
  },
  {
    name: "Brown Bites Box (20–24 Pcs)",
    tag: "November Offer · ৳500",
    img: "/cake_images/November_Offer/brown_bites_box.jpg",
    alt: "Brown Bites Box 20–24 Pcs",
  },
];

export const INSTAGRAM = [
  {
    img: "/cake_images/Donut_Bomboloni/premium_filling_donut_pistachio_hazelnut_bueno_biscoff.jpg",
    alt: "Premium filling donuts with pistachio, hazelnut, Bueno, and Biscoff",
  },
  {
    img: "/cake_images/Cheesecake-Bento_Bake_Cheesecak _Size_350–380-gm/biscoff_cheesecake.jpg",
    alt: "Biscoff Bento Cheesecake",
  },
  {
    img: "/cake_images/Tub_Cake/dream_cake_tub.jpg",
    alt: "Dream Cake Tub",
  },
  {
    img: "/cake_images/Brownie/fudge_brownie_heavy_ganache_filling.jpg",
    alt: "Fudge Brownie with Heavy Ganache Filling",
  },
  {
    img: "/cake_images/Donut_Bomboloni/malai_donut_box.jpg",
    alt: "Malai Donut Box",
  },
  {
    img: "/cake_images/Tub_Cake/red_velvet_cream_cheese_tub_cake.jpg",
    alt: "Red Velvet Cream Cheese Tub Cake",
  },
];

export interface CategoryBatchProfile {
  eyebrow: string;
  meters: { label: string; value: number }[];
  bakerNote: string;
  ingredients: string[];
  allergens: string[];
  storageTip: string;
}

export const CATEGORY_PROFILES: Record<string, CategoryBatchProfile> = {
  DONUTS: {
    eyebrow: "artisan bomboloni",
    meters: [
      { label: "Richness", value: 84 },
      { label: "Sweetness", value: 76 },
      { label: "Cloudy Creaminess", value: 94 },
    ],
    bakerNote:
      "Slow-fermented overnight brioche dough, hand-rolled at 5:30 AM, fried to a golden ring, and generously piped while still warm so every bite bursts with silky filling.",
    ingredients: [
      "Unbleached bread flour",
      "Cultured European butter",
      "Madagascar vanilla bean",
      "Belgian couverture chocolate & nut pralines",
      "Farm-fresh whole milk & free-range eggs",
    ],
    allergens: ["Contains Dairy", "Gluten", "Egg", "May contain Tree Nuts"],
    storageTip:
      "Best enjoyed fresh within 6–8 hours of delivery. Store leftovers in an airtight box at room temperature for up to 24 hours, or warm gently for 8 seconds before serving.",
  },
  BROWNIES: {
    eyebrow: "belgian fudge bake",
    meters: [
      { label: "Richness", value: 96 },
      { label: "Sweetness", value: 78 },
      { label: "Fudginess", value: 98 },
    ],
    bakerNote:
      "Baked in small slabs with 54% Callebaut dark couverture chocolate for that signature tissue-thin crackly top and dense, molten-fudge center.",
    ingredients: [
      "54% Callebaut dark chocolate",
      "Pure cultured butter",
      "Dutch-processed cocoa powder",
      "Soft brown cane sugar",
      "Free-range eggs & sea salt",
    ],
    allergens: ["Contains Dairy", "Gluten", "Egg"],
    storageTip:
      "Keep in an airtight container for up to 4 days (or refrigerate up to 7 days). For molten-center bliss, microwave a square for 10–12 seconds right before eating.",
  },
  CHEESECAKE: {
    eyebrow: "bento baked cheesecake",
    meters: [
      { label: "Richness", value: 90 },
      { label: "Sweetness", value: 72 },
      { label: "Velvety Creaminess", value: 95 },
    ],
    bakerNote:
      "Each 350–380g bento cheesecake is slow-baked in a water bath for a custardy, melt-in-the-mouth crumb over a toasted biscuit base, finished with gourmet spreads.",
    ingredients: [
      "Full-fat artisanal cream cheese",
      "Heavy whipping cream",
      "Toasted butter biscuit base",
      "Madagascar vanilla & fruit compotes",
      "Gourmet Biscoff / Pistachio / Hazelnut spreads",
    ],
    allergens: [
      "Contains Dairy",
      "Gluten",
      "Egg",
      "Tree Nuts (flavor-dependent)",
    ],
    storageTip:
      "Keep chilled at 2–4°C and enjoy within 48 hours. Let your bento box rest at room temperature for 10 minutes before digging in for peak silkiness.",
  },
  "TUB CAKE": {
    eyebrow: "small-batch tub cake",
    meters: [
      { label: "Richness", value: 92 },
      { label: "Sweetness", value: 80 },
      { label: "Creamy Indulgence", value: 96 },
    ],
    bakerNote:
      "Layered by hand in crystal-clear 500 ml and 1000 ml tubs—featherlight sponge soaked in flavored milk and crowned with whipped mousse or heavy Belgian ganache.",
    ingredients: [
      "Ultra-moist sponge cake",
      "Belgian dark chocolate ganache",
      "Whipped dairy cream & mousse",
      "Natural fruit reductions & pandan extract",
      "Pure Madagascar vanilla bean",
    ],
    allergens: ["Contains Dairy", "Gluten", "Egg"],
    storageTip:
      "Best enjoyed chilled straight from the fridge within 48 hours, or warm a Heavy Ganache tub for 12 seconds for a rich molten lava spoonful.",
  },
  "NOVEMBER OFFER": {
    eyebrow: "limited november special",
    meters: [
      { label: "Richness", value: 95 },
      { label: "Sweetness", value: 79 },
      { label: "Fudginess / Creaminess", value: 97 },
    ],
    bakerNote:
      "Our most-loved signatures at special November celebration pricing—the exact same 54% Belgian chocolate recipes, freshly baked every morning.",
    ingredients: [
      "54% Callebaut Belgian chocolate",
      "Pure cultured butter",
      "Whipped heavy cream",
      "Dutch-processed cocoa",
      "Free-range eggs & unbleached flour",
    ],
    allergens: ["Contains Dairy", "Gluten", "Egg"],
    storageTip:
      "Best enjoyed chilled within 48 hours (tub cakes) or warmed for 12 seconds for molten ganache. Brown Bites stay fudgy for 4 days in an airtight box.",
  },
};

export interface CustomerReview {
  id: string;
  name: string;
  area: string;
  rating: number;
  ordered: string;
  verified: boolean;
  hasFlavorNote: boolean;
  comment: string;
  date: string;
}

export const INITIAL_REVIEWS: CustomerReview[] = [
  {
    id: "r1",
    name: "Sadia Rahman",
    area: "Dhanmondi",
    rating: 5,
    ordered: "1000 ml Tub",
    verified: true,
    hasFlavorNote: true,
    comment:
      "Arrived in 42 minutes still cool and intact! The Belgian chocolate ganache layer isn't overly sweet—deep cocoa flavor with super moist sponge underneath.",
    date: "2 days ago",
  },
  {
    id: "r2",
    name: "Tanvir Ahmed",
    area: "Banani",
    rating: 5,
    ordered: "Box of 4 Bomboloni",
    verified: true,
    hasFlavorNote: true,
    comment:
      "Ordered the Pistachio and Kinder Bueno fillings. The dough is genuinely pillowy even an hour later and the filling goes all the way to the center.",
    date: "4 days ago",
  },
  {
    id: "r3",
    name: "Nusrat Jahan",
    area: "Uttara",
    rating: 5,
    ordered: "November Offer Box",
    verified: true,
    hasFlavorNote: false,
    comment:
      "Packaging felt like a proper patisserie gift box. My family finished the entire Brown Bites box in ten minutes—crackly top and super fudgy inside.",
    date: "1 week ago",
  },
  {
    id: "r4",
    name: "Farhan Chowdhury",
    area: "Gulshan",
    rating: 5,
    ordered: "Bento Cheesecake",
    verified: true,
    hasFlavorNote: true,
    comment:
      "Smooth, creamy baked cheesecake with zero eggy aftertaste. The Biscoff drizzle and biscuit crumble balance the tanginess really well.",
    date: "1 week ago",
  },
  {
    id: "r5",
    name: "Meher Afroze",
    area: "Mirpur",
    rating: 4,
    ordered: "500 ml Tub",
    verified: true,
    hasFlavorNote: false,
    comment:
      "Rider called right on the 50-minute mark. Love that they actually deliver warm/fresh to Mirpur without squishing the box.",
    date: "2 weeks ago",
  },
];
