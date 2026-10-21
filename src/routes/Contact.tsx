import { useState } from "react";
import { Link } from "react-router-dom";
import { Photo } from "../components/Photo";
import { Reveal } from "../components/Reveal";
import { Stage, useActiveSection } from "../components/Stage";
import { BRAND, CHANNELS, FAQ, PHOTOS, STOCKISTS } from "../data/site";

const SECTIONS = ["hero", "channels", "form", "visit", "faq", "closing"];

export function Contact() {
  const active = useActiveSection(SECTIONS);
  const [sent, setSent] = useState(false);

  return (
    <div className="split">
      <div>
        {/* ---------------------- hero ---------------------- */}
        <section id="hero" className="read">
          <h1 className="t-display">Write to us, or come by.</h1>
          <Reveal delay={90}>
            <p className="t-lead body-copy mt-7">
              We answer everything within two working days, and we answer it
              ourselves.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a href="#form" className="btn btn--accent">
                Send us a note
              </a>
              <a href="#visit" className="link-line t-small font-semibold">
                Find the studio
              </a>
            </div>
          </Reveal>
        </section>

        {/* --------------------- channels --------------------- */}
        <section id="channels" className="read">
          <Reveal>
            <h2 className="head">Where to write</h2>
          </Reveal>
          <dl className="mt-8">
            {CHANNELS.map((c, i) => (
              <Reveal key={c.label} delay={i * 60}>
                <div className="pb-7">
                  <dt className="t-body font-semibold tracking-[-0.015em]">
                    {c.label}
                  </dt>
                  <dd className="mt-1.5">
                    <a
                      href={`mailto:${c.value}`}
                      className="link-line t-body"
                    >
                      {c.value}
                    </a>
                    <span className="mt-1 block max-w-[46ch] t-body leading-snug text-ink-2">
                      {c.note}
                    </span>
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </section>

        {/* ----------------------- the form ----------------------- */}
        <section id="form" className="read">
          <Reveal>
            <h2 className="head">Send us a note</h2>
          </Reveal>

          {sent ? (
            <Reveal>
              <div className="mt-8 max-w-[46ch]">
                <p className="lead">
                  Your email client is open with the message ready to send. If
                  nothing happened, write to {BRAND.email} directly.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="btn btn--ghost mt-6"
                >
                  Write another
                </button>
              </div>
            </Reveal>
          ) : (
            <Reveal delay={80}>
              <form
                className="mt-8 max-w-[34rem]"
                onSubmit={(e) => {
                  e.preventDefault();
                  const data = new FormData(e.currentTarget);
                  const name = String(data.get("name") ?? "");
                  const email = String(data.get("email") ?? "");
                  const subject = String(data.get("subject") ?? "");
                  const message = String(data.get("message") ?? "");
                  const body = `${message}\n\n—\n${name}\n${email}`;
                  window.location.href = `mailto:${BRAND.email}?subject=${encodeURIComponent(
                    `[${subject}] ${name}`,
                  )}&body=${encodeURIComponent(body)}`;
                  setSent(true);
                }}
              >
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <label className="block">
                    <span className="meta text-ink-2">Your name</span>
                    <input
                      name="name"
                      required
                      autoComplete="name"
                      className="field mt-1"
                      placeholder="Sam de Vries"
                    />
                  </label>
                  <label className="block">
                    <span className="meta text-ink-2">Your email</span>
                    <input
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className="field mt-1"
                      placeholder="sam@example.com"
                    />
                  </label>
                </div>

                <label className="mt-6 block">
                  <span className="meta text-ink-2">What is it about</span>
                  <select name="subject" className="field mt-1" defaultValue="An order">
                    {[
                      "An order",
                      "A size question",
                      "Take-back and the loop",
                      "Wholesale and stockists",
                      "Press and samples",
                      "Something else",
                    ].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </label>

                <label className="mt-6 block">
                  <span className="meta text-ink-2">Your message</span>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    className="field mt-1 resize-y"
                    placeholder="Tell us what you need."
                  />
                </label>

                <button type="submit" className="btn btn--accent mt-7">
                  Open this in your email
                </button>
                <p className="t-body mt-3 max-w-[42ch] text-ink-2">
                  This site has no server behind it, so the form hands your
                  message to your own email client. Nothing is stored here.
                </p>
              </form>
            </Reveal>
          )}

          <Reveal delay={140}>
            <figure className="mt-10">
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
                  poster="/photos/looms-poster.jpg"
                  aria-label="A room of steam powered looms at the Queen Street Mill, Burnley"
                >
                  <source src="/photos/looms.webm" type="video/webm" />
                </video>
              </div>
              <figcaption className="mt-2 t-small text-ink-2">
                A room of steam powered looms, Queen Street Mill, Burnley, 2013.
                Victuallers, CC BY-SA 3.0, via Wikimedia Commons.
              </figcaption>
            </figure>
          </Reveal>
        </section>

        {/* ----------------------- visiting ----------------------- */}
        <section id="visit" className="read">
          <Reveal>
            <h2 className="head">Coming to the table</h2>
          </Reveal>
          <Reveal delay={80}>
            <dl className="mt-7">
              {[
                { k: "Address", v: `${BRAND.address}, ${BRAND.addressLine2}` },
                { k: "Open", v: BRAND.hours },
                { k: "Getting here", v: BRAND.travel },
                { k: "Telephone", v: BRAND.phone },
              ].map((row) => (
                <div
                  key={row.k}
                  className="flex flex-col gap-1 pb-7 sm:flex-row sm:gap-8"
                >
                  <dt className="meta w-36 shrink-0 pt-1 text-ink-2">{row.k}</dt>
                  <dd className="max-w-[40ch] t-body leading-snug">
                    {row.v}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={130}>
            <p className="body-copy mt-6 text-ink-2">
              On a Thursday you can watch the sorting table work. Bring the
              shirts in a bag and we will weigh them and tell you what they
              are worth against your next order.
            </p>
          </Reveal>

          <Reveal delay={170}>
            <figure className="mt-8">
              <div className="photo drift aspect-[16/9]">
                <img
                  src={PHOTOS.harbour.src}
                  width={PHOTOS.harbour.w}
                  height={PHOTOS.harbour.h}
                  alt={PHOTOS.harbour.alt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <figcaption className="mt-2 t-small text-ink-2">
                {PHOTOS.harbour.caption} {PHOTOS.harbour.credit}.
              </figcaption>
            </figure>
          </Reveal>
        </section>

        {/* ----------------------- stockists ----------------------- */}
        <section className="read pt-0">
          <Reveal>
            <h2 className="head">Or find us in person</h2>
            <ul className="mt-6 columns-1 gap-8 sm:columns-2 [&>*]:break-inside-avoid">
              {STOCKISTS.map((s) => (
                <li
                  key={s.name}
                  className="t-body leading-[1.55] pb-4"
                >
                  {s.name}
                  <span className="text-ink-2"> — {s.place}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* ------------------------ the faq ------------------------ */}
        <section id="faq" className="read">
          <Reveal>
            <h2 className="head">Asked often</h2>
          </Reveal>
          <Reveal delay={80}>
            <div className="qa mt-6 max-w-[48ch]">
              {FAQ.map((f) => (
                <details key={f.q} className="pb-1">
                  <summary>
                    <span className="qa-q t-body font-semibold tracking-[-0.015em]">
                      {f.q}
                    </span>
                    <svg
                      width="14"
                      height="9"
                      viewBox="0 0 14 9"
                      aria-hidden="true"
                      className="mt-2 shrink-0"
                    >
                      <path
                        d="M1 1l6 6 6-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                    </svg>
                  </summary>
                  <p className="qa-a t-body">{f.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ----------------------- the close ----------------------- */}
        <section
          id="closing"
          className="read flex min-h-[52svh] flex-col justify-center"
        >
          <Reveal>
            <p className="lead max-w-[30ch]">
              Two working days, and a real answer from a person.
            </p>
          </Reveal>
          <Reveal delay={90}>
            <Link to="/shop" className="btn btn--accent mt-6 w-fit">
              See the collection
            </Link>
          </Reveal>
        </section>
      </div>

      {/* --------------------- the fixed half --------------------- */}
      <Stage
        active={active}
        caption={
          <>
            <span className="meta">{BRAND.address}</span>
            <span className="meta">{BRAND.hours}</span>
          </>
        }
      >
        {active === "hero" || active === "closing" ? (
          <Photo
            src={PHOTOS.port.src}
            w={PHOTOS.port.w}
            h={PHOTOS.port.h}
            alt={PHOTOS.port.alt}
            className="h-full w-full"
            eager
          />
        ) : active === "faq" ? (
          <Photo
            src={PHOTOS.girl.src}
            w={PHOTOS.girl.w}
            h={PHOTOS.girl.h}
            alt={PHOTOS.girl.alt}
            className="h-full w-full"
          />
        ) : active === "visit" ? (
          <Photo
            src={PHOTOS.harbour.src}
            w={PHOTOS.harbour.w}
            h={PHOTOS.harbour.h}
            alt={PHOTOS.harbour.alt}
            className="h-full w-full"
          />
        ) : (
          <Photo
            src={PHOTOS.cotton.src}
            w={PHOTOS.cotton.w}
            h={PHOTOS.cotton.h}
            alt={PHOTOS.cotton.alt}
            className="h-full w-full"
          />
        )}
      </Stage>
    </div>
  );
}
