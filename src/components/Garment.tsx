import { useId, useMemo } from "react";
import type { GarmentKind, PrintMark } from "../data/products";

type Props = {
  kind: GarmentKind;
  /** The one to four dye batches the garment was spun from. */
  colours: string[];
  print?: PrintMark;
  printColour?: string;
  className?: string;
};

const mulberry = (seed: number) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const toRgb = (hex: string) => {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
};

const toHex = (r: number, g: number, b: number) =>
  `#${[r, g, b]
    .map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0"))
    .join("")}`;

const mix = (a: string, b: string, t: number) => {
  const x = toRgb(a);
  const y = toRgb(b);
  return toHex(x.r * (1 - t) + y.r * t, x.g * (1 - t) + y.g * t, x.b * (1 - t) + y.b * t);
};

const luminance = (hex: string) => {
  const { r, g, b } = toRgb(hex);
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
};

/* ------------------------------------------------------------------ */
/*  Geometry                                                           */
/* ------------------------------------------------------------------ */

type Shape = { d: string; label: string };

const shapesFor = (kind: GarmentKind): Shape[] => {
  switch (kind) {
    case "cap":
      return [
        {
          label: "crown",
          d: "M 162 392 C 162 246 438 246 438 392 L 438 404 C 438 420 382 430 300 430 C 218 430 162 420 162 404 Z",
        },
        {
          label: "brim",
          d: "M 158 398 C 198 432 402 432 442 398 C 462 388 474 400 464 418 C 420 464 180 464 136 418 C 126 400 140 388 158 398 Z",
        },
      ];

    case "raglan":
    case "rugby":
      return [
        {
          label: "body",
          d: "M 258 58 C 258 58 262 100 300 100 C 338 100 342 58 342 58 L 435 96 L 435 772 C 435 780 429 784 421 784 L 179 784 C 171 784 165 780 165 772 L 165 96 Z",
        },
        {
          label: "sleeve-r",
          d: "M 435 96 C 478 106 502 126 514 154 L 546 552 C 550 574 537 592 516 596 L 462 602 L 437 288 Z",
        },
        {
          label: "sleeve-l",
          d: "M 165 96 C 122 106 98 126 86 154 L 54 552 C 50 574 63 592 84 596 L 138 602 L 163 288 Z",
        },
      ];

    case "crop":
      return [
        {
          label: "body",
          d: "M 254 58 C 254 58 258 100 300 100 C 342 100 346 58 346 58 L 440 102 L 440 452 C 440 460 434 464 426 464 L 174 464 C 166 464 160 460 160 452 L 160 102 Z",
        },
        {
          label: "sleeve-r",
          d: "M 440 102 C 482 112 506 130 518 156 L 544 232 C 549 244 544 255 532 259 L 441 284 Z",
        },
        {
          label: "sleeve-l",
          d: "M 160 102 C 118 112 94 130 82 156 L 56 232 C 51 244 56 255 68 259 L 159 284 Z",
        },
      ];

    default:
      return [
        {
          label: "body",
          d: "M 258 58 C 258 58 262 100 300 100 C 338 100 342 58 342 58 L 435 96 L 435 588 C 435 596 429 600 421 600 L 179 600 C 171 600 165 596 165 588 L 165 96 Z",
        },
        {
          label: "sleeve-r",
          d: "M 435 96 C 480 106 506 126 518 154 L 546 236 C 551 248 546 259 534 263 L 437 288 Z",
        },
        {
          label: "sleeve-l",
          d: "M 165 96 C 120 106 94 126 82 154 L 54 236 C 49 248 54 259 66 263 L 163 288 Z",
        },
      ];
  }
};

const NECKLINE = "M 258 58 C 258 58 262 100 300 100 C 338 100 342 58 342 58";
const COLLAR = "M 255 55 C 255 55 258 108 300 108 C 342 108 345 55 345 55";

/** A tight frame around whatever the garment actually occupies. */
const frameFor = (kind: GarmentKind) => {
  switch (kind) {
    case "cap":
      return { box: "0 230 600 270", shadowY: 496 };
    case "crop":
      return { box: "0 36 600 480", shadowY: 496 };
    case "raglan":
    case "rugby":
      return { box: "0 36 600 790", shadowY: 812 };
    default:
      return { box: "0 36 600 610", shadowY: 628 };
  }
};

/* ------------------------------------------------------------------ */

