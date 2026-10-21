# WEER — build report

A fictional e-commerce site for a Rotterdam studio that makes t-shirts out of
the t-shirts you already own. **WEER** is Dutch for *again*.

---

## 1. The direction

Dealt with `design-taste-frontend/scripts/draw.mjs`, sector `fashion`:

```
node draw.mjs --sector fashion \
  --brief "WEER, a Rotterdam studio that shreds reclaimed t-shirts into yarn and re-knits new ones, four old shirts per new body" \
  --sections how-it-works,showcase,proof,stats,about,faq,cta,footer \
  --tone technical --direction split-stage
```

**Direction: `split-stage`, seed 1615397456.** One fixed half that holds the
product or a photograph and never moves, one scrolling half that holds the
reading. The fixed half crossfades as the reader reaches a new section.

**The field.** A section that changes the ground colour runs off the left edge
of the page and meets the photograph at a clean vertical line, so the text on
it keeps the same left margin as every other line on the site. A band that
stops at the margin with its own text flush against it reads as a box with
the words spilling out of it, not as a field.
Section blueprints taken from the sheet: the itinerary-on-a-slip (the process
receipt), the plain names in columns (the team and the stockists), the
photograph with figure tiles (the numbers), the founder's letter on a
scalloped sheet with a tear-off strip, the questions beside a tall photograph,
the plain sentence with one action, and the split footer.

### Redraws, and why

| Slot | Dealt | Shipped | Reason |
| --- | --- | --- | --- |
| Type | STIX Two Text | **Archivo** (variable width + weight) | The brief asks for a modern interface. A Times-style roman reads heritage-fashion, not a workshop. The printed-document *idea* is kept; the *face* is a grotesk with a width axis, so the voice comes from the same place without the fashion-magazine smell. |
| Palette | Navy on white | **Recycled-board grey `#e4e6e0` ground, deep pine `#14201c` ink, marigold `#e09b23` accent** | The sheet allows taking the subject's own colours. The subject's world is a sorting floor: dyed cotton, pine-green crates, a marigold ink pot, grey recycled board. Proportions kept (one ground, one ink, one accent, two fields); the hue changed to the subject's. |
| Corners | 20px radius | **Square (0)** | One radius for the whole site, decided once, as the house rules ask. Square suits a workshop and a receipt. |
| Hero | Sticky photograph | **The live garment** | The sheet allows "the object centred on a flat field" in the fixed half. The garment is the product and the live thing, so it belongs there. |
| Imagery | "Hands and making" set from picsum | **Real archive photographs and two real clips** | Picsum's hands hold grapes and sparklers. Real open-collection pictures of shoddy, spinning rooms, looms and Rotterdam were found instead. |
| Shop layout | — | **Full-width header band + filter rail + grid** | The split stage cannot carry a filter rail and a four-column product grid. The shop keeps the site's typography, palette and voice, and breaks the split where the job of the page is different. |

---

## 2. The idea

> On this page, **the ball of reclaimed yarn** becomes **a colour-batch builder that shows exactly which four old shirts your new one is made of**.

**The live thing:** the fixed half of the home page holds a t-shirt you can
rebuild. Pick four dye batches and the garment re-knits: the first slot sets
the body, the other three become the marl in the fabric. Four the same gives
you a solid shirt — which is exactly how a real reclaimed yarn behaves. The
builder works with a thumb, has a plain fallback (the chosen batch is written
out in the caption), and never blocks reading.

---

## 3. What is on the site

- **Seven pieces** — Cirrus, Terra, Deck, Field, Halo, Loop, and an Offcut Cap
  made from jersey offcuts. Each carries its fit, weight, care, origin and the
  four-shirt batch it was spun from.
- **Home** — the live garment, the process receipt, the collection, the
  numbers, the people, the close.
- **Shop** — filters (fit, weight, colour), sort, seven pieces, the world
  they come from.
- **Product** — colourways, sizes with live stock, the batch, the specifics,
  where it was made, related pieces.
- **About** — the founder's letter on a scalloped sheet with a tear-off strip,
  the history, four things we refuse to do, our own numbers.
- **Contact** — four channels, a form, how to find the studio, six questions.
- **Checkout** — the bag, the address, and what happens to an order next.

No customer reviews, no star ratings, no press logos, no testimonials. The
brand's own operational numbers are used instead, and the About page has a
"What we do not do" section that refuses four common green claims outright.

---

## 4. Critique rounds

