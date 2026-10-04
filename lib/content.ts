/**
 * Single source of truth for site copy. Facts come from James's CV (Sept 2026).
 * Guardrails: no job-search signals, no phone/DOB, no internal Oxinus details
 * (client names, team size), Hubtel was integrated (not built), Hisab is a
 * financial wellness app described through user outcomes, never "advice".
 */

export type Metric = { value: string; label: string };

export type Shot = { src: string; alt: string; frame: "phone" | "browser"; w: number; h: number };

const phone = (src: string, alt: string): Shot => ({ src, alt, frame: "phone", w: 720, h: 1564 });

export type Venture = {
  slug: string;
  name: string;
  role: string;
  period: string;
  place: string;
  kind: string;
  tagline: string;
  summary: string;
  url?: string;
  urlLabel?: string;
  accent: string; // used for the poster gradient on cards and case-study heroes
  accent2: string;
  /** title gradient, in the style of the original site's project titles */
  gradient: [string, string];
  /** real product screenshots, first one is the cover */
  shots: Shot[];
  metrics: Metric[];
  problem: string;
  built: { title: string; body: string }[];
  ai?: { title: string; body: string }[];
  stack: string[];
  credit?: string;
};

export const VENTURES: Venture[] = [
  {
    slug: "verinvo",
    name: "Verinvo",
    role: "Lead Frontend Engineer · Oxinus Holdings (IHC Group)",
    period: "2024 — now",
    place: "Abu Dhabi",
    kind: "National e-invoicing platform",
    tagline: "The front end of the UAE's move to mandatory e-invoicing.",
    summary:
      "I lead frontend on Verinvo, the Ministry of Finance-accredited, blockchain-based e-invoicing platform for the UAE's B2B and B2G compliance system — and helped build its AI agent.",
    accent: "#2B59C3",
    accent2: "#0E1A3A",
    gradient: ["#1E3A8A", "#2B59C3"],
    shots: [
      {
        src: "/work/verinvo/mcp.webp",
        alt: "Verinvo API Hub in Arabic: the MCP server documentation page",
        frame: "browser",
        w: 1440,
        h: 900,
      },
      {
        src: "/work/verinvo/api-hub.webp",
        alt: "Verinvo API Hub home page in Arabic",
        frame: "browser",
        w: 1440,
        h: 540,
      },
    ],
    metrics: [
      { value: "MoF", label: "accredited platform" },
      { value: "29", label: "tools in the Oxigen MCP server" },
      { value: "B2B · B2G", label: "compliance flows" },
    ],
    problem:
      "E-invoicing in the UAE is becoming mandatory. Businesses need to issue, receive and reconcile invoices that satisfy a national standard — without the software getting in the way of their actual work.",
    built: [
      {
        title: "Frontend leadership",
        body: "Own the frontend of the platform: architecture, delivery and quality across the invoicing, compliance and admin surfaces.",
      },
      {
        title: "Shared RBAC package",
        body: "Built and maintain the role-based access package every Oxinus product team builds on, so permissions behave the same everywhere.",
      },
      {
        title: "Transactional email infrastructure",
        body: "Built the email layer used across the platform suite.",
      },
      {
        title: "AI-assisted delivery",
        body: "Introduced the AI-assisted development workflows the Verinvo frontend team uses every day.",
      },
      {
        title: "Arabic and English, properly",
        body: "Bilingual UI with Arabic visual baselines for every public page, and a PINT-AE print invoice that comes out identical from either UI language.",
      },
      {
        title: "Off Webflow",
        body: "Moved company websites from Webflow to custom code, removing a subscription dependency.",
      },
    ],
    ai: [
      {
        title: "Ask Verinvo",
        body: "An AI agent embedded in the platform that answers questions and acts on the user's behalf. Built with our product, MCP-tooling and backend colleagues.",
      },
      {
        title: "Oxigen MCP server",
        body: "29 tools, dual transport and per-user API-key threading — so AI agents act on the platform with each user's own permissions, never more.",
      },
    ],
    stack: ["TypeScript", "React", "Next.js", "MCP", "RBAC", "pnpm monorepo"],
    credit: "Ask Verinvo is a team effort with Oxinus product, MCP-tooling and backend colleagues.",
  },
  {
    slug: "hisab",
    name: "Hisab",
    role: "Co-founder & Product Lead",
    period: "2025 — now",
    place: "UAE · iOS & Android",
    kind: "Financial wellness app",
    tagline: "Debt is a maths problem, not a character flaw.",
    summary:
      "A financial wellness app helping UAE residents get to a debt-free date — on their own numbers, in their own language, without creating an account.",
    url: "https://gethisab.com",
    urlLabel: "gethisab.com",
    accent: "#1F8A70",
    accent2: "#082A22",
    gradient: ["#0F5C4A", "#1F8A70"],
    shots: [
      phone("/work/hisab/home.webp", "Hisab home: what you still owe and the next best payment"),
      phone(
        "/work/hisab/coach.webp",
        "Hisab's AI coach answering a question about an over-limit credit card",
      ),
      phone("/work/hisab/ledger.webp", "Hisab debt ledger with a debt-free date"),
      phone("/work/hisab/aecb.webp", "Hisab reading an AECB credit report"),
      phone("/work/hisab/privacy.webp", "Hisab privacy and data settings"),
    ],
    metrics: [
      { value: "1M", label: "residents debt-free by 2030 — the mission" },
      { value: "Every", label: "Arabic dialect, spoken back by Sawt" },
      { value: "0", label: "accounts needed" },
    ],
    problem:
      "Millions of UAE residents juggle cards, loans, BNPL plans and money owed to friends — often in a second language, with letters from banks that are hard to read and no one neutral to ask.",
    built: [
      {
        title: "Know what to pay first",
        body: "Every card, loan, BNPL plan and personal debt in one place, with a single debt-free date and a clear order: legal notices, then overdue, then highest rate.",
      },
      {
        title: "Walk into the bank prepared",
        body: "The payment-arrangement or settlement request is already written, ready to send.",
      },
      {
        title: "Understand your own paperwork",
        body: "Upload a bank statement to see where the money went, or an AECB credit report to see what's really in it — with an action plan.",
      },
      {
        title: "Stop missing dates",
        body: "Reminders with proof-of-payment, auto-completed from uploaded statements.",
      },
      {
        title: "Talk money without exposure",
        body: "Circle: a pseudonymous community where UAE residents support each other without ever exposing their finances.",
      },
      {
        title: "Learn before you need it",
        body: "gethisab.com: guides in four languages, a live debt-free-date calculator, a DBR calculator and a settlement calculator — built to be read by people and AI agents alike.",
      },
      {
        title: "Private by design",
        body: "No sign-up, no bank logins, data stays on the device, one tap deletes everything.",
      },
    ],
    ai: [
      {
        title: "AI coach",
        body: "Builds a priority list, cash-flow forecast and payoff comparison, and drafts emails to banks. The user stays in control of every output.",
      },
      {
        title: "Sawt — a voice companion that speaks your dialect",
        body: "Full-duplex voice on Gemini Live that understands and answers in every Arabic dialect, keeps one accent for the whole conversation, lets people switch voice or dialect by asking, and reads a bank statement back to them. It's tool-backed, so it can go back into a document for the detail a summary left out.",
      },
      {
        title: "Privacy-preserving by construction",
        body: "The model only sees anonymised, task-specific context — in text and in voice.",
      },
    ],
    stack: [
      "Expo",
      "React Native",
      "expo-router",
      "Zustand",
      "Drizzle + SQLite",
      "Next.js",
      "AI SDK",
      "Gemini",
      "Gemini Live",
      "ElevenLabs",
      "Stream Chat",
      "PostHog",
    ],
  },
  {
    slug: "drivinginstructor",
    name: "DrivingInstructor.ae",
    role: "Founder",
    period: "2025 — now",
    place: "Abu Dhabi",
    kind: "Marketplace for new drivers",
    tagline: "From first lesson to first year on the road.",
    summary:
      "Abu Dhabi's platform for new drivers — grown to 5,000+ monthly visitors with zero paid spend, entirely through technical and AI SEO.",
    url: "https://drivinginstructor.ae",
    urlLabel: "drivinginstructor.ae",
    accent: "#E4572E",
    accent2: "#3A140A",
    gradient: ["#2563EB", "#7C3AED"],
    shots: [
      phone("/work/drivinginstructor/home.webp", "DrivingInstructor.ae home page on a phone"),
      phone(
        "/work/drivinginstructor/instructors.webp",
        "Browse verified driving instructors in Abu Dhabi",
      ),
      phone(
        "/work/drivinginstructor/license-check.webp",
        "Foreign driving licence eligibility check",
      ),
    ],
    metrics: [
      { value: "5,000+", label: "visitors a month" },
      { value: "250+", label: "instructor contacts a month" },
      { value: "AED 0", label: "paid acquisition" },
    ],
    problem:
      "Expats arriving in Abu Dhabi face the same questions: can I exchange my licence, what will it cost, and how do I find a good instructor who speaks my language?",
    built: [
      {
        title: "Instructor marketplace",
        body: "Licensed, background-checked independent instructors, filterable by area, gender, vehicle type and language (English, Arabic, Urdu, Hindi, Pashto).",
      },
      {
        title: "Answers before anyone asks",
        body: "A foreign-licence eligibility checker, a licence cost calculator covering 195+ countries, and nationality-specific guides.",
      },
      {
        title: "After the licence",
        body: "Service packages for file opening, test bookings and renewals, plus help with insurance, Darb, Mawaqif, car rental and lease-to-own.",
      },
      {
        title: "Trust and measurement",
        body: "Review moderation and fraud detection (260+ verified reviews), an RTL-first multilingual design system, and a PostHog model for delayed, cross-session conversion.",
      },
    ],
    ai: [
      {
        title: "A site AI agents can read",
        body: "Every page negotiates clean markdown for agents (Accept headers, .md URLs, llms.txt, Link alternates), so answer engines can cite it accurately.",
      },
      {
        title: "AI-era SEO",
        body: "About two-thirds of learners who contact an instructor arrive straight from Google. Growth comes from technical and AI SEO in English and Arabic.",
      },
    ],
    stack: ["Next.js", "TypeScript", "Tailwind", "PostHog", "Structured data", "RTL"],
  },
  {
    slug: "dawurobo",
    name: "Dawurobo",
    role: "VP of Engineering & Equity Partner",
    period: "2021 — now",
    place: "Ghana · remote",
    kind: "Logistics & commerce platform",
    tagline: "Last-mile delivery, payments and commerce for Ghana.",
    summary:
      "I lead the engineering team behind Dawurobo's delivery, bulk SMS, payments and e-commerce products — web and mobile.",
    url: "https://dawurobo.com",
    urlLabel: "dawurobo.com",
    accent: "#378CBC",
    accent2: "#0B2433",
    gradient: ["#378CBC", "#45B28C"],
    shots: [
      phone("/work/dawurobo/home.webp", "Dawurobo X home: shop, delivery, tracking and more"),
      phone("/work/dawurobo/shop.webp", "Dawurobo Safe marketplace of verified businesses"),
      phone("/work/dawurobo/orders.webp", "Dawurobo order history"),
      phone("/work/dawurobo/secure.webp", "Dawurobo secure checkout confirmation"),
    ],
    metrics: [
      { value: "GH₵3M+", label: "processed via Hubtel" },
      { value: "GH₵1M", label: "in 3 days, one campaign" },
      { value: "GH₵2.5M", label: "storefront sales in 2 months" },
    ],
    problem:
      "Moving parcels and payments reliably across Ghana means dealing with handwritten labels, bulk orders from vendors and payment rails that have to just work.",
    built: [
      {
        title: "Team leadership",
        body: "Lead engineering across last-mile delivery, bulk SMS, payments and e-commerce, working directly with operations and the founders.",
      },
      {
        title: "Payments",
        body: "Integrated Hubtel payments across the platform — GH₵3M+ processed, including GH₵1M in three days for a single client campaign.",
      },
      {
        title: "Storefronts",
        body: "E-commerce storefronts that generated GH₵2.5M in sales within two months.",
      },
      {
        title: "Dawurobo X",
        body: "The Expo app for customers and riders, shipped to the stores — most recently 2.5.0 on Expo SDK 57 with native sheets and controls.",
      },
      {
        title: "Reliability",
        body: "Traced ~95M monthly Firestore reads to unbounded queries, and ran a responsible security disclosure end to end.",
      },
    ],
    ai: [
      {
        title: "Parcel-photo booking",
        body: "Staff and customers photograph a parcel; the app extracts recipient, address, phone and amount. Bulk orders got much faster.",
      },
      {
        title: "PII-blind growth agent",
        body: "A weekly agent drafts vendor re-engagement campaigns without ever seeing customer personal data.",
      },
    ],
    stack: ["React", "Next.js", "Expo", "Firebase", "Firestore", "Hubtel", "LLM extraction"],
  },
  {
    slug: "oja-studios",
    name: "OJA Studios",
    role: "Founder",
    period: "Ongoing",
    place: "Ghana",
    kind: "Documentary production",
    tagline: "Stories of Africans who built something.",
    summary:
      "A documentary production company in Ghana behind The Rise Of, a series on successful Ghanaians and Africans.",
    // TODO(james): add the OJA Studios YouTube channel URL
    accent: "#B5432F",
    accent2: "#2A0F0A",
    gradient: ["#B5432F", "#E6AF2E"],
    shots: [],
    metrics: [
      { value: "The Rise Of", label: "documentary series" },
      { value: "Ghana", label: "where it's made" },
    ],
    problem:
      "African success stories are usually told from the outside, if at all. OJA Studios tells them from home, at documentary quality.",
    built: [
      {
        title: "The Rise Of",
        body: "Long-form documentaries on Ghanaians and Africans who built something worth studying.",
      },
      {
        title: "Production craft",
        body: "Editing guides and a repeatable production workflow for a small team.",
      },
    ],
    stack: ["Production", "Editing", "YouTube"],
  },
];

