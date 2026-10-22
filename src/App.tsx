import { useEffect } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { CartDrawer } from "./components/CartDrawer";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { CartProvider } from "./lib/cart";
import { About } from "./routes/About";
import { Checkout } from "./routes/Checkout";
import { Contact } from "./routes/Contact";
import { Home } from "./routes/Home";
import { ProductPage } from "./routes/ProductPage";
import { Shop } from "./routes/Shop";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);
  return null;
}

function NotFound() {
  return (
    <div className="read read--page mx-auto max-w-[46rem]">
      <h1 className="t-display">This page was never knitted.</h1>
      <p className="body-copy mt-4">
        The link you followed does not lead anywhere. The collection does.
      </p>
      <Link to="/shop" className="btn mt-7">
        See the collection
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <ScrollToTop />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-solid focus:px-4 focus:py-2 focus:text-solid-ink"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<ProductPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer />
    </CartProvider>
  );
}
