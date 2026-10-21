import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import { PRODUCTS, type Product } from "../data/products";

export type CartLine = {
  key: string;
  productId: string;
  colourway: string;
  size: string;
  qty: number;
};

type State = { lines: CartLine[]; open: boolean };

type Action =
  | { type: "add"; productId: string; colourway: string; size: string; qty?: number }
  | { type: "remove"; key: string }
  | { type: "qty"; key: string; qty: number }
  | { type: "clear" }
  | { type: "open" }
  | { type: "close" };

const lineKey = (productId: string, colourway: string, size: string) =>
  `${productId}::${colourway}::${size}`;

const initial: State = { lines: [], open: false };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "add": {
      const key = lineKey(action.productId, action.colourway, action.size);
      const existing = state.lines.find((l) => l.key === key);
      const lines = existing
        ? state.lines.map((l) =>
            l.key === key ? { ...l, qty: l.qty + (action.qty ?? 1) } : l,
          )
        : [
            ...state.lines,
            {
              key,
              productId: action.productId,
              colourway: action.colourway,
              size: action.size,
              qty: action.qty ?? 1,
            },
          ];
      return { ...state, lines, open: true };
    }
    case "remove":
      return { ...state, lines: state.lines.filter((l) => l.key !== action.key) };
    case "qty":
      return {
        ...state,
        lines:
          action.qty <= 0
            ? state.lines.filter((l) => l.key !== action.key)
            : state.lines.map((l) =>
                l.key === action.key ? { ...l, qty: action.qty } : l,
              ),
      };
    case "clear":
      return { ...state, lines: [] };
    case "open":
      return { ...state, open: true };
    case "close":
      return { ...state, open: false };
    default:
      return state;
  }
}

type CartValue = {
  lines: CartLine[];
  open: boolean;
  count: number;
  subtotal: number;
  add: (p: string, colourway: string, size: string, qty?: number) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
  productOf: (line: CartLine) => Product | undefined;
};

const CartContext = createContext<CartValue | null>(null);
const STORAGE = "weer.bag.v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initial);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE);
      if (!raw) return;
      const parsed = JSON.parse(raw) as CartLine[];
      if (Array.isArray(parsed)) {
        parsed.forEach((l) =>
          dispatch({
            type: "add",
            productId: l.productId,
            colourway: l.colourway,
            size: l.size,
            qty: l.qty,
          }),
        );
        dispatch({ type: "close" });
      }
    } catch {
      /* storage unavailable */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE, JSON.stringify(state.lines));
    } catch {
      /* storage unavailable */
    }
  }, [state.lines]);

  const add = useCallback(
    (productId: string, colourway: string, size: string, qty = 1) =>
      dispatch({ type: "add", productId, colourway, size, qty }),
    [],
  );
  const remove = useCallback(
    (key: string) => dispatch({ type: "remove", key }),
    [],
  );
  const setQty = useCallback(
    (key: string, qty: number) => dispatch({ type: "qty", key, qty }),
    [],
  );
  const clear = useCallback(() => dispatch({ type: "clear" }), []);
  const openCart = useCallback(() => dispatch({ type: "open" }), []);
  const closeCart = useCallback(() => dispatch({ type: "close" }), []);

  const value = useMemo<CartValue>(() => {
    const count = state.lines.reduce((s, l) => s + l.qty, 0);
    const subtotal = state.lines.reduce((s, l) => {
      const p = PRODUCTS.find((x) => x.id === l.productId);
      return s + (p ? p.price * l.qty : 0);
    }, 0);
    return {
      lines: state.lines,
      open: state.open,
      count,
      subtotal,
      add,
      remove,
      setQty,
      clear,
      openCart,
      closeCart,
      productOf: (line) => PRODUCTS.find((p) => p.id === line.productId),
    };
  }, [state, add, remove, setQty, clear, openCart, closeCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
