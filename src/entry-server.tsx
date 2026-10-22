import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App";
import { PAGES, SITE } from "./data/site";
import { schemaJson } from "./lib/schema";

/**
 * Renders a route to HTML. The build runs this once per page and writes the
 * result, so the site is served as documents and the browser only has to
 * take over.
 */
export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
}

export { PAGES, SITE, schemaJson };
