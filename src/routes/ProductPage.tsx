import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Garment } from "../components/Garment";
import { Photo } from "../components/Photo";
import { ProductCard } from "../components/ProductCard";
import { Reveal } from "../components/Reveal";
import { useCart } from "../lib/cart";
import { COLORWAYS, PRODUCTS, batchOf, euro, getProduct } from "../data/products";
import { PHOTOS } from "../data/site";

export function ProductPage() {
  const { id = "" } = useParams();
  const product = getProduct(id);
  const { add } = useCart();
  const [colourway, setColourway] = useState<string | null>(null);
  const [size, setSize] = useState<string | null>(null);

  const active = colourway ?? product?.colourways[0] ?? "";

  const related = useMemo(
    () => PRODUCTS.filter((p) => p.id !== id).slice(0, 3),
    [id],
  );

  if (!product) {
    return (
      <div className="read">
        <h1 className="head">We do not make that one.</h1>
        <p className="body-copy mt-4">
          The piece you were looking for is not here. The collection is seven
          strong.
        </p>
        <Link to="/shop" className="btn mt-6">
          Back to the collection
        </Link>
      </div>
    );
  }

  const batchIds = batchOf(product, active);
  const batchHexes = batchIds.map((b) => COLORWAYS[b]?.hex ?? "#e2dac5");
  const distinct = new Set(batchIds).size;

  const selectedSize = size ?? product.sizes[0]?.size;
  const selected = product.sizes.find((s) => s.size === selectedSize);
  const soldOut = !selected || selected.stock === 0;

  return (
    <div className="split">
      <div>
        <section className="read">
          <h1 className="t-display">{product.name}</h1>
          <div className="mt-3 flex items-baseline gap-4">
            <p className="num t-lead font-bold">{euro(product.price)}</p>
            <p className="meta text-ink-2">
              {product.fit} · {product.gsm} gsm
            </p>
          </div>
          <p className="t-lead body-copy mt-6">{product.tagline}</p>

          {/* colourways */}
          <Reveal delay={180}>
            <div className="mt-9">
              <div className="flex items-center justify-between gap-4">
                <p className="t-small font-semibold">Colour</p>
                <div className="flex flex-wrap items-center justify-end gap-2.5">
                  {product.colourways.map((id) => {
                    const cw = COLORWAYS[id];
                    const isOn = id === active;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setColourway(id)}
                        aria-label={cw.name}
                        aria-pressed={isOn}
                        title={cw.name}
                        className="h-9 w-9 rounded-full border-0 transition-transform duration-150 hover:scale-110"
                        style={{
                          background: cw.hex,
                          boxShadow: isOn
                            ? "inset 0 0 0 1px rgb(20 32 28 / 0.25), 0 0 0 2px var(--color-ground), 0 0 0 4px var(--color-ink)"
                            : "inset 0 0 0 1px rgb(20 32 28 / 0.2)",
                        }}
                      />
                    );
                  })}
                  <p className="t-body font-semibold">{COLORWAYS[active]?.name}</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* sizes */}
          <Reveal delay={250}>
            <div className="mt-8">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <p className="t-small font-semibold">Size</p>
                <p className="meta text-ink-2">
                  Between two sizes, take the smaller
                </p>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.sizes.map((s) => {
                  const isOn = s.size === selectedSize;
                  const out = s.stock === 0;
                  return (
                    <button
                      key={s.size}
                      type="button"
                      disabled={out}
                      onClick={() => setSize(s.size)}
                      aria-pressed={isOn}
                      className={`min-w-[3.25rem] border px-3 py-2.5 t-small transition-colors duration-150 ${
                        out
                          ? "cursor-not-allowed border-ground-3 text-ink-3 line-through"
                          : isOn
                            ? "border-solid bg-solid text-solid-ink"
                            : "border-line hover:border-solid"
                      }`}
                    >
                      {s.size}
                    </button>
                  );
                })}
              </div>
              {selected && selected.stock > 0 && selected.stock <= 3 && (
                <p className="meta mt-2 text-accent-2">
                  {selected.stock} left in {selected.size}
                </p>
              )}
            </div>
          </Reveal>

          <Reveal delay={290}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                type="button"
                disabled={soldOut}
                onClick={() => add(product.id, active, selectedSize)}
                className="btn btn--accent disabled:cursor-not-allowed disabled:bg-ground-3 disabled:text-ink-3"
              >
                {soldOut
                  ? "Sold out in this size"
                  : `Add to bag, ${euro(product.price)}`}
              </button>
              <p className="meta text-ink-2">Ships within two working days</p>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <p className="body-copy mt-9 text-ink-2">{product.description}</p>
          </Reveal>

          {/* the batch */}
          <Reveal delay={320}>
            <div className="mt-12">
              <h2 className="t-body font-semibold tracking-[-0.01em]">
                The batch this one came from
              </h2>
              <p className="mt-2 max-w-[46ch] t-body leading-snug text-ink-2">
                {distinct > 1
                  ? "Four shirts, three dye batches. The marl you can see in the fabric is those shirts, still there."
                  : "Four shirts of the same dye, spun into a solid body. The flecks are the older cotton, not a blend."}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {batchIds.map((b, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 border border-line px-3 py-1.5 t-body"
                  >
                    <span
                      className="h-3.5 w-3.5 rounded-full"
                      style={{ background: COLORWAYS[b]?.hex }}
                    />
                    {COLORWAYS[b]?.name}
                  </li>
                ))}
              </ul>
              {product.note && (
                <p className="mt-4 max-w-[46ch] t-body leading-snug text-ink-2">
                  {product.note}
                </p>
              )}
            </div>
          </Reveal>
        </section>

        {/* details */}
        <section className="read pt-0">
          <Reveal>
            <h2 className="head t-head">The specifics</h2>
            <dl className="mt-6 grid grid-cols-1 gap-x-10 sm:grid-cols-2">
              {product.facts.map((f) => (
                <div
                  key={f.label}
                  className="flex items-baseline justify-between gap-4 pb-4"
                >
                  <dt className="meta text-ink-2">{f.label}</dt>
                  <dd className="t-body font-medium">{f.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 space-y-4">
              <p className="t-body leading-relaxed">
                <span className="font-semibold">Care. </span>
                {product.care}
              </p>
              <p className="t-body leading-relaxed">
                <span className="font-semibold">Where. </span>
                {product.origin}
              </p>
            </div>
          </Reveal>
        </section>

        {/* where it was made */}
        <section className="read pt-0">
          <Reveal>
            <h2 className="head t-head">Where this one was made</h2>
            <p className="body-copy mt-5">
              Four shirts, sorted in Rotterdam, spun in Barcelos, knitted on 24
              gauge machines, and sewn at Keileweg. The pictures below are the
              world that makes it, not our workshop.
            </p>
          </Reveal>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Reveal delay={60}>
              <figure>
                <Photo
                  src={PHOTOS.cones.src}
                  w={PHOTOS.cones.w}
                  h={PHOTOS.cones.h}
                  alt={PHOTOS.cones.alt}
                  className="aspect-[4/3]"
                />
                <figcaption className="mt-2 t-small text-ink-2">
                  {PHOTOS.cones.caption} {PHOTOS.cones.credit}.
                </figcaption>
              </figure>
            </Reveal>
            <Reveal delay={120}>
              <figure>
                <Photo
                  src={PHOTOS.mill.src}
                  w={PHOTOS.mill.w}
                  h={PHOTOS.mill.h}
                  alt={PHOTOS.mill.alt}
                  className="aspect-[4/3] sm:mt-10"
                />
                <figcaption className="mt-2 t-small text-ink-2">
                  {PHOTOS.mill.caption} {PHOTOS.mill.credit}.
                </figcaption>
              </figure>
            </Reveal>
          </div>

          <Reveal delay={160}>
            <figure className="mt-8">
              <div className="photo drift aspect-[16/9]">
                <video
                  className="h-full w-full object-cover"
                  style={{
                    filter:
                      "grayscale(1) sepia(0.26) contrast(1.22) brightness(0.97)",
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
        </section>

        <section className="read pt-0">
          <Reveal>
            <h2 className="head t-head">Also from the same batch</h2>
            <div className="mt-7 grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </Reveal>
        </section>
      </div>

      {/* the fixed half */}
      <div className="stage stage--short flex flex-col bg-ground-2">
        <div className="flex min-h-0 flex-1 items-center justify-center p-6">
          <Garment
            kind={product.kind}
            colours={batchHexes}
            print={product.print}
            className="h-full max-h-[44rem] w-auto"
          />
        </div>
        <div className="hidden items-center justify-between gap-4 bg-panel px-5 py-3 min-[901px]:flex">
          <span className="meta">{product.name}</span>
          <span className="meta">
            {distinct > 1 ? `Marled, ${distinct} batches` : "Solid batch"}
          </span>
        </div>
      </div>
    </div>
  );
}
