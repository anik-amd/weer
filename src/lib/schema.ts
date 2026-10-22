/**
 * The structured data.
 *
 * JSON-LD is how a search engine or an assistant reads the site: it says what
 * the things are, how they relate and what they cost, rather than leaving a
 * crawler to guess from the markup. One graph per page, with the pieces
 * shared by every page pointing at the same ids.
 *
 * Nothing here invents anything the site does not already say. There are no
 * ratings and no reviews, because the site has none.
 */
import { BRAND, FAQ, SITE, TEAM } from "../data/site";
import { COLORWAYS, PRODUCTS, getProduct } from "../data/products";

type Thing = Record<string, unknown>;

const url = (path: string) => `${SITE.url}${path}`;

/** The studio itself. The same on every page. */
const organization = (): Thing => ({
  "@type": "Organization",
  "@id": `${url("/")}#organization`,
  name: BRAND.name,
  url: url("/"),
  logo: { "@type": "ImageObject", url: url(SITE.logo) },
  image: url(SITE.image),
  description:
    "WEER is a design study of a t-shirt shop: a Rotterdam studio that shreds reclaimed t-shirts into yarn and knits new ones. The brand, the products, the prices and the numbers are invented.",
  foundingDate: String(BRAND.founded),
  foundingLocation: { "@type": "Place", name: "Rotterdam, Netherlands" },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Keileweg 12",
    addressLocality: "Rotterdam",
    postalCode: "3029 BS",
    addressCountry: "NL",
  },
  email: BRAND.email,
  telephone: BRAND.phone,
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: BRAND.email,
      telephone: BRAND.phone,
      availableLanguage: ["en", "nl"],
      areaServed: ["NL", "BE", "DE"],
    },
  ],
  sameAs: [SITE.repo],
});

/** The site itself, for the publisher relationship. */
const website = (): Thing => ({
  "@type": "WebSite",
  "@id": `${url("/")}#website`,
  url: url("/"),
  name: BRAND.name,
  description:
    "Seven pieces knitted from reclaimed t-shirts, and the studio that makes them.",
  inLanguage: "en-GB",
  publisher: { "@id": `${url("/")}#organization` },
});

/** How a reader gets from one page to the next. */
const breadcrumbs = (trail: { name: string; path: string }[]): Thing => ({
  "@type": "BreadcrumbList",
  itemListElement: trail.map((crumb, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: crumb.name,
    item: url(crumb.path),
  })),
});

/** One piece, with what it costs. */
const product = (id: string): Thing | null => {
  const p = getProduct(id);
  if (!p) return null;
  return {
    "@type": "Product",
    "@id": `${url(`/shop/${p.id}`)}#product`,
    name: p.name,
    description: p.description,
    url: url(`/shop/${p.id}`),
    image: url(SITE.image),
    sku: `WEER-${p.id.toUpperCase()}`,
    category: "T-shirts",
    material: "100% reclaimed cotton",
    color: p.colourways.map((c) => COLORWAYS[c].name).join(", "),
    brand: { "@type": "Brand", name: BRAND.name },
    offers: {
      "@type": "Offer",
      price: p.price,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: url(`/shop/${p.id}`),
      seller: { "@id": `${url("/")}#organization` },
      itemCondition: "https://schema.org/NewCondition",
    },
  };
};

/** The seven pieces, in order, so a crawler can read the catalogue. */
const catalogue = (): Thing => ({
  "@type": "ItemList",
  name: "The collection",
  numberOfItems: PRODUCTS.length,
  itemListElement: PRODUCTS.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: url(`/shop/${p.id}`),
    name: p.name,
  })),
});

/** The questions, answered. This is what an assistant reaches for. */
const questions = (): Thing => ({
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

/**
 * The graph for one page. Every page carries the studio and the site; the
 * rest depends on what the page is about.
 */
export function schemaFor(path: string): Thing[] {
  const graph: Thing[] = [organization(), website()];

  if (path === "/") {
    graph.push({
      "@type": "WebPage",
      "@id": `${url("/")}#webpage`,
      url: url("/"),
      name: "WEER — t-shirts made from the ones you already own",
      isPartOf: { "@id": `${url("/")}#website` },
      about: { "@id": `${url("/")}#organization` },
      primaryImageOfPage: { "@type": "ImageObject", url: url(SITE.image) },
      inLanguage: "en-GB",
    });
    graph.push(catalogue());
  }

  if (path === "/shop") {
    graph.push({
      "@type": "CollectionPage",
      "@id": `${url("/shop")}#webpage`,
      url: url("/shop"),
      name: "The collection — WEER",
      isPartOf: { "@id": `${url("/")}#website` },
      about: { "@id": `${url("/")}#organization` },
      inLanguage: "en-GB",
    });
    graph.push(catalogue());
    graph.push(
      breadcrumbs([
        { name: "Home", path: "/" },
        { name: "The collection", path: "/shop" },
      ]),
    );
  }

  if (path.startsWith("/shop/")) {
    const id = path.slice("/shop/".length);
    const p = product(id);
    if (p) {
      graph.push(p);
      graph.push(
        breadcrumbs([
          { name: "Home", path: "/" },
          { name: "The collection", path: "/shop" },
          { name: id, path },
        ]),
      );
    }
  }

  if (path === "/about") {
    graph.push({
      "@type": "AboutPage",
      "@id": `${url("/about")}#webpage`,
      url: url("/about"),
      name: "About us — WEER",
      isPartOf: { "@id": `${url("/")}#website` },
      about: { "@id": `${url("/")}#organization` },
      inLanguage: "en-GB",
    });
    graph.push(
      breadcrumbs([
        { name: "Home", path: "/" },
        { name: "About us", path: "/about" },
      ]),
    );
    // The people behind it. The team is small and named, which is the
    // whole point of the page.
    for (const m of TEAM) {
      graph.push({
        "@type": "Person",
        name: m.name,
        jobTitle: m.role,
        worksFor: { "@id": `${url("/")}#organization` },
      });
    }
  }

  if (path === "/contact") {
    graph.push({
      "@type": "ContactPage",
      "@id": `${url("/contact")}#webpage`,
      url: url("/contact"),
      name: "Contact — WEER",
      isPartOf: { "@id": `${url("/")}#website` },
      about: { "@id": `${url("/")}#organization` },
      inLanguage: "en-GB",
    });
    graph.push(questions());
    graph.push(
      breadcrumbs([
        { name: "Home", path: "/" },
        { name: "Contact", path: "/contact" },
      ]),
    );
  }

  if (path === "/checkout") {
    graph.push({
      "@type": "WebPage",
      "@id": `${url("/checkout")}#webpage`,
      url: url("/checkout"),
      name: "Your order — WEER",
      isPartOf: { "@id": `${url("/")}#website` },
      about: { "@id": `${url("/")}#organization` },
      inLanguage: "en-GB",
    });
  }

  return graph;
}

/** The whole thing, ready to be written into a script tag. */
export function schemaJson(path: string): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": schemaFor(path),
  });
}
