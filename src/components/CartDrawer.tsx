import { useEffect } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCart } from "../lib/cart";
import { COLORWAYS, batchHexes, euro } from "../data/products";
import { Garment } from "./Garment";

export function CartDrawer() {
  const { open, closeCart, lines, subtotal, setQty, remove, productOf } = useCart();
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, closeCart]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50">
          <motion.button
            type="button"
            aria-label="Close the bag"
            onClick={closeCart}
            className="absolute inset-0 h-full w-full cursor-default bg-scrim/45"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Your bag"
            className="absolute inset-y-0 right-0 flex w-full max-w-[30rem] flex-col bg-panel"
            initial={reduce ? { opacity: 0 } : { x: "100%" }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: "100%" }}
            transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between px-6 py-5">
              <h2 className="t-lead font-bold tracking-[-0.02em]">Your bag</h2>
              <button
                type="button"
                onClick={closeCart}
                className="link-line t-small"
              >
                Close
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col justify-center px-6 pb-16">
                <p className="lead max-w-[22ch]">
                  Nothing in the bag yet. Six shapes, and every one of them made
                  from four shirts you already owned.
                </p>
                <Link to="/shop" onClick={closeCart} className="btn mt-6 w-fit">
                  See the collection
                </Link>
              </div>
            ) : (
              <ul className="flex-1 overflow-y-auto px-6">
                {lines.map((line) => {
                  const product = productOf(line);
                  if (!product) return null;
                  const cw = COLORWAYS[line.colourway];
                  return (
                    <li
                      key={line.key}
                      className="flex gap-4 pb-7"
                    >
                      <Link
                        to={`/shop/${product.id}`}
                        onClick={closeCart}
                        className="tile-art w-20 shrink-0"
                        style={{ aspectRatio: "4/5" }}
                      >
                        <Garment
                          kind={product.kind}
                          colours={batchHexes(product, line.colourway)}
                          print={product.print}
                          className="h-full w-full p-1.5"
                        />
                      </Link>

                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-3">
                          <Link
                            to={`/shop/${product.id}`}
                            onClick={closeCart}
                            className="font-semibold tracking-[-0.01em] hover:underline"
                          >
                            {product.name}
                          </Link>
                          <span className="num shrink-0 font-semibold">
                            {euro(product.price * line.qty)}
                          </span>
                        </div>
                        <p className="meta mt-0.5 text-ink-2">
                          {cw?.name ?? line.colourway} · {line.size}
                        </p>
                        <div className="mt-auto flex items-center justify-between pt-3">
                          <div className="flex items-center border border-line">
                            <button
                              type="button"
                              className="px-3 py-1.5 leading-none hover:bg-ground-2"
                              aria-label={`Fewer ${product.name}`}
                              onClick={() => setQty(line.key, line.qty - 1)}
                            >
                              −
                            </button>
                            <span className="num w-8 text-center t-small">
                              {line.qty}
                            </span>
                            <button
                              type="button"
                              className="px-3 py-1.5 leading-none hover:bg-ground-2"
                              aria-label={`More ${product.name}`}
                              onClick={() => setQty(line.key, line.qty + 1)}
                            >
                              +
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => remove(line.key)}
                            className="meta text-ink-2 link-line"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}

            {lines.length > 0 && (
              <div className="bg-panel-2 px-6 py-5">
                <div className="flex items-baseline justify-between">
                  <span className="t-small font-semibold">Subtotal</span>
                  <span className="num t-lead font-bold">
                    {euro(subtotal)}
                  </span>
                </div>
                <p className="meta mt-1 text-ink-2">
                  Shipping is calculated at checkout. Free over 75 euro.
                </p>
                <Link to="/checkout" onClick={closeCart} className="btn btn--block mt-4">
                  Continue to your order
                </Link>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
