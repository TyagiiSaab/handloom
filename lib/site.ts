/** Base path for static hosting under a sub-path (e.g. GitHub Pages project sites). */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const withBase = (p: string) => `${BASE_PATH}${p}`;

/** Lead capture mode: `api` posts to a server route, `mailto` composes an
 * email to the export desk (for fully static hosts like GitHub Pages). */
export const LEAD_MODE =
  process.env.NEXT_PUBLIC_LEAD_MODE === "mailto" ? "mailto" : "api";

export const EXPORT_EMAIL = "export@hadloom.example";
