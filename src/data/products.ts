export type Colorway = {
  id: string;
  name: string;
  hex: string;
};

export type GarmentKind =
  | "tee"
  | "pocket"
  | "crop"
  | "raglan"
  | "rugby"
  | "panel"
  | "cap";

export type PrintMark =
  | "four"
  | "contour"
  | "bar"
  | "cross"
  | "ring"
  | "stack"
  | "none";

export type Size = { size: string; stock: number };

export type Product = {
  id: string;
  name: string;
  kind: GarmentKind;
  price: number;
  tagline: string;
  description: string;
  fit: "Boxy" | "Regular" | "Cropped" | "Adjustable";
  gsm: number;
  colourways: string[];
  /** The four colourways this piece was spun from. */
  batch: string[];
  print: PrintMark;
  sizes: Size[];
  facts: { label: string; value: string }[];
  care: string;
  origin: string;
  note?: string;
};

export const COLORWAYS: Record<string, Colorway> = {
  bone: { id: "bone", name: "Bone", hex: "#e2dac5" },
  chalk: { id: "chalk", name: "Chalk", hex: "#f0ede4" },
  clay: { id: "clay", name: "Clay", hex: "#b4613f" },
  ink: { id: "ink", name: "Ink", hex: "#1c2422" },
  sea: { id: "sea", name: "Sea", hex: "#4a6e78" },
  moss: { id: "moss", name: "Moss", hex: "#5a6a4b" },
  ochre: { id: "ochre", name: "Ochre", hex: "#c08a2e" },
  sky: { id: "sky", name: "Sky", hex: "#93aeb6" },
  stone: { id: "stone", name: "Stone", hex: "#bdb6a4" },
  cobalt: { id: "cobalt", name: "Cobalt", hex: "#2b4a7a" },
  forest: { id: "forest", name: "Forest", hex: "#2e4636" },
};

const full = (n: number): Size[] =>
  ["XS", "S", "M", "L", "XL", "XXL"].map((size, i) => ({
    size,
    stock: Math.max(0, n - (i === 0 ? 0 : i === 1 ? 1 : i === 5 ? 4 : 2)),
  }));

const short = (n: number): Size[] =>
  ["XS", "S", "M", "L", "XL"].map((size, i) => ({
    size,
    stock: Math.max(0, n - (i === 0 ? 1 : i === 1 ? 2 : i === 4 ? 3 : 1)),
  }));

