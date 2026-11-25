export const IMAGES = {
  hero: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=1200&auto=format&fit=crop",
  split:
    "https://images.unsplash.com/photo-1703876087817-010eef3e0d59?q=80&w=1200&auto=format&fit=crop",
};

export const TAG_STYLES = {
  BESTSELLER: "bg-coral text-vanilla",
  FRESH: "bg-honey text-cocoa",
  NEW: "bg-coral text-vanilla",
};

export const PRODUCTS = [
  {
    id: "salted-caramel-donut",
    name: "Salted Caramel Donut",
    price: 280,
    tag: "BESTSELLER",
    cat: "DONUTS",
    img: "https://images.pexels.com/photos/37220991/pexels-photo-37220991.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Stack of golden glazed donuts on a plate",
  },
  {
    id: "belgian-fudge-brownie",
    name: "Belgian Fudge Brownie",
    price: 350,
    tag: "BESTSELLER",
    cat: "BROWNIES",
    img: "https://images.pexels.com/photos/17488699/pexels-photo-17488699.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Stack of homemade chocolate fudge brownies",
  },
  {
    id: "strawberry-glaze-ring",
    name: "Strawberry Glaze Ring",
    price: 260,
    tag: "FRESH",
    cat: "DONUTS",
    img: "https://images.unsplash.com/photo-1626094309830-abbb0c99da4a?q=80&w=800&auto=format&fit=crop",
    alt: "Pink strawberry glazed donut",
  },
  {
    id: "pistachio-croissant",
    name: "Pistachio Croissant",
    price: 320,
    tag: "FRESH",
    cat: "PASTRIES",
    img: "https://images.unsplash.com/photo-1599940778173-e276d4acb2bb?q=80&w=800&auto=format&fit=crop",
    alt: "Flaky croissant on a ceramic plate",
  },
  {
    id: "sprinkle-party-ring",
    name: "Sprinkle Party Ring",
    price: 240,
    tag: "FRESH",
    cat: "DONUTS",
    img: "https://images.unsplash.com/photo-1464347477106-7648bc26261b?q=80&w=800&auto=format&fit=crop",
    alt: "Donuts topped with colorful sprinkles",
  },
  {
    id: "double-chocolate-donut",
    name: "Double Chocolate Donut",
    price: 270,
    tag: "BESTSELLER",
    cat: "DONUTS",
    img: "https://images.unsplash.com/photo-1551106652-a5bcf4b29ab6?q=80&w=800&auto=format&fit=crop",
    alt: "Chocolate coated donuts with drizzle",
  },
  {
    id: "honeycomb-choc-chip-cookie",
    name: "Honeycomb Choc-Chip Cookie",
    price: 220,
    tag: "FRESH",
    cat: "PASTRIES",
    img: "https://images.unsplash.com/photo-1634188023615-7e08901193b6?q=80&w=800&auto=format&fit=crop",
    alt: "Chocolate chip cookies close up",
  },
  {
    id: "express-gift-box",
    name: "Express Gift Box",
    price: 950,
    tag: "NEW",
    cat: "BOXES",
    img: "https://images.unsplash.com/photo-1622467827417-bbe2237067a9?q=80&w=800&auto=format&fit=crop",
    alt: "Kraft gift box filled with assorted bakes",
  },
];