```
ROUND 1
Seen in one second: A t-shirt with a big 4 on it, and the words "Four old shirts. One new one."
Idea (one sentence): A t-shirt is rebuilt in front of you out of four dye batches you pick.
Live thing: The batch builder in the fixed half.
Layout words by section: hero=display headline + lead + one button, garment opposite. / process=dark band, receipt slip, video band. / collection=three garments. / numbers=photo + two colour tiles. / people=names in columns. / closing=one sentence, one button.
Scores: design 6 usability 5 creativity 5 content 6 overall 5.5
Caps applied: One typeface (Archivo), five sizes, one accent, square corners, no hairlines, no gradients, no shadows at rest, no monospace, no eyebrow labels, no index numbers.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. Every garment rendered solid black (desktop-fold) — the colour mixer was handed an rgb() string where it expected hex, so the fill was invalid. Fixed by making the mixer accept both and computing the batch mean as hex.
2. The hero headline ran to three lines (desktop-fold) — the measure was capped at 13ch. Widened the measure and took the display step down to 80px so it breaks in two.
3. The receipt slip was paper-on-paper: dark-field text inherited the field colour (desktop-page-01). Set the slip's own ink colour.
```

```
ROUND 2
Seen in one second: The same t-shirt, bigger, with the marl now visible and the 4 sitting on the chest.
Idea (one sentence): A t-shirt is rebuilt in front of you out of four dye batches you pick.
Live thing: The batch builder in the fixed half.
Layout words by section: hero=display headline + lead + one button. / process=dark band, receipt slip, video band. / collection=three garments. / numbers=photo + two colour tiles. / people=names in columns. / closing=one sentence, one button.
Scores: design 7 usability 6 creativity 6 content 7 overall 6.5
Caps applied: Same house style; the type scale was pulled back to five steps and every long small text was raised to reading size.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. Twelve font sizes were in play and the running text sat at 14px (desktop-page-01) — the small step was 14px and the lead class was being overridden by .body-copy. Fixed the cascade order and moved the small step to 16px: five sizes, 16/20/25/50/80.
2. The product cards' colour label overflowed the right edge on a phone (mobile-page-01) — the label shared a row with four swatches. Moved the label to its own line.
3. The cap read as a dome on a plate (shop desktop-page-01) — the crown and the brim were the same tone. Gave the brim its own tone, a band seam and a button on the apex.
```

```
ROUND 3
Seen in one second: A workshop, a t-shirt, and a claim you can check.
Idea (one sentence): A t-shirt is rebuilt in front of you out of four dye batches you pick.
Live thing: The batch builder in the fixed half.
Layout words by section: hero=display headline + lead + one button. / process=dark band, receipt slip, video band. / collection=three garments. / numbers=photo + two colour tiles. / people=names in columns. / closing=one sentence, one button.
Scores: design 8 usability 8 creativity 7 content 8 overall 7.5
Caps applied: One typeface, five sizes, one accent, square corners, no hairlines, no gradients, no shadows at rest, no monospace, no eyebrow labels, no index numbers, no fabricated reviews or press.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. The shop's "Where these come from" heading sat in a half-width grid cell and broke to four lines on a tablet (shop tablet-page-01) — pulled the heading and paragraph out of the cell so they take the full width.
2. The product name was 50px and nothing dominated the first screen (shop/cirrus desktop-fold) — the garment drawing does not count as a picture for that rule, so the name was raised to the display step.
3. The checkout had no moving picture and only four elements moved (checkout desktop-page-01) - the "What happens next" band was rebuilt with four steps, a real clip and per-step entrances.
```

```
ROUND 4
Seen in one second: A workshop, a t-shirt, and a claim you can check.
Idea (one sentence): A t-shirt is rebuilt in front of you out of four dye batches you pick.
Live thing: The batch builder in the fixed half.
Layout words by section: hero=display headline + lead + one button. / process=dark field bleeding off the page, receipt slip, video band. / collection=three garments. / numbers=photo + two colour tiles. / people=names in columns. / closing=one sentence, one button.
Scores: design 8 usability 8 creativity 7 content 8 overall 7.5
Caps applied: One typeface, five sizes, one accent, square corners, no hairlines, no gradients, no shadows at rest, no monospace, no eyebrow labels, no index numbers, no fabricated reviews or press.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. The dark band was a box with its own heading flush against its left edge, so the words looked like they were spilling out (home desktop-page-01) - the field now runs off the left edge of the page and meets the photograph at a clean vertical line, and the text on it keeps the site's left margin.
2. The footer's muted text on the dark field sat at 5.2:1 and the third ink tone at 5.2:1 as well (checkout desktop-page-01) - the footer's greys were lifted and the third ink tone darkened to 7.3:1, so every running line clears 7:1.
3. The stage ate too much of a short window, pushing the first action below the fold (tablet-page-01) - the mobile stage went from 52svh to 44svh and the reading column's vertical padding tightened.
```

