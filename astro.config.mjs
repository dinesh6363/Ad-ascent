// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";

// Single source of truth for the production URL (canonical / OG / sitemap).
// Keep this in sync with `site.url` in src/config.ts.
const SITE_URL = "https://ad-ascent.com";

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  // Static output by default. The only on-demand route is src/pages/api/contact.ts,
  // which opts in with `export const prerender = false`. Everything else is prerendered.
  output: "static",
  adapter: vercel({
    webAnalytics: { enabled: false },
  }),
  // Astro's built-in origin check misfires behind Vercel's proxy (the browser
  // Origin doesn't match the URL Astro reconstructs), returning 403 on form
  // POSTs. We disable it and enforce a lenient same-site guard ourselves in
  // src/pages/api/contact.ts instead.
  security: {
    checkOrigin: false,
  },
  integrations: [
    tailwind({
      // We manage the base reset/globals ourselves in src/styles/theme.css.
      applyBaseStyles: false,
    }),
    sitemap(),
  ],
  build: {
    inlineStylesheets: "auto",
  },
});
