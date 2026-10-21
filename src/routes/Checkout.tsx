import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Garment } from "../components/Garment";
import { Photo } from "../components/Photo";
import { Reveal } from "../components/Reveal";
import { useCart } from "../lib/cart";
import { COLORWAYS, euro } from "../data/products";
import { BRAND, PHOTOS } from "../data/site";

const STEPS = [
  {
    p: PHOTOS.shoddy,
    title: "The shirts are collected",
    text: "Six drop points in Rotterdam, and a box you can post us.",
  },
  {
    video: "/photos/looms.webm",
    poster: "/photos/looms-poster.jpg",
    credit: "A room of steam powered looms, Burnley, 2013. Victuallers, CC BY-SA 3.0.",
    title: "The cloth is woven",
    text: "Yarn becomes jersey on machines that have been running since the 1800s.",
  },
  {
    p: PHOTOS.cones,
    title: "The fibre is spun",
    text: "Shredded, carded and spun into a yarn lot we can trace.",
  },
  {
    p: PHOTOS.spinning,
    title: "The jersey is knitted",
    text: "Twenty-four gauge machines in Barcelos, then the sewing table.",
  },
];

export function Checkout() {
  const { lines, subtotal, productOf, setQty, remove, clear } = useCart();
  const shipping = subtotal >= 75 ? 0 : 6;
  const total = subtotal + shipping;

  return (
    <div className="frame mx-auto max-w-[70rem] py-10 md:py-16">
      {lines.length === 0 ? (
        <header>
          <motion.h1
            className="t-display"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Your order
          </motion.h1>
          <motion.p
            className="t-lead body-copy mt-6"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            Your bag is empty, so there is nothing to check out yet. The seven
            pieces are waiting on the other side.
          </motion.p>
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link to="/shop" className="btn btn--accent">
              See the collection
            </Link>
          </motion.div>
        </header>
      ) : (
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div>
            <h1 className="t-display">Your order</h1>
            <Reveal delay={80}>
              <p className="body-copy mt-6 text-ink-2">
                Check the pieces, leave us an address, and we will send a
                payment link by email. Nothing is charged on this site.
              </p>
            </Reveal>

            <Reveal delay={110}>
              <ul className="mt-10">
                {lines.map((line) => {
                  const product = productOf(line);
                  if (!product) return null;
                  const cw = COLORWAYS[line.colourway];
                  return (
                    <li
                      key={line.key}
                      className="flex gap-5 pb-7"
                    >
                      <div className="tile-art w-24 shrink-0">
                        <Garment
                          kind={product.kind}
                          colours={product.batch.map(
                            (b) => COLORWAYS[b]?.hex ?? "#e2dac5",
                          )}
                          print={product.print}
                          className="h-full w-full p-1.5"
                        />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="t-lead font-semibold tracking-[-0.015em]">
                              {product.name}
                            </p>
                            <p className="meta mt-0.5 text-ink-2">
                              {cw?.name} · {line.size}
                            </p>
                          </div>
                          <p className="num shrink-0 font-semibold">
                            {euro(product.price * line.qty)}
                          </p>
                        </div>
                        <div className="mt-auto flex items-center gap-4 pt-4">
                          <div className="flex items-center border border-paper-4">
                            <button
                              type="button"
                              className="px-3 py-1.5 leading-none hover:bg-paper-2"
                              aria-label={`Fewer ${product.name}`}
                              onClick={() => setQty(line.key, line.qty - 1)}
                            >
                              −
                            </button>
                            <span className="num w-8 text-center t-body">
                              {line.qty}
                            </span>
                            <button
                              type="button"
                              className="px-3 py-1.5 leading-none hover:bg-paper-2"
                              aria-label={`More ${product.name}`}
                              onClick={() => setQty(line.key, line.qty + 1)}
                            >
                              +
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => remove(line.key)}
                            className="meta link-line text-ink-2"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Reveal>

            <Reveal delay={140}>
              <form
                className="mt-10 max-w-[36rem]"
                onSubmit={(e) => {
                  e.preventDefault();
                  const data = new FormData(e.currentTarget);
                  const name = String(data.get("name") ?? "");
                  const email = String(data.get("email") ?? "");
                  const address = String(data.get("address") ?? "");
                  const city = String(data.get("city") ?? "");
                  const post = String(data.get("post") ?? "");
                  const country = String(data.get("country") ?? "");
                  const order = lines
                    .map((l) => {
                      const p = productOf(l);
                      return `${l.qty} x ${p?.name ?? l.productId} (${COLORWAYS[l.colourway]?.name}, ${l.size})`;
                    })
                    .join("\n");
                  const body = [
                    `Name: ${name}`,
                    `Email: ${email}`,
                    `Address: ${address}, ${post} ${city}, ${country}`,
                    "",
                    "Order:",
                    order,
                    "",
                    `Subtotal: ${euro(subtotal)}`,
                    `Shipping: ${shipping === 0 ? "Free" : euro(shipping)}`,
                    `Total: ${euro(total)}`,
                  ].join("\n");
                  window.location.href = `mailto:${BRAND.email}?subject=${encodeURIComponent(
                    `Order from ${name}`,
                  )}&body=${encodeURIComponent(body)}`;
                }}
              >
                <h2 className="head t-head">Where it goes</h2>
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <label className="block">
                    <span className="meta text-ink-2">Name</span>
                    <input name="name" required className="field mt-1" />
                  </label>
                  <label className="block">
                    <span className="meta text-ink-2">Email</span>
                    <input
                      name="email"
                      type="email"
                      required
                      className="field mt-1"
                    />
                  </label>
                </div>
                <label className="mt-6 block">
                  <span className="meta text-ink-2">Street and number</span>
                  <input name="address" required className="field mt-1" />
                </label>
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
                  <label className="block">
                    <span className="meta text-ink-2">Postcode</span>
                    <input name="post" required className="field mt-1" />
                  </label>
                  <label className="block">
                    <span className="meta text-ink-2">City</span>
                    <input name="city" required className="field mt-1" />
                  </label>
                  <label className="block">
                    <span className="meta text-ink-2">Country</span>
                    <input
                      name="country"
                      required
                      defaultValue="Netherlands"
                      className="field mt-1"
                    />
                  </label>
                </div>

                <button type="submit" className="btn btn--accent mt-8">
                  Send this order to us
                </button>
                <p className="t-body mt-3 max-w-[44ch] text-ink-2">
                  This site has no payment backend, so your order is handed to
                  your email client and we reply with a payment link. Nothing is
                  charged here.
                </p>
              </form>
            </Reveal>
          </div>

          {/* the summary */}
          <Reveal delay={160}>
            <aside className="field-dark h-fit p-6 lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
              <h2 className="t-lead font-semibold text-paper">Summary</h2>
              <dl className="mt-5 space-y-3">
                <div className="flex items-baseline justify-between">
                  <dt className="meta text-paper/70">Subtotal</dt>
                  <dd className="num t-body text-paper">{euro(subtotal)}</dd>
                </div>
                <div className="flex items-baseline justify-between">
                  <dt className="meta text-paper/70">Shipping</dt>
                  <dd className="num t-body text-paper">
                    {shipping === 0 ? "Free" : euro(shipping)}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between pt-3">
                  <dt className="t-lead font-semibold text-paper">Total</dt>
                  <dd className="num t-lead font-bold text-paper">
                    {euro(total)}
                  </dd>
                </div>
              </dl>
              <p className="t-body mt-5 text-paper/75">
                Free shipping over 75 euro. We ship within two working days and
                cover returns for thirty.
              </p>
              <button
                type="button"
                onClick={clear}
                className="meta mt-6 text-paper/70 link-line"
              >
                Empty the bag
              </button>
            </aside>
          </Reveal>
        </div>
      )}

      {/* ------------------- what happens next ------------------- */}
      <section className="mt-20 pb-12">
        <motion.h2
          className="head t-head max-w-[20ch]"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          What happens next
        </motion.h2>
        <motion.p
          className="body-copy mt-5"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          Nothing is charged on this site. We read your order, send a payment
          link, and then the shirt starts its nineteen days.
        </motion.p>

        <div className="mt-9 grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {STEPS.map((step, i) => (
            <motion.figure
              key={step.title}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                {step.video ? (
                  <div className="photo aspect-[4/3]">
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
                      poster={step.poster}
                      aria-label="A room of steam powered looms at the Queen Street Mill, Burnley"
                    >
                      <source src={step.video} type="video/webm" />
                    </video>
                  </div>
                ) : (
                  <Photo
                    src={step.p!.src}
                    w={step.p!.w}
                    h={step.p!.h}
                    alt={step.p!.alt}
                    className={`aspect-[4/3] ${i === 0 ? "drift" : ""}`}
                  />
                )}
              </motion.div>
              <figcaption className="mt-3">
                <span className="block t-body font-semibold tracking-[-0.01em]">
                  {step.title}
                </span>
                <span className="mt-1 block t-body leading-snug text-ink-2">
                  {step.text}
                </span>
                <span className="mt-2 block t-small text-ink-3">
                  {step.credit ?? step.p!.credit}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>
    </div>
  );
}