export function Garment({
  kind,
  colours,
  print = "none",
  printColour,
  className,
}: Props) {
  const uid = useId().replace(/:/g, "");
  const shapes = useMemo(() => shapesFor(kind), [kind]);

  const batch = colours.length ? colours : ["#e2dac5"];
  const distinct = new Set(batch.map((c) => c.toLowerCase()));

  // Base tone: the first dye batch, pulled a little toward the mean of the
  // batch so a four-colour batch reads as marl rather than stripes. Rugby is
  // two solid yarns, so it keeps its body colour.
  const mean = useMemo(() => {
    const acc = batch.map(toRgb);
    const n = acc.length;
    return toHex(
      acc.reduce((s, c) => s + c.r, 0) / n,
      acc.reduce((s, c) => s + c.g, 0) / n,
      acc.reduce((s, c) => s + c.b, 0) / n,
    );
  }, [batch.join(",")]);

  const base =
    kind === "rugby" ? batch[0] : mix(batch[0], mean, distinct.size > 1 ? 0.38 : 0);
  const isDark = luminance(base) < 0.4;
  const inkForPrint = printColour ?? (isDark ? "#f0ede3" : "#16201d");

  const shade = isDark ? "rgba(240,237,227,0.13)" : "rgba(20,32,28,0.17)";
  const stitch = isDark ? "rgba(238,234,222,0.34)" : "rgba(20,32,28,0.24)";
  const collarTone = mix(base, isDark ? "#ffffff" : "#000000", 0.14);

  /* Flecks: the marl you see in a yarn spun from more than one dye batch.
     Rugby is knitted in two solid yarns, so it has no marl. */
  const flecks = useMemo(() => {
    if (kind === "rugby") return [];
    const rand = mulberry(9137);
    const out: { x: number; y: number; w: number; h: number; r: number; c: string }[] = [];
    const count = distinct.size > 1 ? 420 : 110;
    const bottom =
      kind === "raglan"
        ? 790
        : kind === "crop" || kind === "cap"
          ? 480
          : 610;
    for (let i = 0; i < count; i += 1) {
      const x = 30 + rand() * 540;
      const y = 40 + rand() * (bottom - 60);
      const w = 1.6 + rand() * 5;
      const h = 1.2 + rand() * 2.6;
      const c = batch[Math.floor(rand() * batch.length)];
      out.push({ x, y, w, h, r: rand() * 180, c: mix(c, base, 0.12) });
    }
    return out;
  }, [batch.join(","), distinct.size, kind]);

  /**
   * The marl, written compactly.
   *
   * Each fleck is a small pill, tilted. Written out as its own element it
   * costs a hundred and thirty bytes of markup, and a page of garments came
   * to hundreds of kilobytes of rects. Written as one path per colour, with
   * the corners of every pill worked out here, the same drawing is a handful
   * of elements and a fraction of the bytes. The seed is unchanged, so the
   * fabric looks exactly as it did.
   */
  const marl = useMemo(() => {
    const byColour = new Map<string, string[]>();
    const round = (v: number) => Math.round(v * 10) / 10;

    for (const f of flecks) {
      const a = (f.r * Math.PI) / 180;
      const cos = Math.cos(a);
      const sin = Math.sin(a);
      const hw = f.w / 2;
      const hh = f.h / 2;
      const corner = (dx: number, dy: number): [number, number] => [
        f.x + dx * cos - dy * sin,
        f.y + dx * sin + dy * cos,
      ];
      const [ax, ay] = corner(-hw, -hh);
      const [bx, by] = corner(hw, -hh);
      const [cx, cy] = corner(hw, hh);
      const [dx, dy] = corner(-hw, hh);
      const d =
        `M${round(ax)} ${round(ay)}` +
        `l${round(bx - ax)} ${round(by - ay)}` +
        `l${round(cx - bx)} ${round(cy - by)}` +
        `l${round(dx - cx)} ${round(dy - cy)}z`;

      const parts = byColour.get(f.c);
      if (parts) parts.push(d);
      else byColour.set(f.c, [d]);
    }

    return [...byColour].map(([c, parts]) => ({ c, d: parts.join("") }));
  }, [flecks]);

  const clipId = `clip-${uid}`;
  const isLong = kind === "raglan" || kind === "rugby";

  const chest = kind === "crop" ? 225 : isLong ? 265 : 250;

  /**
   * Rugby: narrow horizontal bands knitted into the body, in the contrast
   * yarn. The body colour dominates, the bands are thin and well spaced, and
   * one wider band crosses the chest so the number has somewhere to sit.
   * They are clipped to the garment, so the tile never bands.
   */
  const bands = useMemo(() => {
    if (kind !== "rugby") return [];
    const rows: { y: number; h: number }[] = [{ y: 138, h: 16 }];
    rows.push({ y: 196, h: 112 });
    for (let y = 340; y < 760; y += 132) {
      rows.push({ y, h: 16 });
    }
    return rows;
  }, [kind]);
  const frame = frameFor(kind);

  return (
    <svg
      viewBox={frame.box}
      className={className}
      role="img"
      aria-label="Illustration of the garment"
      style={{ display: "block", width: "100%", height: "100%" }}
    >
      <defs>
        <clipPath id={clipId}>
          {shapes.map((s, i) => (
            <path key={i} d={s.d} />
          ))}
        </clipPath>

        <linearGradient id={`${uid}-tone`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={shade} stopOpacity="0.5" />
          <stop offset="32%" stopColor={shade} stopOpacity="0" />
          <stop offset="100%" stopColor={shade} stopOpacity="0.72" />
        </linearGradient>

        <linearGradient id={`${uid}-edge`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#000" stopOpacity={isDark ? 0.32 : 0.17} />
          <stop offset="24%" stopColor="#000" stopOpacity="0" />
          <stop offset="76%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity={isDark ? 0.32 : 0.17} />
        </linearGradient>

        <filter id={`${uid}-soft`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" />
        </filter>

        <filter id={`${uid}-grain`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>

      {/* Shadow under the garment */}
      <ellipse
        cx="300"
        cy={frame.shadowY}
        rx="175"
        ry="16"
        fill="#14201c"
        opacity="0.12"
        filter={`url(#${uid}-soft)`}
      />

      <g className="garment-body">
        {/* Base cloth */}
        {shapes.map((s, i) => (
          <path
            key={i}
            d={s.d}
            fill={
              s.label === "brim"
                ? mix(base, isDark ? "#ffffff" : "#000000", 0.12)
                : base
            }
          />
        ))}

        {/* Knitted bands, rugby only, clipped to the garment */}
        {kind === "rugby" && (
          <g clipPath={`url(#${clipId})`}>
            {bands.map((b, i) => (
              <rect
                key={i}
                x="0"
                y={b.y}
                width="600"
                height={b.h}
                fill={batch[1]}
              />
            ))}
          </g>
        )}

        {/* Vertical panels, Loop only */}
        {kind === "panel" && (
          <g clipPath={`url(#${clipId})`}>
            <rect x="0" y="0" width="205" height="820" fill={batch[0]} />
            <rect x="205" y="0" width="195" height="820" fill={batch[1] ?? batch[0]} />
            <rect x="400" y="0" width="200" height="820" fill={batch[2] ?? batch[0]} />
            <rect x="0" y="0" width="600" height="820" fill={base} opacity="0.5" />
          </g>
        )}

        {/* Marled flecks */}
        <g clipPath={`url(#${clipId})`} opacity={0.6}>
          {marl.map((m, i) => (
            <path key={i} d={m.d} fill={m.c} />
          ))}
        </g>

        {/* Shading */}
        <g clipPath={`url(#${clipId})`}>
          <rect x="0" y="0" width="600" height="820" fill={`url(#${uid}-tone)`} />
          <rect x="0" y="0" width="600" height="820" fill={`url(#${uid}-edge)`} />
          <rect
            x="0"
            y="0"
            width="600"
            height="820"
            filter={`url(#${uid}-grain)`}
            opacity="0.09"
          />
        </g>

        {/* Seam lines */}
        {kind !== "cap" && (
          <g fill="none" stroke={stitch} strokeWidth="1.6" strokeDasharray="5 5">
            <path d={NECKLINE} />
            {isLong ? (
              <>
                <path d="M 170 770 L 430 770" />
                <path d="M 60 566 L 140 590" />
                <path d="M 540 566 L 460 590" />
              </>
            ) : (
              <>
                <path d="M 170 586 L 430 586" />
                <path d="M 60 250 L 165 274" />
                <path d="M 540 250 L 435 274" />
              </>
            )}
          </g>
        )}

        {/* Raglan seam */}
        {kind === "raglan" && (
          <g fill="none" stroke={stitch} strokeWidth="1.8">
            <path d="M 262 66 L 435 300" />
            <path d="M 338 66 L 165 300" />
          </g>
        )}

        {/* Collar */}
        {kind !== "cap" && (
          <path
            d={COLLAR}
            fill="none"
            stroke={collarTone}
            strokeWidth="13"
            strokeLinecap="butt"
          />
        )}

        {/* Rugby contrast collar */}
        {kind === "rugby" && (
          <path
            d={COLLAR}
            fill="none"
            stroke={batch[1]}
            strokeWidth="15"
            strokeLinecap="butt"
          />
        )}

        {/* Cap panel seams */}
        {kind === "cap" && (
          <g fill="none" stroke={stitch} strokeWidth="1.6">
            <path d="M 300 262 L 200 400" />
            <path d="M 300 262 L 300 404" />
            <path d="M 300 262 L 400 400" />
            <path d="M 162 386 C 218 404 382 404 438 386" />
          </g>
        )}
        {kind === "cap" && (
          <circle cx="300" cy="262" r="7" fill={mix(base, isDark ? "#ffffff" : "#000000", 0.18)} />
        )}

        {/* Chest pocket */}
        {kind === "pocket" && (
          <g>
            <path
              d="M 372 312 L 372 384 C 372 392 364 398 356 398 L 312 398 C 304 398 296 392 296 384 L 296 312 Z"
              fill={mix(base, isDark ? "#ffffff" : "#000000", 0.06)}
              stroke={stitch}
              strokeWidth="1.6"
            />
            <path
              d="M 296 320 L 372 320"
              stroke={stitch}
              strokeWidth="1.6"
              strokeDasharray="5 5"
            />
          </g>
        )}

        {/* Print */}
        {kind !== "cap" && print !== "none" && (
          <g transform={`translate(300 ${chest})`}>
            {kind === "rugby" ? (
              // A number picked out of the wide chest band: the body yarn on
              // the contrast yarn, so it reads wherever the band falls.
              <PrintMark mark={print} colour={batch[0]} tone="light" bare />
            ) : (
              <PrintMark mark={print} colour={inkForPrint} tone={isDark ? "dark" : "light"} />
            )}
          </g>
        )}
      </g>
    </svg>
  );
}

function PrintMark({
  mark,
  colour,
  tone,
  bare,
}: {
  mark: PrintMark;
  colour: string;
  tone: "light" | "dark";
  /** Draw the numeral alone, for a shirt that already has a band under it. */
  bare?: boolean;
}) {
  if (mark === "four") {
    return (
      <g transform="translate(-70 -68) scale(1.18)" fill={colour}>
        <rect x="56" y="0" width="24" height="120" />
        <path d="M 56 0 L 56 66 L 0 66 Z" />
        <rect x="0" y="66" width="100" height="22" />
      </g>
    );
  }

  if (mark === "contour") {
    return (
      <g fill="none" stroke={colour} strokeWidth="6" strokeLinecap="round">
        {[36, 60, 84, 108].map((r) => (
          <path key={r} d={`M ${-58 + r} 60 A ${r} ${r} 0 0 0 -58 ${60 - r}`} />
        ))}
      </g>
    );
  }

  if (mark === "bar") {
    return (
      <g>
        {!bare && (
          <rect
            x="-88"
            y="-26"
            width="176"
            height="52"
            fill={
              tone === "dark" ? "rgba(240,237,227,0.22)" : "rgba(20,32,28,0.16)"
            }
          />
        )}
        <g
          transform={
            bare
              ? "translate(-50 -68) scale(0.92)"
              : "translate(-27 -36) scale(0.6)"
          }
          fill={colour}
        >
          <rect x="56" y="0" width="24" height="120" />
          <path d="M 56 0 L 56 66 L 0 66 Z" />
          <rect x="0" y="66" width="100" height="22" />
        </g>
      </g>
    );
  }

  if (mark === "cross") {
    return (
      <g fill={colour}>
        <rect x="-13" y="-60" width="26" height="120" />
        <rect x="-60" y="-13" width="120" height="26" />
      </g>
    );
  }

  if (mark === "ring") {
    return (
      <g>
        <circle cx="0" cy="0" r="54" fill="none" stroke={colour} strokeWidth="9" />
        <g transform="translate(-21 -26) scale(0.42)" fill={colour}>
          <rect x="56" y="0" width="24" height="120" />
          <path d="M 56 0 L 56 66 L 0 66 Z" />
          <rect x="0" y="66" width="100" height="22" />
        </g>
      </g>
    );
  }

  if (mark === "stack") {
    return (
      <g>
        {[-70, 0, 70].map((dy) => (
          <g key={dy} transform={`translate(-24 ${dy - 25}) scale(0.48)`} fill={colour}>
            <rect x="56" y="0" width="24" height="120" />
            <path d="M 56 0 L 56 66 L 0 66 Z" />
            <rect x="0" y="66" width="100" height="22" />
          </g>
        ))}
      </g>
    );
  }

  return null;
}