export const AI_SYSTEMS: {
  name: string;
  where: string;
  input: string;
  does: string;
  output: string;
  wide?: boolean;
}[] = [
  {
    name: "Sawt",
    where: "Hisab",
    wide: true,
    input: "Someone speaking, in any Arabic dialect",
    does: "Full-duplex voice on Gemini Live, tool-backed",
    output: "Answers in their dialect, with their own numbers",
  },
  {
    name: "Ask Verinvo",
    where: "Verinvo",
    input: "A question from an invoicing user",
    does: "Agent with MCP tools, scoped to the user",
    output: "Answers and actions on the platform",
  },
  {
    name: "Oxigen MCP",
    where: "Verinvo",
    input: "Agent tool calls",
    does: "29 tools · dual transport · per-user keys",
    output: "Agents act with the user's own permissions",
  },
  {
    name: "Hisab coach",
    where: "Hisab",
    input: "Anonymised debts, statements, AECB report",
    does: "Prioritise, forecast, compare, draft",
    output: "A plan and a letter to the bank",
  },
  {
    name: "Parcel-photo booking",
    where: "Dawurobo",
    input: "A photo of a parcel label",
    does: "Structured extraction",
    output: "Recipient, address, phone, amount",
  },
  {
    name: "Growth agent",
    where: "Dawurobo",
    input: "Vendor activity, no customer PII",
    does: "Weekly campaign drafting",
    output: "Re-engagement campaigns, ready to review",
  },
  {
    name: "Agent-readable web",
    where: "DrivingInstructor.ae",
    input: "An AI agent fetching a page",
    does: "Content negotiation, .md URLs, llms.txt",
    output: "Clean markdown answer engines can cite",
    wide: true,
  },
];

