export const BRAND = {
  name: "WEER",
  meaning: "Dutch for again",
  founded: 2021,
  city: "Rotterdam",
  address: "Keileweg 12, 3029 BS Rotterdam",
  addressLine2: "The Netherlands",
  hours: "Thursday to Saturday, 11:00 to 17:00",
  travel: "Tram 4 to De Helleveer, then four minutes on foot",
  phone: "+31 10 244 0918",
  email: "hallo@weer.studio",
  press: "pers@weer.studio",
  wholesale: "wholesale@weer.studio",
  loop: "loop@weer.studio",
  kvk: "Rotterdam 82411907",
  vat: "NL860418822B01",
};

export const CREDITS: { title: string; credit: string }[] = [
  {
    title: "Old Rags Into New Cloth, Salvage in Britain, 1942",
    credit: "Richard Stone, public domain, via Wikimedia Commons",
  },
  {
    title: "Davies Coop & Company, a spinning room",
    credit: "State Government of Victoria, CC0, via Wikimedia Commons",
  },
  {
    title: "NTMT.00111, yarn wound onto cones",
    credit: "Hanne Dale, Tekstilindustrimuseet, CC BY-SA 4.0",
  },
  {
    title: "Cyclopedia of Textile Work, 1911",
    credit: "Internet Archive, no known copyright restrictions",
  },
  {
    title: "Meisje spint katoen op een spinnewiel",
    credit: "Rijksmuseum, CC0, via Wikimedia Commons",
  },
  {
    title: "Amazone harbour, Port of Rotterdam",
    credit: "Alf van Beem, CC0, via Wikimedia Commons",
  },
  {
    title: "Cotton boll",
    credit: "Rawpixel, CC0",
  },
  {
    title: "Ellenroad Ring Mill Engine in operation, 2023",
    credit: "Ridiculopathy, CC0, via Wikimedia Commons",
  },
];

export type ProcessGroup = {
  heading: string;
  rows: { what: string; value: string }[];
};

export const PROCESS: ProcessGroup[] = [
  {
    heading: "Days one and two — collecting",
    rows: [
      { what: "Shirts collected at six Rotterdam drop points", value: "2 days" },
      { what: "Sorted by colour, size and wear", value: "1 day" },
      { what: "Unwearable shirts sent to the panel maker", value: "Same day" },
    ],
  },
  {
    heading: "Days three to six — fibre",
    rows: [
      { what: "Tops shredded into 8 mm flecks", value: "1 day" },
      { what: "Blended, carded and spun into yarn", value: "3 days" },
      { what: "Yarn lot weighed and labelled by batch", value: "—" },
    ],
  },
  {
    heading: "Week two — knitting",
    rows: [
      { what: "Jersey knitted on 24 gauge machines", value: "5 days" },
      { what: "Cut, sewn and labelled at Keileweg", value: "3 days" },
    ],
  },
  {
    heading: "Week three — out",
    rows: [
      { what: "Folded, checked and posted", value: "1 day" },
      { what: "Shipped within two working days", value: "2 days" },
    ],
  },
];

export const PROCESS_RESULT =
  "One t-shirt. Four t-shirts' worth of fibre. Nineteen days, door to door.";

export const FIGURES = [
  { figure: "14,800", caption: "shirts collected since 2021, and counted" },
  { figure: "92%", caption: "of our fibre comes from within 150 km of Rotterdam" },
  { figure: "4", caption: "old t-shirts go into every new body" },
  { figure: "0", caption: "virgin cotton, and no polyester blends" },
  { figure: "9,240 kg", caption: "of textile waste kept out of incineration in 2025" },
  { figure: "19 days", caption: "from the collection point to your door" },
];

export const TEAM = [
  { name: "Joost Marseille", role: "Founder, sorting floor" },
  { name: "Nienke Boersma", role: "Founder, sewing" },
  { name: "Rafal Kowalczyk", role: "Fibre and spinning" },
  { name: "Samira El Amrani", role: "Production" },
  { name: "Tomas Vogel", role: "Pattern and quality" },
  { name: "Iris Bekker", role: "Take-back and community" },
  { name: "Willem Vink", role: "Wholesale and press" },
];

export const MILESTONES = [
  {
    year: "2021",
    text: "Two hundred shirts nobody wanted, a rented shredder and a workshop on Keileweg.",
  },
  {
    year: "2022",
    text: "First spin. Forty kilos of reclaimed cotton into a jersey we could actually knit.",
  },
  {
    year: "2023",
    text: "WEER Loop opens. Four hundred shirts collected in the first year.",
  },
  {
    year: "2024",
    text: "A purpose-built sorting floor. Nine part-time roles, all within walking distance.",
  },
  {
    year: "2025",
    text: "14,800 shirts collected. The cap, our first product made only from offcuts.",
  },
  {
    year: "2026",
    text: "A second mill partner in Barcelos. The same yarn, twice the capacity.",
  },
];

export const REFUSALS = [
  {
    title: "No bamboo, no viscose, no 'eco' fibre",
    text: "Everything we make is cotton that was once a shirt. We would rather make less of it well.",
  },
  {
    title: "No charity tees priced to guilt you",
    text: "Money moved to a cause is not a reason to buy a shirt. If we fund something, we will say so and say how much.",
  },
  {
    title: "No polyester in a recycled cotton blend",
    text: "Polyester is not the problem. Blending it in so a shirt lasts longer is a different question, and we answered it by knitting heavier.",
  },
  {
    title: "No carbon-neutral claim we cannot measure",
    text: "We publish the numbers we can stand behind. Where we do not know, we say we do not know.",
  },
];

