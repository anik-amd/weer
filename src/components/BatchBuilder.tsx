import { useState } from "react";
import { COLORWAYS } from "../data/products";

const PALETTE = [
  "bone",
  "chalk",
  "clay",
  "ink",
  "sea",
  "moss",
  "ochre",
  "sky",
  "stone",
  "cobalt",
  "forest",
];

const SLOTS = 4;

export function BatchBuilder({
  batch,
  onChange,
}: {
  batch: string[];
  onChange: (next: string[]) => void;
}) {
  const [slot, setSlot] = useState(0);

  const set = (colour: string) => {
    const next = [...batch];
    next[slot] = colour;
    onChange(next);
    setSlot((s) => (s + 1) % SLOTS);
  };

  const shuffle = () => {
    const pool = [...PALETTE];
    const next: string[] = [];
    for (let i = 0; i < SLOTS; i += 1) {
      next.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
    }
    onChange(next);
  };

  const distinct = new Set(batch).size;
  const marled = distinct > 1;

  return (
    <div className="bg-paper px-5 py-5">
      <div className="flex items-baseline justify-between gap-4">
        <p className="t-small leading-snug font-semibold tracking-[-0.01em]">
          Build a batch of four
        </p>
        <button
          type="button"
          onClick={shuffle}
          className="meta link-line text-ink-2"
        >
          Shuffle
        </button>
      </div>

      <div className="mt-3 flex items-center gap-2" role="group" aria-label="Dye batch">
        {batch.map((id, i) => {
          const cw = COLORWAYS[id];
          return (
            <button
              key={i}
              type="button"
              onClick={() => setSlot(i)}
              aria-label={`Batch slot ${i + 1}: ${cw?.name ?? id}`}
              aria-pressed={slot === i}
              className="h-9 w-9 shrink-0 rounded-full border-0 transition-transform duration-150 hover:scale-110"
              style={{
                background: cw?.hex ?? "#e2dac5",
                boxShadow:
                  slot === i
                    ? "inset 0 0 0 1px rgb(20 32 28 / 0.25), 0 0 0 2px var(--color-paper), 0 0 0 4px var(--color-ink)"
                    : "inset 0 0 0 1px rgb(20 32 28 / 0.2)",
              }}
            />
          );
        })}
      </div>

      <div className="mt-3">
        <p className="meta text-ink-2">
          {marled
            ? `Marled, from ${distinct} dye batches.`
            : "Solid. Four shirts of the same dye."}
        </p>
        <p className="meta text-ink-2">
          {marled
            ? "The first slot sets the body, the rest become the fleck."
            : "Spun into one body, the older cotton still in there."}
        </p>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {PALETTE.map((id) => {
          const cw = COLORWAYS[id];
          return (
            <button
              key={id}
              type="button"
              onClick={() => set(id)}
              aria-label={`Use ${cw.name}`}
              title={cw.name}
              className="h-7 w-7 rounded-full border-0 transition-transform duration-150 hover:scale-110"
              style={{
                background: cw.hex,
                boxShadow: "inset 0 0 0 1px rgb(20 32 28 / 0.2)",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
