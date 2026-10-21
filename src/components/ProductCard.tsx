import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { COLORWAYS, batchHexes, euro, type Product } from "../data/products";
import { Garment } from "./Garment";

export function ProductCard({
  product,
  colourway,
  onColour,
  className = "",
}: {
  product: Product;
  colourway?: string;
  onColour?: (id: string) => void;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const active = colourway ?? product.colourways[0];
  const batch = batchHexes(product, active);
  const swatchHexes = new Set(batch.map((h) => h.toLowerCase()));

  const rise = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 26 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.15 },
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
      };

  const art = reduce
    ? {}
    : {
        initial: { opacity: 0, scale: 0.965 },
        whileInView: { opacity: 1, scale: 1 },
        viewport: { once: true, amount: 0.3 },
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
      };

  return (
    <motion.article className={className} {...rise}>
      <Link
        to={`/shop/${product.id}`}
        className="block"
        aria-label={`${product.name}, ${euro(product.price)}`}
      >
        <motion.div className="tile-art" {...art}>
          <Garment
            kind={product.kind}
            colours={batch}
            print={product.print}
            className="h-full w-full p-4"
          />
        </motion.div>
      </Link>

      <div className="mt-3 flex items-baseline justify-between gap-3">
        <h3 className="t-body font-semibold tracking-[-0.015em]">
          <Link to={`/shop/${product.id}`} className="hover:underline">
            {product.name}
          </Link>
        </h3>
        <p className="num t-body font-semibold">{euro(product.price)}</p>
      </div>

      <p className="t-body mt-1 text-ink-2">
        {product.fit} · {product.gsm} gsm
      </p>

      <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
        {product.colourways.map((id) => {
          const cw = COLORWAYS[id];
          const isActive = id === active;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onColour?.(id)}
              aria-label={cw.name}
              aria-pressed={isActive}
              title={cw.name}
              className="h-4 w-4 rounded-full border-0 transition-transform duration-150 hover:scale-125"
              style={{
                background: cw.hex,
                boxShadow: isActive
                  ? "inset 0 0 0 1px rgb(20 32 28 / 0.25), 0 0 0 2px var(--color-ground), 0 0 0 3px var(--color-ink)"
                  : "inset 0 0 0 1px rgb(20 32 28 / 0.2)",
              }}
            />
          );
        })}
      </div>
      <p className="meta mt-1.5 text-ink-2">
        {COLORWAYS[active]?.name} · {swatchHexes.size === 1 ? "solid" : "marled"}
      </p>
    </motion.article>
  );
}
