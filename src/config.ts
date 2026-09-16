/* =============================================================================
   Ad-Ascent — Site configuration (single source of truth)
   -----------------------------------------------------------------------------
   All copy + links live here and are imported by the components.
   Source of truth for wording: updated v2.4.
   ============================================================================= */

/** Production URL — canonical / OG / sitemap. Change in ONE place. */
export const SITE_URL = "https://ad-ascent.com";

export const site = {
  name: "Ad-Ascent",
  tagline: "Making the trust you've earned offline obvious online.",
  url: SITE_URL,
  /** Form submissions are emailed here (see src/pages/api/contact.ts). */
  contactEmail: "info@ad-ascent.com",
  /** Verified sending address on the ad-ascent.com domain in Resend. */
  fromEmail: "Ad-Ascent <noreply@ad-ascent.com>",
  description:
    "Ad-Ascent helps trustworthy home service businesses become equally trustworthy online — making the trust you've earned offline obvious, from the first Google search to the moment a customer chooses you.",
  whatsapp: {
    number: "919057433314", // +91 90574 33314, no + or spaces for wa.me
    defaultMessage:
      "Hi Ad-Ascent, I'd like to start a conversation about my home service business.",
  },
  linkedinUrl: "{{LINKEDIN_URL}}", // TODO: replace with real LinkedIn URL
} as const;

/** Built href for the floating WhatsApp button. */
export const whatsappHref = `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(
  site.whatsapp.defaultMessage,
)}`;

/** Header nav — anchor links that smooth-scroll to sections on the same page. */
export const navLinks = [
  { label: "Why", href: "#why" },
  { label: "How", href: "#how" },
  { label: "Team", href: "#team" },
  { label: "Questions", href: "#questions" },
] as const;

/** The single primary action. */
export const ctaLink = { label: "Let's Talk", href: "#contact" } as const;

/** Section ids observed by the scroll-spy (order matters). */
export const spySections = [
  "home",
  "why",
  "how",
  "team",
  "conversation",
  "questions",
  "contact",
] as const;

/* --------------------------------- Hero ---------------------------------- */

export const hero = {
  eyebrow: "Welcome to Ad-Ascent",
  beliefLine1: "The trust you've earned offline",
  beliefLine2Lead: "should be ",
  beliefLine2Highlight: "obvious online.",
  observation: "We help businesses acquire customers through the internet.",
  help: "We build websites, manage Google Ads, and help customers find you through organic search.",
} as const;

/* --------------------------------- Why ----------------------------------- */

export const why = {
  overline: "Why we started",
  heading: "Digital presence doesn't always reflect the actual business.",
  observations: [
    {
      title: "Trust takes years to build. Visitors decide in seconds.",
      body: "Businesses spend years earning trust. The stories, reviews, experienced people and reputation behind that trust often remain invisible to someone visiting for the first time. Yet those first few seconds shape whether they stay or leave.",
    },
    {
      title: "Customers only see fragments of your business.",
      body: "Customers never experience your business all at once. They arrive through one search, land on one page and make a judgement from one small part of the whole. Every page should strengthen their confidence, not leave them guessing.",
    },
    {
      title: "Customers experience different versions of your business.",
      body: "Customers don't separate your ads, website, blogs, visuals and reviews. They experience one business. Every touchpoint should reinforce the same story.",
    },
    {
      title: "Businesses evolve. Digital presence doesn't.",
      body: "Your business keeps learning. New reviews appear, better processes emerge, your team gains experience. Your digital presence should evolve alongside it, not slowly drift out of date.",
    },
  ],
  closing:
    "Closing that gap isn't about adding more marketing. It's about helping every part of your digital presence work together.",
  bridge: "That's exactly why Ad-Ascent exists.",
} as const;

/* -------------------------------- Article -------------------------------- */

