# AGENTS.md

Working notes for the next agent on this repository. Read this before
changing anything.

## What this repository is

A **fictional** e-commerce site for a made-up t-shirt brand called WEER, built
as a design and front-end demonstration. Nothing on the site is real: the
company, the products, the prices, the team, the address, the phone number,
the customer counts, the environmental figures and the history are all
invented. The copy, the art direction, the illustrations and the code were
written and built by AI.

**Keep that true.** The site states it in the footer, on the About page and
in the page metadata. If you add a page, a section, a product or a claim,
keep the fiction visible. Do not add fake customer reviews, star ratings,
press logos, testimonials or invented partner logos — that is the one thing
the site deliberately never does. The brand's own operational numbers are fine
as fiction, provided they stay consistent with the rest of the site.

## Stack and layout

```
src/
  main.tsx              entry
  App.tsx               router, header, footer, cart drawer
  index.css             design tokens, base, component classes
  data/products.ts      the seven pieces, colourways, sizes, print marks
  data/site.ts          brand details, process, figures, team, faq, credits
  lib/cart.tsx          cart context, reducer, localStorage
  components/
    Garment.tsx         the parametric SVG garment (the heart of the site)
    Stage.tsx           the fixed half + the crossfade + useActiveSection
    BatchBuilder.tsx    the live thing
    ProductCard.tsx     catalogue tile
    Photo.tsx           found photograph, one treatment
    Header.tsx Footer.tsx CartDrawer.tsx Reveal.tsx
  routes/
    Home.tsx Shop.tsx ProductPage.tsx About.tsx Contact.tsx Checkout.tsx
public/photos/          the found photographs and the two clips
```

## The rules that hold this design together

1. **Five type sizes, no more.** They are the CSS custom properties
   `--step-display / --step-head / --step-lead / --step-body / --step-small`
   in `src/index.css`, exposed as `.t-display .t-head .t-lead .t-body
   .t-small`. If you need a sixth size, you have found a problem, not a need.
2. **One accent.** `--color-accent` (marigold). It marks the action and one
   other thing. Nothing else.
3. **Square corners.** No border-radius on buttons, cards or panels.
4. **No hairline rules.** Separate things with space, a tone step or a change
   of scale. `border-t` on a list row is a smell.
5. **No gradients, no shadows at rest, no monospace, no emoji, no eyebrow
   labels, no index numbers (`01 / 02 / 03`).**
6. **Every photograph gets the same treatment.** The `.photo` class does it:
   grayscale, sepia, contrast, paper multiplied over. Do not add a second
   grade.
7. **The garments are the only colour on the site.** They are drawn in
   `Garment.tsx` from the batch colours, so they re-tint with the data.
8. **One h1 per page, in the first screen, two lines or fewer.**

## The garment drawing

`src/components/Garment.tsx` is the piece of code that makes this site
itself. It is parametric: a `kind` (the silhouette), an array of dye-batch
colours (which become the base tone and the marled flecks) and a `print` mark.

- `shapesFor(kind)` returns the silhouette paths in a 600 × 820 viewBox.
- `frameFor(kind)` returns a tight viewBox per silhouette, so a cropped tee
  and a long sleeve both fill the frame.
- The flecks are generated from a seeded PRNG so a batch always looks the
  same. Keep the seed, or the fabric will shimmer on every render.
- `mix()` and `toRgb()` only understand **hex**. An `rgb()` string passed in
  produces `NaN` and the fill silently falls back to black. This bug shipped
  once; it is why `mean` is computed as hex.
- New silhouettes: add the paths to `shapesFor`, add a frame to `frameFor`,
  and add the kind to the `GarmentKind` union in `src/data/products.ts`.

## Changing the content

Everything is data. To change the catalogue, edit `src/data/products.ts`; the
colourways, the batch, the print mark, the sizes and the stock follow. To
change the story, the numbers, the process, the FAQ or the team, edit
`src/data/site.ts`. The pages read from those two files and nowhere else.

**Each colourway has its own four shirts.** A product carries
`batches: { <colourway>: [four colourway ids] }`, and the first id is the body
colour. `batchOf()`, `batchHexes()` and `describeBatch()` are the only ways to
read it. The colour swatches on the listing, on the product page, in the bag
and in the checkout all re-tint the drawing through those helpers — if you add
a colourway and forget its batch, the swatch will do nothing. `DYE_BATCHES` in
the same file is the home page's builder; it points at real catalogue batches
so the landing page and the shop can never drift apart.

Keep the numbers consistent. If you change "14,800 shirts collected", change
it in `FIGURES` (which the home page and the About page both read) and check
that the process receipt still adds up to nineteen days.

## Before you push

```bash
npm run lint      # oxlint, no errors
npx tsc -b --noEmit
npm run build
```

Then look at the thing. The design gate is a real browser:

```bash
node "<skills>/scripts/inspect.mjs" "http://127.0.0.1:5173/" --out .taste-skill/inspect
```

Run it on every route you touched, at 1440, 768 and 390. It measures
headline line counts, contrast, the type scale, the picture floor, the frame
margins, motion and the rest. **Target: 0 FAIL.** The single allowed waiver
is `--allow font-not-dealt`, because the type face was deliberately redrawn
from the dealt one; the reason is written up in `REPORT.md`.

If you need real pictures, search the open collections with the assets
script rather than reaching for a stock photo, and add the credit to
`src/data/site.ts` (`PHOTOS` and `CREDITS`) and to `CREDITS.md`.

## Things that are deliberately unfinished

- The contact form and the order form hand their message to the visitor's own
  email client. There is no backend and no payment provider. If you wire one
  up, keep the sentence under the form honest about where the data goes.
- The bag is `localStorage` only. It is not a cart, it is a bag.
- The impact figures are fiction. They are internally consistent, and they
  must stay that way.

## Do not

- Add a real payment form, a newsletter API, analytics or a cookie banner
  to a site that is explicitly fictional without saying so first.
- Present the found photographs as if they were the fictional studio. The
  captions say what they actually show.
- Break the house rules listed above because a component library made you.
  This site has no component library on purpose.
