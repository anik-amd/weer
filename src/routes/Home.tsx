import { useState } from "react";
import { Link } from "react-router-dom";
import { Garment } from "../components/Garment";
import { BatchBuilder } from "../components/BatchBuilder";
import { ProductCard } from "../components/ProductCard";
import { Photo } from "../components/Photo";
import { Reveal } from "../components/Reveal";
import { Stage, useActiveSection } from "../components/Stage";
import { BRAND, FIGURES, PHOTOS, PROCESS, PROCESS_RESULT, STOCKISTS, TEAM } from "../data/site";
import { DYE_BATCHES, PRODUCTS } from "../data/products";

const SECTIONS = ["hero", "process", "collection", "numbers", "people", "closing"];

const COLLECTION_POINTS = [
  "Hekwerk, Keileweg",
  "Wasbas, Katendrecht",
  "De Kring, Kralingen",
  "Sterker Thuis, Charlois",
  "Het Pakhuis, Spijkenisse",
  "Buurtkast, Hillegersberg",
];

export function Home() {
  const active = useActiveSection(SECTIONS);
  const [dye, setDye] = useState("bone");

  const batch = DYE_BATCHES.find((b) => b.colourway === dye) ?? DYE_BATCHES[0];
  const featured = PRODUCTS.filter((p) =>
    ["cirrus", "terra", "loop"].includes(p.id),
  );

  return (
    <div className="split">
      {/* ---------------- reading column ---------------- */}
      <div>
        <section id="hero" className="read">
          <h1 className="t-display">Four old shirts. One new one.</h1>
          <Reveal delay={80}>
            <p className="t-lead body-copy mt-7">
              We make t-shirts out of the t-shirts you already own. Collected
              in Rotterdam, spun into yarn, knitted in Portugal.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link to="/shop" className="btn btn--accent">
                See the collection
              </Link>
              <a href="#process" className="link-line t-small font-semibold">
                How a shirt comes back
              </a>
            </div>
          </Reveal>
        </section>

        {/* ------------- the process, printed as a slip ------------- */}
        <section id="process" className="field-dark read bleed">
          <Reveal>
            <h2 className="t-head max-w-[16ch] text-paper">
              How a shirt comes back
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="body-copy mt-6 text-paper/90">
              Nineteen days from the collection point to your door. The
              receipt below is the real one: four shirts in, one shirt out, and
              nothing new bought in.
            </p>
          </Reveal>

          <Reveal delay={140}>
            <div className="slip mt-10 w-full max-w-[27rem] px-5 pt-5">
              {PROCESS.map((group) => (
                <div key={group.heading} className="mb-6">
                  <h3 className="t-body font-bold">{group.heading}</h3>
                  <div className="mt-2">
                    {group.rows.map((row) => (
                      <div key={row.what} className="slip-row">
                        <span className="t-small">{row.what}</span>
                        <span className="slip-leader" aria-hidden="true" />
                        <span className="num t-small font-semibold">
                          {row.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <p className="num -mx-5 bg-ink px-5 py-3 t-small font-semibold text-paper">
                {PROCESS_RESULT}
              </p>
            </div>
          </Reveal>

          <Reveal delay={180}>
            <figure className="mt-12">
              <div className="photo aspect-[16/9]">
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
              <figcaption className="mt-2 t-small text-paper/70">
                A ring mill engine at work, Ellenroad, Greater Manchester, 2023.
                Ridiculopathy, CC0, via Wikimedia Commons.
              </figcaption>
            </figure>
          </Reveal>
        </section>

        {/* ------------------- the collection ------------------- */}
        <section id="collection" className="read">
          <Reveal>
            <h2 className="t-head">Six shapes, and a cap</h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="body-copy mt-5">
              Every piece starts as four shirts. The first three you already
              know; the rest are what we make when a batch lands on the
              sorting table.
            </p>
          </Reveal>

          <div className="mt-9 grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <Reveal delay={120}>
            <Link to="/shop" className="btn btn--ghost mt-10">
              See all seven pieces
            </Link>
          </Reveal>
        </section>

        {/* ---------------------- the numbers ---------------------- */}
        <section id="numbers" className="read">
          <Reveal>
            <h2 className="t-head">What it adds up to</h2>
          </Reveal>

          <Reveal delay={80}>
            <div className="mosaic mt-8">
              <Photo
                src={PHOTOS.harbour.src}
                w={PHOTOS.harbour.w}
                h={PHOTOS.harbour.h}
                alt={PHOTOS.harbour.alt}
                className="aspect-[4/3] min-[640px]:aspect-square"
              />
              <div className="field-dark flex flex-col p-4">
                <span className="num t-head leading-none font-extrabold tracking-[-0.04em]">
                  {FIGURES[0].figure}
                </span>
                <span className="mt-2 t-small leading-snug text-paper/80">
                  {FIGURES[0].caption}
                </span>
              </div>
              <div className="field-accent flex flex-col p-4">
                <span className="num t-head leading-none font-extrabold tracking-[-0.04em]">
                  {FIGURES[1].figure}
                </span>
                <span className="mt-2 t-small leading-snug">{FIGURES[1].caption}</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <dl className="mt-6 grid grid-cols-1 gap-y-5 bg-paper-2 p-6 sm:grid-cols-2 sm:gap-x-10">
              {FIGURES.slice(2).map((f) => (
                <div key={f.figure} className="flex items-baseline gap-4">
                  <dt className="num t-lead shrink-0 font-bold tracking-[-0.03em]">
                    {f.figure}
                  </dt>
                  <dd className="t-small leading-snug text-ink-2">
                    {f.caption}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </section>

        {/* ---------------------- the people ---------------------- */}
        <section id="people" className="read">
          <Reveal>
            <h2 className="t-head">Seven people on Keileweg</h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="body-copy mt-5">
              A sorting floor, a sewing table and a small spinning room, all
              on the same street, all within walking distance of the tram.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <figure className="mt-8">
              <Photo
                src={PHOTOS.spinning.src}
                w={PHOTOS.spinning.w}
                h={PHOTOS.spinning.h}
                alt={PHOTOS.spinning.alt}
                className="aspect-[16/9]"
              />
              <figcaption className="mt-2 t-small text-ink-2">
                {PHOTOS.spinning.caption} {PHOTOS.spinning.credit}.
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={150}>
            <div className="mt-10 columns-1 gap-10 sm:columns-2 [&>*]:mb-8 [&>*]:break-inside-avoid">
              <div>
                <p className="meta text-ink-2">The studio</p>
                <ul className="mt-1">
                  {TEAM.map((m) => (
                    <li key={m.name} className="t-body leading-[1.55]">
                      {m.name}
                      <span className="text-ink-2"> — {m.role}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="meta text-ink-2">Collection points</p>
                <ul className="mt-1">
                  {COLLECTION_POINTS.map((c) => (
                    <li key={c} className="t-body leading-[1.55]">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="meta text-ink-2">The mill</p>
                <ul className="mt-1">
                  <li className="t-body leading-[1.55]">
                    Santahar.pt — Barcelos
                    <span className="text-ink-2"> — knitting, 24 gauge</span>
                  </li>
                </ul>
              </div>

              <div>
                <p className="meta text-ink-2">Stockists</p>
                <ul className="mt-1">
                  {STOCKISTS.map((s) => (
                    <li key={s.name} className="t-body leading-[1.55]">
                      {s.name}
                      <span className="text-ink-2"> — {s.place}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ---------------------- the close ---------------------- */}
        <section
          id="closing"
          className="read flex min-h-[58svh] flex-col justify-center"
        >
          <Reveal>
            <p className="t-lead max-w-[30ch]">
              Seven pieces, made from shirts you already own.
            </p>
          </Reveal>
          <Reveal delay={90}>
            <Link to="/shop" className="btn btn--accent mt-6 w-fit">
              See the collection
            </Link>
          </Reveal>
        </section>
      </div>

      {/* ------------------- the fixed half ------------------- */}
      <Stage
        active={active}
        caption={
          <>
            <span className="meta">{BRAND.address}</span>
            <span className="meta">Weer is Dutch for again</span>
          </>
        }
      >
        {active === "hero" || active === "closing" ? (
          <div className="flex h-full flex-col">
            <div className="flex min-h-0 flex-1 items-center justify-center p-6 pb-2">
              <Garment
                kind={batch.product.kind}
                colours={batch.hexes}
                print={batch.product.print}
                className="h-full max-h-[34rem] w-auto"
              />
            </div>
            {active === "hero" && (
              <BatchBuilder current={dye} onPick={setDye} />
            )}
          </div>
        ) : active === "process" ? (
          <Photo
            src={PHOTOS.mill.src}
            w={PHOTOS.mill.w}
            h={PHOTOS.mill.h}
            alt={PHOTOS.mill.alt}
            className="h-full w-full"
            eager
          />
        ) : active === "collection" ? (
          <Photo
            src={PHOTOS.cones.src}
            w={PHOTOS.cones.w}
            h={PHOTOS.cones.h}
            alt={PHOTOS.cones.alt}
            className="h-full w-full"
          />
        ) : active === "numbers" ? (
          <Photo
            src={PHOTOS.harbour.src}
            w={PHOTOS.harbour.w}
            h={PHOTOS.harbour.h}
            alt={PHOTOS.harbour.alt}
            className="h-full w-full"
          />
        ) : (
          <Photo
            src={PHOTOS.girl.src}
            w={PHOTOS.girl.w}
            h={PHOTOS.girl.h}
            alt={PHOTOS.girl.alt}
            className="h-full w-full"
          />
        )}
      </Stage>
    </div>
  );
}