export const article = {
  href: "/articles/understanding-your-business-online-presence",
  overline: "Understanding your business's online presence",
  lead: "Before deciding what to build, understand what your business needs the internet to do.",
  teaser:
    "Your online presence is more than a website, social media account, or Google listing. This article explores how people encounter businesses online, the different roles digital environments can play, and how to work out what your business actually needs.",
  cta: "Read the article",
  title: "Understanding your business's online presence",
  description:
    "An online presence isn't a checklist of assets. It's how your business can be encountered on the internet — and what it needs the internet to do. A guide to working that out before you decide what to build.",
  /** Left rail table of contents. Every `id` must match a section id on the page. */
  toc: [
    {
      id: "one-place",
      label: "People don't experience the internet as one place",
      children: [],
    },
    {
      id: "relationship",
      label: "The relationship between the business and its customers",
      children: [
        {
          id: "arrive-differently",
          label: "People don't always arrive looking for the same thing",
        },
        { id: "environments", label: "Different environments, different opportunities" },
      ],
    },
    {
      id: "infrastructure",
      label: "The right infrastructure depends on the business",
      children: [{ id: "not-all-at-once", label: "Not everything needs to be done at once" }],
    },
    { id: "at-a-glance", label: "What we've learned, at a glance", children: [] },
    { id: "four-businesses", label: "Four businesses, four different problems", children: [] },
  ],
  /** Definition pinned in the left rail so the reader always has the context. */
  definition: {
    title: "What we mean by “customer relationship”",
    paragraphs: [
      "When we talk about the relationship between a business and its customers, we're considering both its existing customers and the people it wants to serve.",
      "Someone doesn't become a customer until they actually choose to do business with you. But the relationship can begin before that, as they discover your business, try to understand what you offer, evaluate it, and decide whether to trust you.",
      "Once they become a customer, the relationship continues through the experience you provide, the support you offer, future purchases, and potentially recommendations.",
    ],
    closing:
      "So when we talk about the customer relationship, we're looking at the whole progression, not just what happens after someone becomes a customer.",
  },
} as const;

/* --------------------------------- How ----------------------------------- */

export const how = {
  overline: "How we close that gap",
  heading: "Customer Acquisition System",
  intro:
    "Google Ads, websites, content writing, SEO, analytics and automation are different parts of the same customer acquisition system.",
  intro2: "Every part should help a customer move from searching to choosing your business.",
  diagram: {
    left: {
      label: "Customer's Journey",
      tag: "Google Ads · SEO",
      steps: ["Needs a service", "Searches for a competent provider", "Finds your business"],
    },
    right: {
      label: "Business's Reality",
      tag: "Website Development",
      steps: [
        "A trustworthy business exists",
        "Makes that trust visible online",
        "Customers discover you",
      ],
    },
    converge: "Customer chooses you",
    learn: {
      title: "Business learns",
      body: "We track what happens and understand what matters.",
      tag: "Analytics & Tracking",
    },
    improve: {
      title: "Optimise & improve",
      body: "We improve campaigns, website and customer experience.",
      tag: "Optimisation & Automation",
    },
  },
  philosophy: [
    {
      title: "Attract the Right Customer",
      tag: "Ads · SEO",
      lines: [
        "Not every click creates a customer, so we optimise for finding the right conversations.",
        "Someone looking for emergency AC repair is fundamentally different from someone researching a replacement system - treating them the same wastes attention, budget and learning.",
      ],
    },
    {
      title: "Earn the Right to Be Chosen",
      tag: "Website · Content writing",
      lines: [
        "Getting found is only half the job.",
        "Once someone finds you, your website has one responsibility - reduce uncertainty and build confidence.",
      ],
    },
    {
      title: "Learn From Every Interaction",
      tag: "Tracking & Analytics",
      lines: [
        "Every interaction contains information about customer behaviour, search intent and trust.",
        "Tracking simply reveals which searches, pages and campaigns are consistently creating booked jobs.",
      ],
    },
    {
      title: "Improve the Entire System",
      tag: "Optimisation & Automation",
      lines: [
        "Small improvements, measured over time, compound into better customer experience, lower acquisition costs, higher conversion rates and more booked jobs.",
        "That's why optimisation isn't a separate service - it's how the entire system becomes smarter over time.",
      ],
    },
  ],
  closing: "When every part of the system improves, your business naturally follows.",
} as const;

/* --------------------------------- Team ---------------------------------- */

export const team = {
  overline: "The Team",
  transitionLead: "Ad-Ascent is new.",
  transitionEmphasis: "The way we work isn't.",
  intro:
    "Behind every recommendation is a small team with different areas of expertise, but a shared way of thinking.",
  members: [
    {
      name: "Animesh",
      initials: "AN",
      photo: "/team/animesh.jpg",
      role: "Research, Strategy & Content",
      quote: "Researches businesses until he understands what makes customers trust them.",
    },
    {
      name: "Dinesh",
      initials: "DI",
      photo: "/team/dinesh.jpg",
      role: "Website Development & Design",
      quote: "Builds websites that remove uncertainty instead of adding decoration.",
    },
    {
      name: "Abhishek",
      initials: "AB",
      photo: "/team/abhishek.jpg",
      role: "Ads & Optimization",
      quote: "Turns search intent into profitable Google Ads campaigns.",
    },
  ],
  experience: [
    { value: "$1M+", label: "in ad spend managed" },
    { value: "100+", label: "website projects" },
  ],
  conclusion: "Every recommendation we make follows the same philosophy you've just seen.",
} as const;

