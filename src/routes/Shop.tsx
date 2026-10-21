import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import { Photo } from "../components/Photo";
import { Reveal } from "../components/Reveal";
import { COLORWAYS, FITS, PRODUCTS, type Product } from "../data/products";
import { BRAND, PHOTOS } from "../data/site";

type Sort = "featured" | "price-asc" | "price-desc" | "weight";

export function Shop() {
  const [fit, setFit] = useState<string | null>(null);
  const [colour, setColour] = useState<string | null>(null);
  const [weight, setWeight] = useState<"all" | "light" | "heavy">("all");
  const [sort, setSort] = useState<Sort>("featured");
  const [picked, setPicked] = useState<Record<string, string>>({});

  const listed = useMemo(() => {
    let out: Product[] = [...PRODUCTS];
    if (fit) out = out.filter((p) => p.fit === fit);
    if (colour) out = out.filter((p) => p.colourways.includes(colour));
    if (weight === "light") out = out.filter((p) => p.gsm < 240);
    if (weight === "heavy") out = out.filter((p) => p.gsm >= 240);
    if (sort === "price-asc") out.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") out.sort((a, b) => b.price - a.price);
    if (sort === "weight") out.sort((a, b) => a.gsm - b.gsm);
    return out;
  }, [fit, colour, weight, sort]);

  const clear = () => {
    setFit(null);
    setColour(null);
    setWeight("all");
  };

  const active = Boolean(fit || colour || weight !== "all");

  const colourOptions = useMemo(() => {
    const seen = new Set<string>();
    PRODUCTS.forEach((p) => p.colourways.forEach((c) => seen.add(c)));
    return [...seen];
  }, []);

  return (
    <div>
      {/* ---------------------- the title ---------------------- */}
      <header className="frame pt-10 md:pt-16">
        <h1 className="t-display">The collection</h1>
        <p className="t-lead body-copy mt-6">
          Seven pieces. Every one of them is four old shirts, and nothing you
          have to buy new.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a href="#pieces" className="btn btn--accent">
            See the seven pieces
          </a>
          <a href="#takeback" className="link-line t-small font-semibold">
            How the take-back works
          </a>
        </div>
      </header>

      {/* ------------------- the band of the world ------------------- */}
      <Reveal delay={120}>
        <figure className="frame mt-10">
          <div className="photo aspect-[16/9]">
            <video
              className="h-full w-full object-cover"
              style={{
                filter: "grayscale(1) sepia(0.26) contrast(1.22) brightness(0.97)",
              }}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/photos/mill-engine-poster.jpg"
              aria-label="A mill engine in operation at the Ellenroad Ring Mill in Greater Manchester"
            >
              <source src="/photos/mill-engine.webm" type="video/webm" />
            </video>
          </div>
          <figcaption className="mt-2 t-small text-ink-2">
            A ring mill engine at work, Ellenroad, Greater Manchester, 2023.
            Ridiculopathy, CC0, via Wikimedia Commons.
          </figcaption>
        </figure>
      </Reveal>

      {/* -------------------- filters and the grid -------------------- */}
      <div className="frame mt-12 grid grid-cols-1 gap-x-10 gap-y-10 md:mt-16 md:grid-cols-[19rem_minmax(0,1fr)]">
        <aside className="md:sticky md:top-[calc(var(--header-h)+1.5rem)] md:self-start">
          <div className="flex items-baseline justify-between">
            <p className="num t-body font-semibold">
              {listed.length} {listed.length === 1 ? "piece" : "pieces"}
            </p>
            {active && (
              <button
                type="button"
                onClick={clear}
                className="meta link-line text-ink-2"
              >
                Clear
              </button>
            )}
          </div>

          <fieldset className="mt-8">
            <legend className="meta text-ink-2">Fit</legend>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {FITS.map((f) => (
                <FilterChip
                  key={f}
                  label={f}
                  active={fit === f}
                  onClick={() => setFit(fit === f ? null : f)}
                />
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-7">
            <legend className="meta text-ink-2">Weight</legend>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {[
                { id: "light" as const, label: "Under 240 gsm" },
                { id: "heavy" as const, label: "240 gsm and over" },
              ].map((w) => (
                <FilterChip
                  key={w.id}
                  label={w.label}
                  active={weight === w.id}
                  onClick={() => setWeight(weight === w.id ? "all" : w.id)}
                />
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-7">
            <legend className="meta text-ink-2">Colour</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {colourOptions.map((id) => {
                const cw = COLORWAYS[id];
                const isOn = colour === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setColour(isOn ? null : id)}
                    aria-label={cw.name}
                    aria-pressed={isOn}
                    title={cw.name}
                    className="h-7 w-7 rounded-full border-0 transition-transform duration-150 hover:scale-110"
                    style={{
                      background: cw.hex,
                      boxShadow: isOn
                        ? "inset 0 0 0 1px rgb(20 32 28 / 0.25), 0 0 0 2px var(--color-paper), 0 0 0 4px var(--color-ink)"
                        : "inset 0 0 0 1px rgb(20 32 28 / 0.2)",
                    }}
                  />
                );
              })}
            </div>
          </fieldset>

          <div className="mt-9">
            <label htmlFor="sort" className="meta block text-ink-2">
              Sort
            </label>
            <select
              id="sort"
              className="field mt-2"
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price, low to high</option>
              <option value="price-desc">Price, high to low</option>
              <option value="weight">Weight, lightest first</option>
            </select>
          </div>

          <div id="takeback" className="mt-8 bg-paper-2 p-5">
            <p className="meta text-ink-2">Take-back</p>
            <p className="mt-2 t-body leading-snug">
              Post us two shirts in any condition and get twenty percent off
              your next order.
            </p>
            <Link to="/contact" className="meta link-line mt-3 inline-block">
              How it works
            </Link>
          </div>
        </aside>

        <div id="pieces">
          {listed.length === 0 ? (
            <div className="flex min-h-[40svh] flex-col justify-center">
              <p className="t-lead max-w-[24ch]">
                Nothing matches those three filters. Take one off and try again.
              </p>
              <button type="button" onClick={clear} className="btn mt-6 w-fit">
                Clear the filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 xl:grid-cols-4">
              {listed.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  colourway={picked[p.id]}
                  onColour={(id) => setPicked((s) => ({ ...s, [p.id]: id }))}
                />
              ))}
            </div>
          )}

          <div className="mt-24">
            <Reveal>
              <h2 className="head t-head">Where these come from</h2>
            </Reveal>
            <Reveal delay={60}>
              <p className="body-copy mt-4">
                Nothing on this page is new cotton. Every piece starts as four
                shirts somebody already owned.
              </p>
            </Reveal>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Reveal delay={100}>
                <figure>
                  <Photo
                    src={PHOTOS.girl.src}
                    w={PHOTOS.girl.w}
                    h={PHOTOS.girl.h}
                    alt={PHOTOS.girl.alt}
                    className="aspect-[4/5]"
                  />
                  <figcaption className="mt-2 t-small text-ink-2">
                    {PHOTOS.girl.caption} {PHOTOS.girl.credit}.
                  </figcaption>
                </figure>
              </Reveal>
              <Reveal delay={160}>
                <figure>
                  <Photo
                    src={PHOTOS.cotton.src}
                    w={PHOTOS.cotton.w}
                    h={PHOTOS.cotton.h}
                    alt={PHOTOS.cotton.alt}
                    className="aspect-[4/5] sm:mt-14"
                  />
                  <figcaption className="mt-2 t-small text-ink-2">
                    {PHOTOS.cotton.caption} {PHOTOS.cotton.credit}.
                  </figcaption>
                </figure>
              </Reveal>
            </div>
          </div>

          <div className="mt-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <p className="t-lead max-w-[30ch]">
              Every shirt ships within two working days, and a wrong size comes
              back for free.
            </p>
            <p className="meta text-ink-2">
              Free shipping over 75 euro. {BRAND.hours}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full px-3 py-1.5 t-small transition-colors duration-150 ${
        active ? "bg-ink text-paper" : "bg-paper-2 text-ink hover:bg-paper-3"
      }`}
    >
      {label}
    </button>
  );
}
