import { Link } from "react-router-dom";
import { Photo } from "../components/Photo";
import { Reveal } from "../components/Reveal";
import { Stage, useActiveSection } from "../components/Stage";
import {
  BRAND,
  FIGURES,
  LETTER,
  MILESTONES,
  PHOTOS,
  REFUSALS,
} from "../data/site";

const SECTIONS = [
  "hero",
  "letter",
  "how",
  "refusals",
  "figures",
  "closing",
];

export function About() {
  const active = useActiveSection(SECTIONS);

  return (
    <div className="split">
      <div>
        {/* ---------------------- hero ---------------------- */}
        <section id="hero" className="read">
          <h1 className="t-display">Nobody wanted them.</h1>
          <Reveal delay={90}>
            <p className="t-lead body-copy mt-7">
              WEER started in 2021 in a warehouse on Keileweg, with a rented
              shredder and a stack of t-shirts that nobody had bought.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link to="/shop" className="btn btn--accent">
                See the collection
              </Link>
              <a href="#letter" className="link-line t-small font-semibold">
                Read the founder's letter
              </a>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <p className="body-copy mt-5 text-ink-2">
              There are seven of us now, a spinning room, and one rule: we do
              not buy new fibre. Everything in this building arrived as a shirt
              somebody already owned. This page is the whole story, including
              the parts that took longer than we wanted.
            </p>
          </Reveal>
        </section>

        {/* --------------------- the letter --------------------- */}
        <section id="letter" className="field-dark read bleed">
          <Reveal>
            <div className="sheet mx-auto max-w-[40rem] bg-paper px-7 py-10 text-ink md:px-11 md:py-14">
              <div className="flex items-center gap-4">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-full t-small font-bold"
                  style={{ background: "#c9821a" }}
                  aria-hidden="true"
                >
                  JM
                </span>
                <div>
                  <p className="t-small font-semibold">
                    {LETTER.signatory}
                  </p>
                  <p className="meta text-ink-2">{LETTER.role}, WEER</p>
                </div>
              </div>

              <div className="mt-8 space-y-5">
                {LETTER.paragraphs.map((p) => (
                  <p
                    key={p.slice(0, 24)}
                    className="max-w-[52ch] t-body leading-[1.6]"
                  >
                    {p}
                  </p>
                ))}
              </div>

              <p className="mt-9 t-lead leading-snug italic">
                {LETTER.signatory}
                <span className="meta mt-1 block not-italic text-ink-2">
                  {LETTER.role}
                </span>
              </p>
            </div>
            <div className="tear-line mx-auto max-w-[40rem]" aria-hidden="true" />
            <div className="mx-auto max-w-[40rem]">
              <a
                href={`mailto:${BRAND.email}`}
                className="flex h-[4.5rem] items-center justify-between gap-4 bg-paper px-7 text-ink md:px-11"
              >
                <span className="t-small font-semibold">
                  {BRAND.email}
                </span>
                <span className="meta text-ink-2">Write to us</span>
              </a>
            </div>
          </Reveal>
        </section>

        {/* --------------------- the history --------------------- */}
        <section id="how" className="read">
          <Reveal>
            <h2 className="head">How we got here</h2>
          </Reveal>
          <Reveal delay={80}>
            <ol className="mt-8">
              {MILESTONES.map((m) => (
                <li
                  key={m.year}
                  className="flex flex-col gap-1 pb-7 sm:flex-row sm:gap-8"
                >
                  <span className="num w-16 shrink-0 t-body font-bold tracking-[-0.02em]">
                    {m.year}
                  </span>
                  <span className="max-w-[46ch] t-body leading-snug text-ink-2">
                    {m.text}
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={140}>
            <figure>
              <div className="photo drift aspect-[16/9]">
                <img
                  src={PHOTOS.spinning.src}
                  width={PHOTOS.spinning.w}
                  height={PHOTOS.spinning.h}
                  alt={PHOTOS.spinning.alt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <figcaption className="mt-2 t-small text-ink-2">
                {PHOTOS.spinning.caption} {PHOTOS.spinning.credit}.
              </figcaption>
            </figure>
          </Reveal>
        </section>

        {/* -------------------- what we refuse -------------------- */}
        <section id="refusals" className="read">
          <Reveal>
            <h2 className="head max-w-[18ch]">What we do not do</h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="body-copy mt-5">
              Most of what gets sold as sustainable is a claim with a leaf on
              it. These are the four we keep turning down.
            </p>
          </Reveal>

          <dl className="mt-9">
            {REFUSALS.map((r, i) => (
              <Reveal key={r.title} delay={i * 70}>
                <div className="pb-7">
                  <dt className="t-body font-semibold tracking-[-0.015em]">
                    {r.title}
                  </dt>
                  <dd className="mt-2 max-w-[52ch] t-body leading-snug text-ink-2">
                    {r.text}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>

          <Reveal delay={160}>
            <figure className="mt-8">
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
              <figcaption className="mt-2 t-small text-ink-2">
                A ring mill engine at work, Ellenroad, Greater Manchester, 2023.
                Ridiculopathy, CC0, via Wikimedia Commons.
              </figcaption>
            </figure>
          </Reveal>
        </section>

        {/* ---------------------- the numbers ---------------------- */}
        <section id="figures" className="read">
          <Reveal>
            <h2 className="head">Our own numbers</h2>
          </Reveal>
          <Reveal delay={80}>
            <dl className="mt-8 grid grid-cols-1 gap-x-10 sm:grid-cols-2">
              {FIGURES.map((f) => (
                <div
                  key={f.figure}
                  className="pb-5"
                >
                  <dt className="num t-head leading-none font-extrabold tracking-[-0.04em]">
                    {f.figure}
                  </dt>
                  <dd className="mt-2 max-w-[32ch] t-small leading-snug text-ink-2">
                    {f.caption}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={130}>
            <p className="t-body mt-6 max-w-[52ch] text-ink-2">
              Counted from our own records: the shirts that came through the
              door, the kilos on the scale, the days on the calendar. We
              publish the method with the number if you ask for it.
            </p>
          </Reveal>
        </section>

        {/* ----------------------- the close ----------------------- */}
        <section
          id="closing"
          className="read flex min-h-[52svh] flex-col justify-center"
        >
          <Reveal>
            <p className="lead max-w-[30ch]">
              Seven pieces, made from shirts you already own.
            </p>
          </Reveal>
          <Reveal delay={90}>
            <Link to="/shop" className="btn btn--accent mt-6 w-fit">
              See the collection
            </Link>
          </Reveal>
          <Reveal delay={140}>
            <p className="meta mt-9 max-w-[46ch] text-ink-2">
              One note outside the story: WEER is not a real company. Every
              name, figure and address on this site is invented, and the site
              was written and built by AI. The source is on{" "}
              <a
                className="link-line"
                href="https://github.com/anik-amd/weer"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              .
            </p>
          </Reveal>
        </section>
      </div>

      {/* --------------------- the fixed half --------------------- */}
      <Stage
        active={active}
        caption={
          <>
            <span className="meta">{BRAND.address}</span>
            <span className="meta">Founded {BRAND.founded}</span>
          </>
        }
      >
        {active === "hero" || active === "closing" ? (
          <Photo
            src={PHOTOS.shoddy.src}
            w={PHOTOS.shoddy.w}
            h={PHOTOS.shoddy.h}
            alt={PHOTOS.shoddy.alt}
            className="h-full w-full"
            eager
          />
        ) : active === "letter" ? (
          <Photo
            src={PHOTOS.girl.src}
            w={PHOTOS.girl.w}
            h={PHOTOS.girl.h}
            alt={PHOTOS.girl.alt}
            className="h-full w-full"
          />
        ) : active === "how" ? (
          <Photo
            src={PHOTOS.mill.src}
            w={PHOTOS.mill.w}
            h={PHOTOS.mill.h}
            alt={PHOTOS.mill.alt}
            className="h-full w-full"
          />
        ) : active === "refusals" ? (
          <Photo
            src={PHOTOS.spinning.src}
            w={PHOTOS.spinning.w}
            h={PHOTOS.spinning.h}
            alt={PHOTOS.spinning.alt}
            className="h-full w-full"
          />
        ) : (
          <Photo
            src={PHOTOS.cones.src}
            w={PHOTOS.cones.w}
            h={PHOTOS.cones.h}
            alt={PHOTOS.cones.alt}
            className="h-full w-full"
          />
        )}
      </Stage>
    </div>
  );
}
