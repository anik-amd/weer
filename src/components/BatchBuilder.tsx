import { DYE_BATCHES, describeBatch } from "../data/products";

/**
 * One row of buttons, one job. Each button is a dye batch from the
 * catalogue: pick it and the shirt is re-spun in front of you.
 */
export function BatchBuilder({
  current,
  onPick,
}: {
  current: string;
  onPick: (key: string) => void;
}) {
  const active = DYE_BATCHES.find((b) => b.colourway === current) ?? DYE_BATCHES[0];

  return (
    <div className="bg-panel px-5 py-5">
      <p className="t-body font-semibold tracking-[-0.01em]">
        Pick a dye batch
        <span className="mt-0.5 block font-normal text-ink-2">
          Body in {active.name}. Four shirts: {describeBatch(active.ids)}.
        </span>
      </p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {DYE_BATCHES.map((b) => {
          const on = b.colourway === current;
          return (
            <button
              key={b.colourway}
              type="button"
              onClick={() => onPick(b.colourway)}
              aria-pressed={on}
              className={`flex items-center gap-2 border px-3 py-2.5 t-small transition-colors duration-150 ${
                on
                  ? "border-solid bg-solid text-solid-ink"
                  : "border-line text-ink hover:border-solid"
              }`}
            >
              <span
                className="h-3.5 w-3.5 shrink-0 rounded-full"
                style={{
                  background: b.hex,
                  boxShadow: "inset 0 0 0 1px rgb(20 32 28 / 0.3)",
                }}
              />
              {b.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