export const EXPERIENCE = [
  {
    role: "Lead Frontend Engineer",
    org: "Oxinus Holdings (IHC Group)",
    place: "Abu Dhabi",
    period: "Feb 2024 — now",
    note: "Verinvo, Ask Verinvo, Oxigen MCP, shared RBAC",
  },
  {
    role: "Co-founder & Product Lead",
    org: "Hisab",
    place: "UAE",
    period: "2025 — now",
    note: "Idea to App Store and Google Play",
  },
  {
    role: "Founder",
    org: "DrivingInstructor.ae",
    place: "Abu Dhabi",
    period: "2025 — now",
    note: "5,000+ monthly visitors, zero paid spend",
  },
  {
    role: "VP of Engineering & Equity Partner",
    org: "Dawurobo",
    place: "Ghana · remote",
    period: "Mar 2021 — now",
    note: "Delivery, payments, commerce, AI booking",
  },
  {
    role: "Frontend Engineer",
    org: "DAT Engineering Consultancy / Yallah Property",
    place: "Dubai & Abu Dhabi",
    period: "Sep 2022 — Jan 2024",
    note: "Geofenced attendance app, internal ops platform, property marketplace",
  },
  {
    role: "Frontend Development Manager",
    org: "Hexlen",
    place: "Remote",
    period: "Apr 2021 — Jan 2022",
    note: "Led a small frontend team on client projects",
  },
  {
    role: "Web Developer",
    org: "MCAT Global",
    place: "Remote",
    period: "Nov 2020 — Mar 2022",
    note: "Web apps and UI for client projects",
  },
] as const;

