import { Link } from "react-router-dom";
import { BRAND, CREDITS, PHOTOS } from "../data/site";
import { Photo } from "./Photo";

const MENU = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About us" },
  { to: "/contact", label: "Contact" },
  { to: "/checkout", label: "Your order" },
];

export function Footer() {
  return (
    <footer className="grid grid-cols-1 md:grid-cols-2">
      <Photo
        src={PHOTOS.port.src}
        w={PHOTOS.port.w}
        h={PHOTOS.port.h}
        alt={PHOTOS.port.alt}
        className="aspect-[4/3] md:aspect-auto md:min-h-[26rem]"
        imgClassName="md:h-full"
        eager
      />

      <div className="field-dark flex flex-col justify-between px-6 py-10 md:px-12 md:py-14">
        <div>
          <p
            className="t-lead leading-none font-extrabold tracking-[-0.045em]"
            style={{ fontVariationSettings: '"wdth" 118' }}
          >
            WEER
          </p>

          <nav className="mt-10 flex flex-col" aria-label="Footer">
            {MENU.map((m) => (
              <Link
                key={m.to}
                to={m.to}
                className="group w-fit py-1.5 t-head leading-tight font-bold tracking-[-0.03em] transition-transform duration-200 hover:translate-x-2 "
                style={{ fontVariationSettings: '"wdth" 110' }}
              >
                {m.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div className="meta leading-relaxed">
            <h2 className="t-body font-semibold text-paper">Visit</h2>
            <p className="mt-1 opacity-80">{BRAND.address}</p>
            <p className="opacity-80">{BRAND.addressLine2}</p>
            <p className="mt-2 opacity-80">{BRAND.hours}</p>
            <p className="opacity-80">{BRAND.travel}</p>
          </div>
          <div className="meta leading-relaxed">
            <h2 className="t-body font-semibold text-paper">Write</h2>
            <p className="mt-1">
              <a className="link-line" href={`mailto:${BRAND.email}`}>
                {BRAND.email}
              </a>
            </p>
            <p className="opacity-80">{BRAND.phone}</p>
            <p className="mt-2 font-semibold text-paper">Follow</p>
            <p className="opacity-80">Instagram, Pinterest, Nothing, Threads</p>
          </div>
        </div>

        <p className="meta mt-12 text-paper/60">
          {BRAND.name} studio {BRAND.city}, founded {BRAND.founded}. Chamber{" "}
          {BRAND.kvk}.
        </p>

        <div className="mt-6 max-w-[46rem] border-l-2 border-accent pl-5">
          <p className="t-body font-semibold text-paper">
            WEER is not a real company, and nothing on this site is real.
          </p>
          <p className="mt-2 t-small leading-relaxed text-paper/75">
            The brand, the products, the prices, the team, the address, the
            phone number, the customer counts, the environmental figures and the
            history are all invented for this demonstration. No orders are
            taken, no payment is taken, and no message sent from this site
            reaches a real person. The whole site — copy, design and code — was
            written and built by AI.
          </p>
        </div>

        <div className="mt-8 max-w-[42rem]">
          <p className="meta text-paper/60">
            Photographs and footage found in open collections, showing the world
            of reclaimed fibre rather than our fictional studio. Every garment
            on this site is a drawing made in code, not a photograph of a
            product.
          </p>
          <ul className="mt-3 grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
            {CREDITS.map((c) => (
              <li key={c.title} className="meta text-paper/50">
                <span className="block">{c.title}</span>
                <span className="block opacity-80">{c.credit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
