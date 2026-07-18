/* =============================================================================
   Ad-Ascent — Site configuration (single source of truth)
   -----------------------------------------------------------------------------
   Every swappable value and every repeated content block lives here and is
   imported by the components. No magic strings scattered across markup.
   ============================================================================= */

/** Production URL — used for canonical, Open Graph, sitemap. Change in ONE place. */
export const SITE_URL = "https://ad-ascent.com";

export const site = {
  name: "Ad-Ascent",
  tagline: "Modern digital services. Clean and professional.",
  url: SITE_URL,
  /** Form submissions are emailed here (see src/pages/api/contact.ts). */
  contactEmail: "info@ad-ascent.com",
  /** Verified sending address on the ad-ascent.com domain in Resend. */
  fromEmail: "Ad-Ascent <noreply@ad-ascent.com>",
  description:
    "Ad-Ascent runs Google Ads for HVAC companies — turning high-intent searches into booked jobs with sharp campaign structure, conversion tracking, and relentless optimization.",
  whatsapp: {
    number: "917014979569", // +91 70149 79569, no + or spaces for wa.me
    defaultMessage:
      "Hi Ad-Ascent, I'm interested in getting more qualified leads for my HVAC business through Google Ads.",
  },
  linkedinUrl: "{{LINKEDIN_URL}}", // TODO: replace with real LinkedIn URL
} as const;

/** Built href for the floating WhatsApp button. */
export const whatsappHref = `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(
  site.whatsapp.defaultMessage,
)}`;

/** Header nav — anchor links that smooth-scroll to sections on the same page. */
export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "How We Work", href: "#how-we-work" },
  { label: "FAQ", href: "#faq" },
] as const;

/** Section ids observed by the scroll-spy (order matters). */
export const spySections = [
  "home",
  "problem",
  "focus",
  "why",
  "how-we-work",
  "services",
  "faq",
  "contact",
] as const;

/* --------------------------------- Hero ---------------------------------- */

export const hero = {
  eyebrow: "Welcome to Ad-Ascent",
  titleLead: "Google Ads That Bring More Qualified Leads to Your ",
  titleHighlight: "HVAC Business.",
  subhead:
    "We help HVAC companies turn high-intent Google searches into booked jobs — not just clicks.",
  primaryCta: { label: "Book a Strategy Call", href: "#contact" },
  secondaryCta: { label: "See How We Work", href: "#how-we-work" },
  /** KPI cards in the faux dashboard — value counts up when in view. */
  kpis: [
    { label: "Cost / Lead", value: 38, prefix: "$", suffix: "", trend: "down" },
    { label: "Booked Jobs", value: 214, prefix: "", suffix: "", trend: "up" },
    { label: "Conversion Rate", value: 23.8, suffix: "%", decimals: 1, trend: "up" },
  ],
  /** Typewriter query used by the signature search→ad→booked animation. */
  searchQuery: "hvac repair near me",
} as const;

/* -------------------------------- Problem -------------------------------- */

export const problem = {
  title: "Running Google Ads But Not Getting Enough Jobs?",
  lead: "Many HVAC businesses waste advertising budget because of:",
  points: [
    "Poor campaign structure",
    "Weak landing pages",
    "Missing conversion tracking",
    "No optimization",
    "No visibility into what actually generates revenue",
  ],
} as const;

/* --------------------------------- Focus --------------------------------- */

export const focus = {
  overline: "We Focus On One Thing",
  title: "Turning Search Intent Into Booked Jobs",
  cards: [
    {
      icon: "search",
      title: "Google Ads",
      body: "Capture high-intent searches.",
    },
    {
      icon: "target",
      title: "Conversion Optimisation",
      body: "Turn more visitors into phone calls and lead form submissions.",
    },
    {
      icon: "chart",
      title: "Performance Tracking",
      body: "Know exactly where your leads come from.",
    },
  ],
  improveNote: "Improve",
} as const;

/* --------------------------------- Why ----------------------------------- */

export const why = {
  title: "Why Ad-Ascent?",
  cards: [
    {
      icon: "data",
      title: "Data First",
      body: "Every decision backed by data.",
    },
    {
      icon: "shield",
      title: "Transparent",
      body: "No long contracts. No hidden fees.",
    },
    {
      icon: "bolt",
      title: "Performance",
      body: "Focused on qualified leads, not vanity metrics.",
    },
  ],
} as const;

/* ----------------------------- How We Work ------------------------------- */

export const process = {
  title: "How We Work",
  steps: [
    { n: "01", title: "Discovery", body: "Understand your business." },
    { n: "02", title: "Audit", body: "Review campaigns, website and tracking." },
    { n: "03", title: "Optimize", body: "Improve campaigns and landing pages." },
    { n: "04", title: "Grow", body: "Continuous testing and optimization." },
  ],
} as const;

/* -------------------------------- Services ------------------------------- */

export const services = {
  title: "Services",
  core: {
    label: "Core Service",
    title: "Google Ads Management",
    body: "The engine. Search campaigns engineered around high-intent HVAC keywords, tight ad groups, and revenue-focused bidding — built to book jobs.",
  },
  supportingLabel: "Supporting Services",
  supporting: [
    {
      icon: "layout",
      title: "Landing Page Optimisation",
      body: "Pages built to convert clicks into calls and form fills.",
    },
    {
      icon: "code",
      title: "Website Development & Management",
      body: "Fast, clean sites when your current one holds leads back.",
    },
    {
      icon: "chart",
      title: "Analytics & Tracking",
      body: "Conversion tracking that ties spend to booked revenue.",
    },
    {
      icon: "search",
      title: "SEO",
      body: "Organic visibility that compounds alongside paid.",
    },
  ],
  note: "These are available when needed — not sold as standalone services.",
} as const;

/* ---------------------------------- FAQ ---------------------------------- */

export const faq = {
  title: "FAQ",
  items: [
    {
      q: "Do you only work with HVAC companies?",
      a: "Currently we're only accepting 🏠 HVAC companies. Soon expanding our digital services for 🔧 Plumbing companies and ⚡ Electricians.",
    },
    {
      q: "Do you require long-term contracts?",
      a: "No. We prefer to work on a month-to-month basis. If you like our services, we renew our contract.",
    },
    {
      q: "Do you work with businesses outside the US?",
      a: "Yes.",
    },
    {
      q: "What makes Ad-Ascent different from other marketing agencies?",
      a: "We don't try to be everything to everyone. We focus on helping home service businesses (HVAC companies) generate more booked jobs through Google Ads. Every recommendation we make — from campaign optimisation to landing page improvements and conversion tracking — is measured against one goal: generating more qualified leads.",
    },
    {
      q: "Do you build websites?",
      a: "Yes, when it's necessary to improve lead generation.",
    },
  ],
} as const;

/* -------------------------------- Contact -------------------------------- */

export const contact = {
  title: "Ready to generate more qualified leads?",
  subtitle: "Book a strategy call.",
  blurb:
    "Tell us about your HVAC business and where your Google Ads stand today. We'll reply with a clear, no-pressure plan to turn more searches into booked jobs.",
  budgetOptions: ["< $1k", "$1k–3k", "$3k–10k", "$10k+"],
} as const;