**What still falls short.** The scroll films are honest but the site has no
photograph of the fictional studio, because no such studio exists; every
picture shows the world of reclaimed fibre instead, and the site says so in
the captions. The garments are drawings, so they are the one thing on the
site that a reader cannot photograph. A real launch would need studio
photography, a payment backend, and the stock figures behind each size.

---

## 5. The gate

`design-taste-frontend/scripts/inspect.mjs`, run on the dev server at 1440,
768 and 390 pixels, with `--allow font-not-dealt` (the type redraw above):

| Route | Result |
| --- | --- |
| `/` | 0 FAIL, 0 WARN |
| `/shop` | 0 FAIL, 0 WARN |
| `/about` | 0 FAIL, 0 WARN |
| `/contact` | 0 FAIL, 0 WARN |
| `/shop/cirrus` | 0 FAIL, 0 WARN |
| `/shop/offcut-cap` | 0 FAIL, 0 WARN |
| `/checkout` | 0 FAIL, 0 WARN |
| `/shop/offcut-cap` | 0 FAIL, 0 WARN |

Measured on every page: Archivo 100%, five sizes (16 / 20 / 25 / 50 / 80),
body copy at 20px, headlines at two lines or fewer, 12px margins on a phone
against a 20px page margin.

`npm run build` and `tsc -b` are clean; `oxlint` reports no errors.

---

## 6. Pictures and footage

All found in open collections, all credited in the site footer and listed in
`CREDITS.md`. They show the world of reclaimed fibre, never the fictional
studio.

| Work | Creator | Licence | Where the credit sits |
| --- | --- | --- | --- |
| Old Rags Into New Cloth, Salvage in Britain, 1942 | Richard Stone | public domain | Caption under the shop band; footer list |
| Davies Coop & Company (spinning room) | State Government of Victoria | CC0 | Caption under the home "people" band; footer list |
| NTMT.00111 (yarn onto cones) | Hanne Dale, Tekstilindustrimuseet | CC BY-SA 4.0 | Caption under the home "collection" band; footer list |
| Cyclopedia of Textile Work, 1911 | Internet Archive Book Images | no known copyright restrictions | Footer list |
| Meisje spint katoen op een spinnewiel | Rijksmuseum | CC0 | Caption on shop and contact; footer list |
| Amazone harbour, Port of Rotterdam (two) | Alf van Beem | CC0 | Caption on contact and home; footer list |
| Cotton boll | Rawpixel | CC0 | Caption on shop and checkout; footer list |
| Ellenroad Ring Mill Engine in operation, 2023 | Ridiculopathy | CC0 | Caption on home, shop, product; footer list |
| Room of steam powered looms, Queen Street Mill, 2013 | Victuallers | CC BY-SA 3.0 | Caption on contact and checkout; footer list |

**Drawings standing in for photography:** every garment.
`src/components/Garment.tsx` draws the silhouette, the collar, the seams, the
marled flecks of the four source dye batches, the knitted stripes, the patch
pocket, the panel blocks and the screen-printed mark, all in the real colour
of the batch. Six silhouettes: boxy tee, cropped tee, patch-pocket tee,
raglan long sleeve, rugby long sleeve, three-panel tee, plus a five-panel
cap. Six print marks: the numeral 4, a topographic fan, a bar, a cross, a
ring, and a stack of 4s.

**Dealt photographs used:** none. The sheet's "Hands and making" set
(picsum) shows hands holding grapes, a sparkler and a camera, which are not
this subject's world. Real archive pictures were found instead.

---

## 7. Before launch

- The brand, the people, the address, the figures and the whole supply chain
  are invented for this build.
- The contact form and the order form hand their contents to the visitor's
  own email client; there is no payment backend and no order store. Both
  need wiring.
- The bag persists in `localStorage` only.
- The garment drawings are illustrations, not photography; a real launch
  should shoot the actual product.
- The impact figures are the brand's own claims. Before publishing them,
  check the methodology against the numbers and publish the method.
