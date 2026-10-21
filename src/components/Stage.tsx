import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";

/**
 * The fixed half of the page. One element stays in place while the other
 * half scrolls; its contents change quietly when the reading half reaches a
 * new section.
 */
export function Stage({
  children,
  active,
  caption,
  aside,
  className = "",
}: {
  children: ReactNode;
  active: string;
  caption?: ReactNode;
  aside?: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <div className={`stage flex flex-col bg-ground-2 ${className}`}>
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={active}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 1.6, ease: "easeInOut" }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>

      {aside}

      {caption && (
        <div className="hidden items-center justify-between gap-4 bg-panel px-5 py-3 min-[901px]:flex">
          {caption}
        </div>
      )}
    </div>
  );
}

/** Watches a set of section ids and reports which one the reader is at. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "");
  const key = ids.join(",");

  useEffect(() => {
    const list = key.split(",").filter(Boolean);
    const nodes = list
      .map((id) => document.getElementById(id))
      .filter((n): n is HTMLElement => Boolean(n));
    if (!nodes.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [key]);

  return active;
}
