# WEER

[![Live preview](https://img.shields.io/badge/live-weer--studio.netlify.app-2c7a5f?style=flat-square)](https://weer-studio.netlify.app)

A fictional e-commerce site for a Rotterdam studio that makes t-shirts out of
the t-shirts you already own. **WEER** is Dutch for *again*.

Four reclaimed t-shirts are shredded, spun into yarn and knitted into one new
body. Every page describes the same company, so the shop, the story and the
numbers all agree with each other.

The brand, the products, the prices, the team, the address, the customer
counts, the environmental figures and the history are all invented, and every
garment is a drawing made in code rather than a photograph. The copy, the art
direction and the code were written by AI. No order is taken and no payment
is processed.

| Route | What it is |
| --- | --- |
| `/` | The split stage: a live garment you can rebuild from four dye batches, the process receipt, the collection, the numbers, the people |
| `/shop` | The catalogue: filters, sort, seven pieces, the world of reclaimed fibre |
| `/shop/:id` | One piece: colourways, sizes, the batch it came from, where it was made |
| `/about` | The founder's letter, the history, the four things we refuse to do, our own numbers |
| `/contact` | Channels, a form that hands the message to your email client, how to find the studio, questions |
| `/checkout` | The bag, the address, and what happens to an order next |

## The live thing

On the home page the fixed half of the screen holds a t-shirt you can rebuild.
Pick four dye batches and the garment re-knits: the first slot sets the body,
the other three become the marl in the fabric. All four the same gives you a
solid shirt, which is exactly how a real reclaimed yarn behaves.

## Design

- **Direction** — the split stage: one fixed half that holds the product or a
  photograph, one scrolling half that holds the reading. The fixed half
  crossfades as the reader reaches a new section.
- **Type** — Archivo (variable width and weight) only. Five sizes, no more.
- **Colour** — a cool recycled-paper ground (`#e4e6e0`), deep pine ink
  (`#14201c`) and one accent, the marigold of a sorting bucket (`#e09b23`).
  Every photograph is treated the same way: warm monochrome. The garments are
  the only colour on the site.
- **Product imagery** — every garment is drawn in code as a parametric SVG
  (`src/components/Garment.tsx`): the silhouette, the marled flecks of the
  four source dye batches, the collar, the seams and the screen-printed mark.
  Six silhouettes, six print marks, one drawing language.

## Running it

```bash
npm install
npm run dev      # http://127.0.0.1:5173
npm run build    # tsc -b && vite build
npm run lint     # oxlint
```

Node 20+ recommended (Node 22 used here).

## Deploying

The site is deployed on Netlify: <https://weer-studio.netlify.app>. Push to
`main` and the GitHub Actions workflow in `.github/workflows/deploy.yml` builds
and publishes it. The Netlify token and site id live as repository secrets
(`NETLIFY_AUTH_TOKEN`, `NETLIFY_SITE_ID`), never in the tree.

## Stack

Vite · React 19 · TypeScript · Tailwind CSS v4 · React Router · Motion

## Pictures and footage

Every photograph and the two video clips were found in open collections and are
credited on the page and in the footer:

- *Old Rags Into New Cloth — Salvage in Britain*, 1942 — public domain
- *Davies Coop & Company* — State Government of Victoria, CC0
- *NTMT.00111* — Tekstilindustrimuseet, CC BY-SA 4.0
- *Cyclopedia of Textile Work*, 1911 — Internet Archive
- *Meisje spint katoen op een spinnewiel* — Rijksmuseum, CC0
- *Amazone harbour, Port of Rotterdam* — Alf van Beem, CC0
- *Cotton boll* — Rawpixel, CC0
- *Ellenroad Ring Mill Engine in operation*, 2023 — Ridiculopathy, CC0
- *Room of steam powered looms*, 2013 — Victuallers, CC BY-SA 3.0

They show the world of reclaimed fibre, not the studio. They are
**not** covered by this repository's MIT licence; see `CREDITS.md` for each
file's own terms.

## Before this could go live

- The contact form and the order form hand their contents to the visitor's
  own email client. There is no backend and no payment provider; both need
  wiring.
- The bag persists in `localStorage` only.
- The garment drawings are illustrations, not photography. A real launch
  should shoot the actual product.
- The impact figures are the brand's own claims. Publish the method with the
  number or drop the number.

## Licence

MIT — see [`LICENSE`](./LICENSE). The photographs and footage under
`public/photos/` are excluded and keep their own licences.

## Further reading

- [`REPORT.md`](./REPORT.md) — the art direction, the redraws and their
  reasons, three critique rounds, and the measured gate results.
- [`CREDITS.md`](./CREDITS.md) — every picture and clip, with creator,
  licence and source page.
- [`AGENTS.md`](./AGENTS.md) — how to work on this repository.