/* ---------------------------- First Conversation ------------------------- */

export const conversation = {
  overline: "The First Conversation",
  opening: "Everything begins with a conversation.",
  steps: [
    {
      title: "Start the conversation",
      body: "Begin with a simple conversation about your business.",
    },
    {
      title: "Build understanding",
      emphasis: true,
      body: "Discover how customers find - and choose - you today. This is where we spend the most time.",
      questions: [
        "What is your perspective on your business?",
        "Where is your business today, and where do you think it's headed?",
        "Where do you want it to be?",
      ],
    },
    {
      title: "Identify the next priority",
      body: "We'll identify what's limiting growth - and what to improve first.",
    },
    {
      title: "Choose the next step",
      body: "Move forward only if we're the right fit.",
    },
  ],
  conclusion:
    "Whether we work together or not, you'll leave with a clearer understanding of what comes next.",
  belief: "Clarity comes before commitment.",
} as const;

/* ------------------------- Questions (FAQ) ------------------------------- */

export const questions = {
  overline: "Frequently Asked Questions",
  heading: "Questions you might still have",
  items: [
    {
      q: "Everything isn't perfect… but it's working. Why should I risk changing it?",
      a: "We don't begin by changing things. We begin by understanding them. Our job is to understand what's already helping your business, protect it, and improve only where it genuinely makes a difference. The goal isn't change — it's helping your business move forward without disrupting what's already working.",
    },
    {
      q: "How do I know you're recommending what's best for my business — and not just trying to sell me another service?",
      a: "We don't know what's best for your business — not before we've understood it. That's why the first conversation isn't about deciding whether you need Google Ads, a new website, or anything else. It's about understanding how your business attracts customers today, what's already working, and where the biggest opportunities actually are. Our recommendations should fit your business, not our service list.",
    },
    {
      q: "Every agency says they're different. Why should I believe you?",
      a: "You shouldn't believe us because we say we're different. Judge us by the way we think, the questions we ask, and the recommendations we make. We'd rather earn your trust through the experience than ask for it upfront.",
    },
    {
      q: "What if, after looking at my business, you genuinely think you can't help me?",
      a: "Not every business needs every service, and we're comfortable saying that. If we don't think we're the right fit, we'd rather leave you with clarity than take on work we can't stand behind. The right partnership starts with honesty — not obligation.",
    },
    {
      q: "I have a business to run. Am I about to create another full-time job for myself?",
      a: "No. The goal is to reduce complexity — not add to it. We'll need your input where it matters, especially at the beginning. After that, you'll stay informed through clear, concise updates, while conversations are reserved for decisions that genuinely benefit from discussion. Working together should free up your attention — not compete for it.",
    },
    {
      q: "We're already working with someone. Does that mean we can't work together?",
      a: "Not at all. If your current team is doing something well, we'll build on it — not replace it. The goal is to strengthen your business, not replace the people already helping it.",
    },
    {
      q: "If we decide to do this… what should I realistically expect?",
      a: "You should expect steady progress — not overnight promises. Some improvements happen quickly, others take time, depending on where your business is today. What you should always expect is clarity on what we're doing, why we're doing it, and whether it's making a measurable difference. Our goal isn't just better marketing — it's better business outcomes.",
    },
    {
      q: "How does all of this actually work — pricing, payments, the practical stuff?",
      a: "Once we've understood your business and agreed on the scope of work, we'll put everything into a clear proposal — what we'll be working on, how we'll work together, timelines, pricing, and payment. Nothing starts until we're both clear on the plan. The practical side should feel just as straightforward as the work itself.",
    },
    {
      q: "Do you require long-term contracts?",
      a: "No. We'd rather continue working together because the partnership is creating value — not because a contract says you have to.",
    },
    {
      q: "Why only home service businesses?",
      a: "Because depth matters. By focusing on one industry, we spend less time learning how the business works and more time improving how it grows.",
    },
  ],
} as const;

/* -------------------------- Final CTA — contact -------------------------- */

export const contact = {
  closingLead: "Whenever you're ready,",
  closingHighlight: "we'll be here.",
  points: [
    "We'd rather earn your trust through results than ask for it upfront.",
    "Technology should make your business feel more personal—not less.",
    "Continuous learning—not one-time redesigns.",
  ],
  buttonLabel: "Start the Conversation",
} as const;
