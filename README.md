# Ad-Ascent — Marketing Website

A fast, single-page marketing site for **Ad-Ascent**, a digital agency that runs
Google Ads for HVAC companies. Built to amplify credibility during cold outreach:
clean, modern, and precise — in the visual league of Linear and Vercel.

- **Framework:** [Astro](https://astro.build) (static output, near-zero JS)
- **Styling:** Tailwind CSS, driven entirely by CSS custom properties
- **Animations:** IntersectionObserver + CSS/Web Animations (no heavy JS libs)
- **Contact form:** one Vercel Serverless Function → [Resend](https://resend.com)
- **Deploy:** Vercel + custom domain `ad-ascent.com`

---

## Quick start

```bash
npm install          # install dependencies
cp .env.example .env # then add your RESEND_API_KEY (see below)
npm run dev          # http://localhost:4321
npm run build        # production build (Vercel-ready)
npm run preview      # preview the production build locally
```

Other scripts:

```bash
npm run format       # Prettier
npm run lint         # ESLint
node scripts/gen-assets.mjs   # regenerate favicon.ico + og-image.png from the SVGs
```

---

## Project structure

```
public/                 static assets (logos, favicons, og-image, robots.txt)
scripts/gen-assets.mjs  rasterizes favicon.ico + og-image.png from SVG sources
src/
  config.ts             ← ALL content + links live here (single source of truth)
  styles/theme.css      ← ALL colors + design tokens (single source of truth)
  layouts/Layout.astro  <head>, SEO, JSON-LD, global scroll/reveal/menu scripts
  components/            one component per section (Hero, Problem, Focus, …)
  pages/
    index.astro         composes the single page
    thanks.astro        no-JS success/error fallback for the contact form
    api/contact.ts      serverless POST route → sends email via Resend
```

---

## Where to change things

### 🎨 Colors / theme — `src/styles/theme.css`

Every color is a CSS variable in `:root`. Change one value and the whole site
follows — no find-and-replace. Example:

```css
:root {
  --color-primary: #2f6bff; /* change this → every button, link, accent updates */
  --color-accent: #7c5cff;
  --color-bg: #0b0d12;
  /* … */
}
```

Tailwind utilities (`bg-primary`, `text-accent`, `border-border`, …) map to these
variables via `tailwind.config.mjs`, so components never hardcode hex values.

**Light / dark theme.** There's a working toggle in the header (sun/moon). Dark
is the brand default; light is an explicit, persisted opt-in (saved to
`localStorage`, applied before first paint to avoid a flash). Both palettes are
defined by the same tokens — `:root[data-theme="dark"]` and
`:root[data-theme="light"]` in `theme.css`. The toggle component is
`src/components/ThemeToggle.astro`; the wiring lives in `Layout.astro`.

> Note: `--color-primary` is `#2a63f5` — the PDF's `#2f6bff` nudged a hair darker
> so white button text clears the WCAG AA 4.5:1 contrast ratio (it was 4.49).
> Visually identical; revert to `#2f6bff` if you prefer the exact original.

### ✏️ Content, links & contact info — `src/config.ts`

All copy, nav items, section data (pain points, feature cards, process steps,
services, FAQ), and these values live here:

| Value            | Key                       |
| ---------------- | ------------------------- |
| Production URL   | `SITE_URL`                |
| Form recipient   | `site.contactEmail`       |
| From address     | `site.fromEmail`          |
| WhatsApp number  | `site.whatsapp.number`    |
| WhatsApp message | `site.whatsapp.defaultMessage` |
| LinkedIn URL     | `site.linkedinUrl`        |

`SITE_URL` is also set in `astro.config.mjs` (used for the sitemap) — keep the two
in sync.

### 🖼️ Logo & assets

- The logo is an original inline-SVG wordmark: `src/components/Logo.astro`
  (themeable via CSS variables).
- Standalone exports in `/public`: `logo.svg`, `logo-mark.svg`, `favicon.svg`,
  `favicon.ico`, `apple-touch-icon.png`, `og-image.svg` / `og-image.png`.
- Regenerate the raster ones after editing the SVGs: `node scripts/gen-assets.mjs`.

---

## Contact form + email (Resend)

The form posts to `src/pages/api/contact.ts`, which runs as a Vercel Serverless
Function and emails every submission to `site.contactEmail` (currently
`animesh@ad-ascent.com`), with `reply-to` set to the submitter.

### 1. Get a Resend API key

Sign up at [resend.com](https://resend.com) (free tier) and create an API key.

### 2. Local development

```bash
cp .env.example .env
# .env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxx
```

### 3. Verify the sending domain (required for delivery)

In Resend, **add and verify the `ad-ascent.com` domain** (add the DNS records it
gives you). Until the domain is verified, emails from `noreply@ad-ascent.com`
will not deliver. The `from` address is `site.fromEmail` in `src/config.ts`.

> While testing before domain verification, you can temporarily set
> `site.fromEmail` to `onboarding@resend.dev` (Resend's shared test sender).

### No-JS behaviour

With JavaScript enabled, the form submits via `fetch` and shows inline
success/error without reload. With JS disabled, it does a normal `POST` and the
serverless route redirects to `/thanks`. A honeypot field (`company_website`)
silently drops bot submissions.

### Alternative (zero backend)

If you ever want to drop the serverless function, [Web3Forms](https://web3forms.com)
is a drop-in static alternative (point the form `action` at your Web3Forms
endpoint). The Resend + serverless route is the primary solution here because the
domain is owned.

---

## Deploy to Vercel

1. Push the repo to GitHub/GitLab and **import the project in Vercel**. The
   `@astrojs/vercel` adapter is already configured — no extra settings needed.
2. Add the environment variable in **Project → Settings → Environment Variables**:
   - `RESEND_API_KEY = re_xxxx…`
3. Deploy. Everything is prerendered static except `/api/contact`, which runs as a
   serverless function.
4. **Custom domain:** Project → Settings → Domains → add `ad-ascent.com` and follow
   the DNS instructions.

`npm run build` already targets the Vercel adapter, so the output is
deploy-ready out of the box.

---

## SEO

- One `<h1>`, semantic landmarks, descriptive `alt`/`aria-label`s
- Canonical + Open Graph + Twitter tags (image: `/og-image.png`, 1200×630)
- JSON-LD: `ProfessionalService` (Organization) + `FAQPage`
- `sitemap-index.xml` via `@astrojs/sitemap`, plus `public/robots.txt`
- Self-hosted Inter font, lazy assets, transform/opacity-only animations

## Lighthouse

Run Lighthouse against the production build:

```bash
npm run lighthouse   # builds, then runs Lighthouse CI against ./dist/client
```

Config is in `lighthouserc.json`. Assertions: Accessibility / Best-Practices /
SEO must be ≥ 0.95 (hard fail); Performance is a warning at ≥ 0.90 (it's
hardware/network-sensitive, so the real number is best measured on the deployed
Vercel URL). Reports are written to `.lighthouseci/` (git-ignored).

Latest local run (avg, both prerendered pages): **Performance 100 · Accessibility
100 · Best Practices 100 · SEO 100**.

A GitHub Actions workflow (`.github/workflows/lighthouse.yml`) runs the same
check on every push to `main` and every PR, and uploads the reports as an
artifact.

---

## ✅ TODO / placeholders to fill in

Search the project for these:

- [ ] `{{LINKEDIN_URL}}` in `src/config.ts` — real company LinkedIn URL
- [ ] `RESEND_API_KEY` — set in `.env` locally **and** in the Vercel dashboard
- [ ] Verify **ad-ascent.com** as a sending domain in Resend before go-live
- [ ] (Optional) Point `og-image` / favicon to updated art if branding changes