export const MENU = [
  {
    id: "m1",
    name: "Salted Caramel Donut",
    price: 280,
    cat: "DONUTS",
    desc: "Brioche ring, burnt-caramel glaze, flaky sea salt",
  },
  {
    id: "m2",
    name: "Strawberry Glaze Ring",
    price: 260,
    cat: "DONUTS",
    desc: "Vanilla brioche under a strawberry glaze",
  },
  {
    id: "m3",
    name: "Double Chocolate Donut",
    price: 270,
    cat: "DONUTS",
    desc: "Cocoa-rich shell over pillowy chocolate dough",
  },
  {
    id: "m4",
    name: "Vanilla Bean Glazed",
    price: 240,
    cat: "DONUTS",
    desc: "Madagascar vanilla glaze on a cloud-soft ring",
  },
  {
    id: "m5",
    name: "Belgian Fudge Brownie",
    price: 350,
    cat: "BROWNIES",
    desc: "54% Callebaut fudge, crisp top, molten heart",
  },
  {
    id: "m6",
    name: "Walnut Crunch Brownie",
    price: 330,
    cat: "BROWNIES",
    desc: "Toasted walnut rubble in dark Belgian fudge",
  },
  {
    id: "m7",
    name: "Salted Caramel Brownie",
    price: 340,
    cat: "BROWNIES",
    desc: "Golden caramel core, a whisper of sea salt",
  },
  {
    id: "m8",
    name: "Pistachio Croissant",
    price: 320,
    cat: "PASTRIES",
    desc: "27 laminated layers, Sicilian pistachio cream",
  },
  {
    id: "m9",
    name: "Butter Croissant",
    price: 240,
    cat: "PASTRIES",
    desc: "Cultured butter, honey-baked golden shell",
  },
  {
    id: "m10",
    name: "Almond Danish",
    price: 290,
    cat: "PASTRIES",
    desc: "Frangipane heart under a snow of icing",
  },
  {
    id: "m11",
    name: "Express Gift Box",
    price: 950,
    cat: "BOXES",
    desc: "Six signature bakes, ribboned for gifting",
  },
  {
    id: "m12",
    name: "Celebration Dozen Box",
    price: 1450,
    cat: "BOXES",
    desc: "Twelve mixed donuts for the table that shares",
  },
];

export const MENU_CATS = ["ALL", "DONUTS", "BROWNIES", "PASTRIES", "BOXES"];

export const CATEGORIES = [
  {
    name: "BRIOCHE DONUTS",
    filter: "DONUTS",
    desc: "Cloud-soft rings, glazed every morning",
    shape: "arch",
    img: "https://images.unsplash.com/photo-1464347477106-7648bc26261b?q=80&w=700&auto=format&fit=crop",
  },
  {
    name: "FUDGY BROWNIES",
    filter: "BROWNIES",
    desc: "Belgian fudge with molten hearts",
    shape: "bowl",
    img: "https://images.unsplash.com/photo-1589218436045-ee320057f443?q=80&w=700&auto=format&fit=crop",
  },
  {
    name: "FLAKY PASTRIES",
    filter: "PASTRIES",
    desc: "27-layer laminates, cultured butter",
    shape: "arch",
    img: "https://images.unsplash.com/photo-1623334044303-241021148842?q=80&w=700&auto=format&fit=crop",
  },
  {
    name: "GIFT BOXES",
    filter: "BOXES",
    desc: "Ribboned boxes for sweet occasions",
    shape: "bowl",
    img: "https://images.pexels.com/photos/28965344/pexels-photo-28965344.jpeg?auto=compress&cs=tinysrgb&w=700",
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
    img: "https://images.unsplash.com/photo-1759459981049-1a658da71c33?q=80&w=500&auto=format&fit=crop",
    alt: "Baker arranging pastries at the counter",
  },
  {
    img: "https://images.pexels.com/photos/19474624/pexels-photo-19474624.jpeg?auto=compress&cs=tinysrgb&w=500",
    alt: "Croissants displayed in the bakery",
  },
  {
    img: "https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?q=80&w=500&auto=format&fit=crop",
    alt: "Freshly baked treats on a tray",
  },
];

export const INSTAGRAM = [
  {
    img: "https://images.pexels.com/photos/23203365/pexels-photo-23203365.jpeg?auto=compress&cs=tinysrgb&w=400",
    alt: "Pink glazed donut with sprinkles",
  },
  {
    img: "https://images.unsplash.com/photo-1570727624862-3008fe67a6be?q=80&w=400&auto=format&fit=crop",
    alt: "Doughnuts covered in sprinkles",
  },
  {
    img: "https://images.pexels.com/photos/27569386/pexels-photo-27569386.jpeg?auto=compress&cs=tinysrgb&w=400",
    alt: "Glazed mochi donuts with strawberry pieces",
  },
  {
    img: "https://images.unsplash.com/photo-1598839950984-034f6dc7b495?q=80&w=400&auto=format&fit=crop",
    alt: "Cookies on a white surface",
  },
  {
    img: "https://images.unsplash.com/photo-1706616999454-91cbfd264e32?q=80&w=400&auto=format&fit=crop",
    alt: "Three pink donuts on a pink background",
  },
  {
    img: "https://images.pexels.com/photos/37230219/pexels-photo-37230219.jpeg?auto=compress&cs=tinysrgb&w=400",
    alt: "Stack of frosted donuts on a plate",
  },
];