export const PRODUCTS: Product[] = [
  {
    id: "cirrus",
    name: "Cirrus",
    kind: "tee",
    price: 44,
    tagline: "The everyday one. Boxy, 240 gsm, four shirts per body.",
    description:
      "The shirt we make more of than anything else. A boxy body, a wide rib collar and a hem that sits where it should. Spun from four reclaimed t-shirts, so the fabric carries a faint marl that a new shirt never has.",
    fit: "Boxy",
    gsm: 240,
    colourways: ["bone", "clay", "ink", "sea"],
    batch: ["bone", "bone", "bone", "chalk"],
    print: "four",
    sizes: full(9),
    facts: [
      { label: "Weight", value: "240 gsm" },
      { label: "Body", value: "Boxy, straight hem" },
      { label: "Collar", value: "1x1 rib, twin-needle finish" },
      { label: "Fibre", value: "100% reclaimed cotton" },
      { label: "Shirts per body", value: "4" },
      { label: "Made", value: "Barcelos, Portugal" },
    ],
    care: "Wash cold at 30, dry flat or on a low heat. It relaxes about 2% in the first wash and holds there.",
    origin: "Spun and knitted in Barcelos, cut and sewn at Keileweg in Rotterdam.",
  },
  {
    id: "terra",
    name: "Terra",
    kind: "raglan",
    price: 58,
    tagline: "Long sleeve, raglan, 300 gsm. Built for a wet Dutch winter.",
    description:
      "A heavy long sleeve with a raglan shoulder and a 300 gsm body, knitted in a fine rib at the cuff. The yarn is a blend of two batches, so you can read the two original colours in the fleece.",
    fit: "Regular",
    gsm: 300,
    colourways: ["bone", "moss", "ink"],
    batch: ["moss", "bone", "moss", "ink"],
    print: "contour",
    sizes: full(7),
    facts: [
      { label: "Weight", value: "300 gsm" },
      { label: "Body", value: "Regular, raglan shoulder" },
      { label: "Cuff", value: "2x2 rib" },
      { label: "Fibre", value: "100% reclaimed cotton" },
      { label: "Shirts per body", value: "4" },
      { label: "Made", value: "Barcelos, Portugal" },
    ],
    care: "Wash cold at 30, dry flat. Do not tumble dry a full weight.",
    origin: "Spun and knitted in Barcelos, cut and sewn at Keileweg in Rotterdam.",
  },
  {
    id: "deck",
    name: "Deck",
    kind: "rugby",
    price: 52,
    tagline: "Rugby stripes, contrast collar, long sleeve.",
    description:
      "The striped one. Narrow horizontal bands knitted straight into the jersey rather than printed on afterwards, a contrast rib collar, and a straight long sleeve. Warm enough to wear under a coat and quiet enough to wear on its own.",
    fit: "Regular",
    gsm: 260,
    colourways: ["cobalt", "clay", "forest"],
    batch: ["cobalt", "chalk", "cobalt", "chalk"],
    print: "bar",
    sizes: full(6),
    facts: [
      { label: "Weight", value: "260 gsm" },
      { label: "Body", value: "Regular, knitted stripe" },
      { label: "Collar", value: "Contrast 1x1 rib" },
      { label: "Fibre", value: "100% reclaimed cotton" },
      { label: "Shirts per body", value: "4" },
      { label: "Made", value: "Barcelos, Portugal" },
    ],
    care: "Wash cold at 30 inside out. Line dry.",
    origin: "Spun and knitted in Barcelos, cut and sewn at Keileweg in Rotterdam.",
  },
  {
    id: "field",
    name: "Field",
    kind: "pocket",
    price: 48,
    tagline: "A patch pocket, a straight hem, 260 gsm. Workwear, softened.",
    description:
      "Borrowed from a mechanic's shirt and lightened down. A single patch pocket, bar-tacked, set high enough that it does not swing when you move. The heaviest jersey we knit.",
    fit: "Boxy",
    gsm: 260,
    colourways: ["bone", "ink", "ochre"],
    batch: ["bone", "ink", "bone", "ochre"],
    print: "cross",
    sizes: full(5),
    facts: [
      { label: "Weight", value: "260 gsm" },
      { label: "Body", value: "Boxy, straight hem" },
      { label: "Pocket", value: "Patch, bar-tacked" },
      { label: "Fibre", value: "100% reclaimed cotton" },
      { label: "Shirts per body", value: "4" },
      { label: "Made", value: "Barcelos, Portugal" },
    ],
    care: "Wash cold at 30. The pocket is designed to hold a phone and a set of keys.",
    origin: "Spun and knitted in Barcelos, cut and sewn at Keileweg in Rotterdam.",
  },
  {
    id: "halo",
    name: "Halo",
    kind: "crop",
    price: 42,
    tagline: "Cropped body, dropped shoulder, 220 gsm.",
    description:
      "The same jersey as Cirrus with a shorter body and a shoulder that drops further. It sits at the top of a high waist and stays there through a long day.",
    fit: "Cropped",
    gsm: 220,
    colourways: ["bone", "clay", "sky"],
    batch: ["bone", "clay", "bone", "chalk"],
    print: "ring",
    sizes: short(8),
    facts: [
      { label: "Weight", value: "220 gsm" },
      { label: "Body", value: "Cropped, dropped shoulder" },
      { label: "Collar", value: "1x1 rib" },
      { label: "Fibre", value: "100% reclaimed cotton" },
      { label: "Shirts per body", value: "4" },
      { label: "Made", value: "Barcelos, Portugal" },
    ],
    care: "Wash cold at 30, dry flat. The body is short by design.",
    origin: "Spun and knitted in Barcelos, cut and sewn at Keileweg in Rotterdam.",
  },
  {
    id: "loop",
    name: "Loop",
    kind: "panel",
    price: 46,
    tagline: "Three panels, three dye batches, no blending.",
    description:
      "The clearest statement of what we do. Three panels of jersey, each spun from a different batch of reclaimed shirts, joined with a flat seam. You can see where the fibre changed.",
    fit: "Regular",
    gsm: 240,
    colourways: ["ochre", "moss", "clay"],
    batch: ["ochre", "moss", "clay", "bone"],
    print: "stack",
    sizes: full(5),
    facts: [
      { label: "Weight", value: "240 gsm" },
      { label: "Body", value: "Regular, three panels" },
      { label: "Seam", value: "Flat, 4-thread overlock" },
      { label: "Fibre", value: "100% reclaimed cotton" },
      { label: "Shirts per body", value: "4, from three batches" },
      { label: "Made", value: "Barcelos, Portugal" },
    ],
    care: "Wash cold at 30 inside out so the flat seams keep their lie.",
    origin: "Spun and knitted in Barcelos, cut and sewn at Keileweg in Rotterdam.",
    note: "Each Loop is cut from a different three-batch combination. What you see is the batch that was on the table that week.",
  },
  {
    id: "offcut-cap",
    name: "Offcut Cap",
    kind: "cap",
    price: 26,
    tagline: "Five panels, made from the offcuts nothing else could use.",
    description:
      "Every jersey we knit leaves strips at the side and the cuffs. Those strips are too short for a shirt and too good to landfill. They become a five-panel cap with a brass slide.",
    fit: "Adjustable",
    gsm: 240,
    colourways: ["stone", "ink", "clay"],
    batch: ["stone", "ink", "stone", "clay"],
    print: "none",
    sizes: [{ size: "One size", stock: 14 }],
    facts: [
      { label: "Material", value: "Reclaimed jersey offcuts" },
      { label: "Panels", value: "Five" },
      { label: "Closure", value: "Brass slide, 54–60 cm" },
      { label: "Fibre", value: "100% reclaimed cotton" },
      { label: "Waste", value: "0%" },
      { label: "Made", value: "Rotterdam" },
    ],
    care: "Spot clean. Do not wash a cap. It was not designed for it.",
    origin: "Cut and sewn at Keileweg in Rotterdam.",
  },
];

export const getProduct = (id: string) => PRODUCTS.find((p) => p.id === id);

export const euro = (value: number) =>
  new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
  }).format(value);

export const FITS = ["Boxy", "Regular", "Cropped", "Adjustable"] as const;