export const FAQ = [
  {
    q: "Will it shrink?",
    a: "Wash it cold and dry it flat or low. Reclaimed cotton relaxes about 2% in the first wash and then holds. A new tee shrinks three to five percent and then holds a shape you did not ask for.",
  },
  {
    q: "How do I pick a size?",
    a: "Our tees run boxy. If you want one that fits like the shirt you already own, take your usual size. Between two sizes, take the smaller one. The body measurements are on every product page.",
  },
  {
    q: "What exactly is in the fabric?",
    a: "One hundred percent cotton, and every gram of it was a t-shirt at some point. The flecks you can see in the jersey are the four shirts this one was spun from.",
  },
  {
    q: "Where do the shirts come from?",
    a: "Six collection points across Rotterdam, plus anyone who posts us a box. We pay the postage either way, and you can drop off at the studio on a Thursday.",
  },
  {
    q: "What if it does not fit?",
    a: "Thirty days, no questions, and we pay the return label. Send it back and we will put it into the loop rather than the bin.",
  },
  {
    q: "How does the take-back work?",
    a: "Post us two shirts in any condition. You get twenty percent off your next order and the shirts go back into the loop. It is the only part of this business that compounds.",
  },
];

export const STOCKISTS = [
  { name: "Hekwerk", place: "Rotterdam, Keileweg" },
  { name: "Katoen en Co", place: "Amsterdam, De Pijp" },
  { name: "Wat Schot", place: "Utrecht, Oudegracht" },
  { name: "De Dok", place: "Antwerpen, Zuid" },
  { name: "Spinnerei", place: "Berlin, Kreuzberg" },
];

export const CHANNELS = [
  {
    label: "General",
    value: "hallo@weer.studio",
    note: "Anything at all. We read everything, on Thursdays.",
  },
  {
    label: "Wholesale and stockists",
    value: "wholesale@weer.studio",
    note: "Minimum order of forty pieces. We do not sell the same shirts to everyone.",
  },
  {
    label: "Press",
    value: "pers@weer.studio",
    note: "Sample shirts, batch records and the numbers behind them, on request.",
  },
  {
    label: "Take-back",
    value: "loop@weer.studio",
    note: "Post us a box of shirts. We pay the label.",
  },
];

export const LETTER = {
  signatory: "Joost Marseille",
  role: "Founder",
  paragraphs: [
    "WEER began because a warehouse on Keileweg was full of t-shirts nobody wanted and I could not think of a good reason to throw them away. Not a noble reason. I simply did not want to pay for the skip.",
    "A textile engineer named Rafal explained that a t-shirt is mostly cotton, and cotton can be cotton again. We bought a shredder, and for a year we made a grey, slightly ugly jersey that nobody would wear. Then we learned to sort, to blend, to control the weight, and it became a shirt.",
    "Every claim on this site comes from our own records: the shirts we counted, the kilos we weighed, the days it took. Where we do not know, the site says so. That is the whole business, honestly told.",
    "The name is Dutch. Weer means again. It seemed the right word for a company whose entire product is a second chance, and short enough to print on the label.",
  ],
};

/** Photographs found in open collections. They show the world of reclaimed fibre. */
export const PHOTOS = {
  shoddy: {
    src: "/photos/shoddy-1942.jpg",
    w: 1223,
    h: 1240,
    alt: "A worker rakes newly made shoddy cloth out of the receiving chamber of a textile works, 1942.",
    caption: "Shoddy being pulled from the blow hole, 1942.",
    credit:
      "British Ministry of Information, public domain",
  },
  spinning: {
    src: "/photos/spinning-room.jpg",
    w: 1920,
    h: 1470,
    alt: "Rows of bobbins on a spinning room floor with workers standing along the line.",
    caption: "A spinning room, rows of bobbins.",
    credit:
      "State Government of Victoria, CC0, via Wikimedia Commons",
  },
  cones: {
    src: "/photos/yarn-cones.jpg",
    w: 1200,
    h: 798,
    alt: "A winding machine running with cones of yarn in many colours along its length.",
    caption: "Yarn wound onto cones, ready for the knitting machine.",
    credit:
      "Tekstilindustrimuseet, CC BY-SA 4.0",
  },
  mill: {
    src: "/photos/mill-interior-1911.jpg",
    w: 1920,
    h: 1397,
    alt: "An engraving of a nineteenth century textile mill interior with workers among spinning frames.",
    caption: "A textile mill, from a 1911 encyclopedia of cotton work.",
    credit:
      "Internet Archive, no known copyright restrictions",
  },
  girl: {
    src: "/photos/girl-spinning-cotton.jpg",
    w: 1920,
    h: 2543,
    alt: "A page from an old book showing a girl in Japanese dress spinning cotton on a wheel.",
    caption: "Spinning cotton at home, from a Rijksmuseum object.",
    credit: "Rijksmuseum, CC0, via Wikimedia Commons",
  },
  harbour: {
    src: "/photos/rotterdam-harbour.jpg",
    w: 1920,
    h: 1440,
    alt: "Container cranes on the quay at the Amazone harbour in the port of Rotterdam.",
    caption: "Cranes on the Amazone harbour, Rotterdam.",
    credit: "Alf van Beem, CC0, via Wikimedia Commons",
  },
  port: {
    src: "/photos/rotterdam-port.jpg",
    w: 1920,
    h: 1440,
    alt: "A container ship berthed under the cranes at the Amazone harbour in Rotterdam.",
    caption: "The port of Rotterdam, where all of this arrives.",
    credit: "Alf van Beem, CC0, via Wikimedia Commons",
  },
  cotton: {
    src: "/photos/cotton-boll.webp",
    w: 1024,
    h: 683,
    alt: "An open cotton boll showing the white fibre.",
    caption: "Cotton, before anyone remembers it was a plant.",
    credit: "Rawpixel, CC0",
  },
};