export const SKILLS = [
  { group: "Languages", items: ["TypeScript", "JavaScript", "Python (scripting)", "HTML", "CSS"] },
  {
    group: "Frontend & mobile",
    items: ["React", "Next.js", "React Native", "Expo", "Tailwind CSS", "NativeWind"],
  },
  {
    group: "Backend & data",
    items: [
      "Node.js",
      "REST APIs",
      "Postgres (Neon)",
      "SQLite",
      "Drizzle ORM",
      "Firebase / Firestore",
    ],
  },
  {
    group: "Applied AI",
    items: [
      "Vercel AI SDK",
      "Gemini",
      "Claude API & Claude Code",
      "MCP servers",
      "Agentic workflows",
      "Structured extraction",
    ],
  },
  { group: "Blockchain", items: ["ADI Chain (IHC L2)", "Viem", "Solidity basics"] },
  {
    group: "Tools",
    items: ["Git", "Vercel", "EAS", "PostHog", "RevenueCat", "Figma", "pnpm monorepos", "CI/CD"],
  },
] as const;

export const ARCHIVE = [
  {
    name: "BG Empire",
    note: "Headless Shopify store with a personaliser, abandoned-checkout follow-up and a Google Shopping feed",
    stack: "Next.js · Shopify",
  },
  {
    name: "Personal VPN",
    note: "Expo Android client for a self-hosted WireGuard server",
    stack: "Expo · WireGuard",
  },
  {
    name: "SkinPlus Medspa",
    note: "Marketing site and booking for a medical spa",
    stack: "Next.js · Firebase",
    url: "https://skinplusofficial.com/",
  },
  {
    name: "Dawurobo Safe",
    note: "Escrow-style protection for buying from strangers online",
    stack: "Next.js · Firebase",
    url: "https://safe.dawurobo.com/",
  },
] as const;

export const HERO_STATS: Metric[] = [
  { value: "6+", label: "years shipping production web & mobile" },
  { value: "GH₵3M+", label: "processed through payments I integrated" },
  { value: "5,000+", label: "monthly visitors, zero ad spend" },
  { value: "4", label: "languages shipped, RTL-first" },
];
