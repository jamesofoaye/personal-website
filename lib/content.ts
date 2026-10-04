/**
 * Single source of truth for site copy.
 *
 * Voice: James, first person, complete sentences, the way he writes on
 * LinkedIn. No slogans, no sentence fragments, no "poetry".
 *
 * Guardrails: no job-search signals, no phone/DOB, no internal Oxinus details
 * (client names, team size), Hubtel was integrated (not built), Hisab is a
 * financial wellness app described through what people get, never "advice".
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
  /** one complete sentence that says what the product is */
  tagline: string;
  /** two or three sentences, first person */
  summary: string;
  url?: string;
  urlLabel?: string;
  accent: string; // poster gradient, used only when there are no screenshots
  accent2: string;
  /** title gradient, in the style of the original site's project titles */
  gradient: [string, string];
  /** real product screenshots, first one is the cover */
  shots: Shot[];
  metrics: Metric[];
  problem: string;
  builtHeading?: string;
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
    tagline: "Verinvo is the e-invoicing platform I work on every day at Oxinus.",
    summary:
      "I lead the frontend of Verinvo, the Ministry of Finance-accredited e-invoicing platform for the UAE's B2B and B2G compliance system. I also helped build Ask Verinvo, the AI agent inside the platform, together with our product and backend colleagues.",
    accent: "#2B59C3",
    accent2: "#0E1A3A",
    gradient: ["#1E3A8A", "#2B59C3"],
    shots: [
      {
        src: "/work/verinvo/mcp.webp",
        alt: "The MCP server page of the Verinvo API Hub, in Arabic",
        frame: "browser",
        w: 1440,
        h: 900,
      },
      {
        src: "/work/verinvo/api-hub.webp",
        alt: "The home page of the Verinvo API Hub, in Arabic",
        frame: "browser",
        w: 1440,
        h: 540,
      },
    ],
    metrics: [
      { value: "MoF", label: "accredited e-invoicing platform" },
      { value: "29", label: "tools in the Oxigen MCP server" },
      { value: "2", label: "languages, Arabic and English" },
    ],
    problem:
      "E-invoicing is becoming mandatory in the UAE. Every business will need to issue, receive and reconcile invoices that meet a national standard, and the software has to make that easy enough that people can get on with their actual work.",
    built: [
      {
        title: "Leading the frontend",
        body: "I own the frontend of the platform. That covers the architecture, the delivery and the quality of everything users touch, from invoicing to compliance to admin.",
      },
      {
        title: "A shared permissions package",
        body: "I built and maintain the role-based access package that every Oxinus product team uses. Because of it, permissions work the same way across all our products.",
      },
      {
        title: "Email infrastructure",
        body: "I built the transactional email layer that the whole platform suite sends through.",
      },
      {
        title: "Arabic and English",
        body: "The platform works fully in both languages. Every public page has an Arabic visual test, and a printed invoice looks exactly the same whichever language you are using.",
      },
      {
        title: "Working with AI every day",
        body: "I introduced the AI-assisted development workflow that our frontend team now uses daily.",
      },
      {
        title: "Moving off Webflow",
        body: "I moved our company websites from Webflow to our own code, which removed a subscription we no longer needed.",
      },
    ],
    ai: [
      {
        title: "Ask Verinvo",
        body: "Ask Verinvo is an AI agent inside the platform. Users can ask it questions and it can take actions for them. I built it with our product, MCP tooling and backend colleagues.",
      },
      {
        title: "The Oxigen MCP server",
        body: "I built an MCP server for the Verinvo team with 29 tools. Each user's own API key is passed through, so an AI agent can only ever do what that user is allowed to do.",
      },
    ],
    stack: ["TypeScript", "React", "Next.js", "MCP", "RBAC", "pnpm monorepo"],
    credit:
      "Ask Verinvo was built as a team, with colleagues across product, MCP tooling and backend.",
  },
  {
    slug: "hisab",
    name: "Hisab",
    role: "Co-founder & Product Lead",
    period: "2026 — now",
    place: "UAE · iOS & Android",
    kind: "Financial wellness app",
    tagline: "Hisab helps people in the UAE get out of debt, one clear step at a time.",
    summary:
      "Hisab is a financial wellness app for people living in the UAE. It puts all of someone's debts in one place, shows them their debt-free date and tells them which payment to make first. You don't need an account to use it, and your data stays on your phone.",
    url: "https://gethisab.com",
    urlLabel: "gethisab.com",
    accent: "#1F8A70",
    accent2: "#082A22",
    gradient: ["#0F5C4A", "#1F8A70"],
    shots: [
      phone(
        "/work/hisab/home.webp",
        "The Hisab home screen, showing what is still owed and the next payment to make",
      ),
      phone(
        "/work/hisab/coach.webp",
        "Hisab's AI coach answering a question about a credit card that is over its limit",
      ),
      phone("/work/hisab/ledger.webp", "The Hisab debt ledger with a debt-free date"),
      phone("/work/hisab/aecb.webp", "Hisab explaining an AECB credit report"),
      phone("/work/hisab/privacy.webp", "Hisab's privacy and data settings"),
    ],
    metrics: [
      { value: "1M", label: "UAE residents debt-free by 2030 is our mission" },
      { value: "4", label: "languages: English, Arabic, Hindi and Urdu" },
      { value: "0", label: "accounts needed to use the app" },
    ],
    problem:
      "A lot of people in the UAE are paying off credit cards, loans, buy-now-pay-later plans and money borrowed from friends, all at the same time. Many of them are doing it in their second language, with letters from the bank they find hard to follow, and with nobody neutral to ask for help.",
    builtHeading: "What people can do with it",
    built: [
      {
        title: "Know which payment comes first",
        body: "Every card, loan, BNPL plan and personal debt sits in one list with a single debt-free date. Hisab puts legal notices first, then anything overdue, then the highest interest rate.",
      },
      {
        title: "Go to the bank prepared",
        body: "When someone needs a payment break or a settlement, Hisab writes the request for them so they can send it straight to the bank.",
      },
      {
        title: "Understand their own paperwork",
        body: "People can upload a bank statement to see where their money went, or an AECB credit report to see what is really in it, and they get a clear plan back.",
      },
      {
        title: "Stop missing payment dates",
        body: "Reminders come with proof of payment, and they tick themselves off when a new statement shows the payment went through.",
      },
      {
        title: "Talk to people in the same situation",
        body: "Circle is a community inside the app where people support each other under a nickname, without ever showing their finances.",
      },
      {
        title: "Keep everything private",
        body: "There is no sign-up and no bank login. Everything is stored on the phone, and one tap deletes it all.",
      },
    ],
    ai: [
      {
        title: "The AI coach",
        body: "The coach builds a priority list, a cash-flow forecast and a comparison of payoff options, and it can draft emails to banks. The person stays in control of everything it produces.",
      },
      {
        title: "Sawt, the Arabic voice companion",
        body: "Sawt lets people talk to Hisab out loud. It understands and replies in their own Arabic dialect, keeps the same accent for the whole conversation, and can read a bank statement back to them. If a summary leaves something out, Sawt can go back into the document to find it.",
      },
      {
        title: "Privacy built into the AI",
        body: "The AI only ever sees anonymised information for the task at hand. That is true for both text and voice.",
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
    tagline:
      "DrivingInstructor.ae helps new drivers in Abu Dhabi find an instructor and get their licence.",
    summary:
      "DrivingInstructor.ae connects learners in Abu Dhabi with licensed independent instructors and helps them through the licence process. More than 5,000 people visit it every month, and I have not spent anything on ads to get them there.",
    url: "https://drivinginstructor.ae",
    urlLabel: "drivinginstructor.ae",
    accent: "#2563EB",
    accent2: "#1E1B4B",
    gradient: ["#2563EB", "#7C3AED"],
    shots: [
      phone("/work/drivinginstructor/home.webp", "The DrivingInstructor.ae home page on a phone"),
      phone(
        "/work/drivinginstructor/instructors.webp",
        "The list of verified driving instructors in Abu Dhabi",
      ),
      phone(
        "/work/drivinginstructor/license-check.webp",
        "The foreign driving licence eligibility check",
      ),
    ],
    metrics: [
      { value: "5,000+", label: "visitors every month" },
      { value: "250+", label: "learners contact an instructor every month" },
      { value: "AED 0", label: "spent on advertising" },
    ],
    problem:
      "People who move to Abu Dhabi all ask the same questions. Can I exchange my licence from home? How much will it cost? How do I find a good instructor who speaks my language? The answers were spread across many places and hard to trust.",
    built: [
      {
        title: "An instructor marketplace",
        body: "Learners can find licensed, background-checked instructors and filter by area, gender, vehicle type and language, including English, Arabic, Urdu, Hindi and Pashto.",
      },
      {
        title: "Free tools for the first questions",
        body: "I built a checker that tells you whether your foreign licence can be exchanged, a cost calculator that covers more than 195 countries, and guides written for specific nationalities.",
      },
      {
        title: "Help after the licence",
        body: "The site also helps with file opening, test bookings and renewals, and with what comes after you pass, like insurance, Darb, Mawaqif, car rental and lease-to-own.",
      },
      {
        title: "Trust and measurement",
        body: "I built review moderation and fraud detection behind more than 260 verified reviews, a multilingual design system that works right to left, and an analytics model for decisions people make over several visits.",
      },
    ],
    ai: [
      {
        title: "A website AI tools can read",
        body: "Every page can be served as clean text to AI assistants and search tools, so when they answer a question about driving in Abu Dhabi they can quote the site accurately.",
      },
      {
        title: "Growth from search",
        body: "About two out of three learners who contact an instructor come straight from Google. All of that growth comes from technical and AI search work in English and Arabic.",
      },
    ],
    stack: ["Next.js", "TypeScript", "Tailwind", "PostHog", "Structured data", "Right-to-left UI"],
  },
  {
    slug: "dawurobo",
    name: "Dawurobo",
    role: "VP of Engineering & Equity Partner",
    period: "2021 — now",
    place: "Ghana · remote",
    kind: "Logistics & commerce platform",
    tagline: "Dawurobo handles delivery, payments and online selling for businesses in Ghana.",
    summary:
      "I have led engineering at Dawurobo since 2021. My team builds the delivery, bulk SMS, payments and e-commerce products, on both web and mobile, and we work directly with the operations team and the founders.",
    url: "https://dawurobo.com",
    urlLabel: "dawurobo.com",
    accent: "#378CBC",
    accent2: "#0B2433",
    gradient: ["#378CBC", "#45B28C"],
    shots: [
      phone(
        "/work/dawurobo/home.webp",
        "The Dawurobo X home screen with shopping, delivery and tracking",
      ),
      phone("/work/dawurobo/shop.webp", "Verified businesses on the Dawurobo marketplace"),
      phone("/work/dawurobo/orders.webp", "A customer's order history in Dawurobo X"),
      phone("/work/dawurobo/secure.webp", "The secure connection screen in Dawurobo X"),
    ],
    metrics: [
      { value: "GH₵3M+", label: "processed through Hubtel payments" },
      { value: "GH₵1M", label: "processed in 3 days for one campaign" },
      { value: "GH₵2.5M", label: "in storefront sales within 2 months" },
    ],
    problem:
      "Moving parcels and money reliably across Ghana is hard. Labels are often handwritten, vendors send orders in bulk, and payments simply have to work every time.",
    built: [
      {
        title: "Leading the team",
        body: "I lead the engineers who build our last-mile delivery, bulk SMS, payments and e-commerce products.",
      },
      {
        title: "Payments",
        body: "I integrated Hubtel payments across the platform. More than GH₵3M has gone through it so far, including GH₵1M in three days for a single client campaign.",
      },
      {
        title: "Online storefronts",
        body: "The storefronts we built for vendors made GH₵2.5M in sales within their first two months.",
      },
      {
        title: "The Dawurobo X app",
        body: "Dawurobo X is our app for customers and riders. It is live on the App Store and Google Play, and the latest release, 2.5, moved to native controls.",
      },
      {
        title: "Keeping it reliable",
        body: "I traced around 95 million monthly database reads back to queries with no limit on them, and I ran a responsible security disclosure from start to finish.",
      },
    ],
    ai: [
      {
        title: "Booking a delivery from a photo",
        body: "Staff and customers can take a photo of a parcel and the app fills in the recipient, address, phone number and amount. This made bulk orders much faster to book.",
      },
      {
        title: "A growth agent that never sees personal data",
        body: "Every week an AI agent drafts campaigns to bring vendors back, and it does this without ever seeing any customer's personal information.",
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
    tagline: "OJA Studios tells the stories of Ghanaians and Africans who built something.",
    summary:
      "OJA Studios is a documentary production company I started in Ghana. Our main series, The Rise Of, follows Ghanaians and Africans who built something worth learning from, and our YouTube channel has more than 15,000 subscribers.",
    url: "https://www.youtube.com/@ojastudios",
    urlLabel: "youtube.com/@ojastudios",
    accent: "#B5432F",
    accent2: "#2A0F0A",
    gradient: ["#B5432F", "#E6AF2E"],
    shots: [
      {
        src: "/work/oja-studios/channel.webp",
        alt: "The OJA Studios channel on YouTube",
        frame: "phone",
        w: 720,
        h: 1559,
      },
    ],
    metrics: [
      { value: "15K", label: "subscribers on YouTube" },
      { value: "94", label: "videos published" },
      { value: "2", label: "series: The Rise Of and Parliament This Week" },
    ],
    problem:
      "The stories of successful Ghanaians and Africans are often told by people outside the continent, if they are told at all. I wanted them told from home, with care and at documentary quality.",
    builtHeading: "What we make",
    built: [
      {
        title: "The Rise Of",
        body: "The Rise Of is our long-form documentary series. We have covered people like Stonebwoy, Sam George, Nana Ama McBrown, Mr Eazi, Otumfuo Osei Tutu II and Lady Julia Osei Tutu.",
      },
      {
        title: "Parliament This Week",
        body: "Parliament This Week explains what happened in Ghana's parliament, including budget breakdowns taken from the official transcripts.",
      },
      {
        title: "A small team with a clear process",
        body: "We work as a small team in Ghana, with our own editing guides and a production process we can repeat every week.",
      },
    ],
    stack: ["Research", "Scriptwriting", "Editing", "YouTube"],
  },
  {
    slug: "personal-vpn",
    name: "My own VPN",
    role: "Side project",
    period: "2026",
    place: "Google Cloud · Android",
    kind: "Self-hosted VPN",
    tagline: "I built my own VPN because the free one I switched to wasn't good enough.",
    summary:
      "I paid for a family VPN plan from 2022 for me, my mum and my uncle. At the start of 2026 I stopped because of the cost, and the free VPN I moved to was full of ads and kept slowing everything down. So I built my own, using WireGuard on Google Cloud.",
    accent: "#1F2A44",
    accent2: "#0B1020",
    gradient: ["#0E1017", "#4B5563"],
    shots: [],
    metrics: [
      { value: "11", label: "server locations to choose from" },
      { value: "1", label: "location always on, the rest sleep when idle" },
      { value: "2", label: "ports open on each server, nothing else" },
    ],
    problem:
      "I needed a VPN I could trust for my family's phones, without ads and without slowdowns, and without paying a big subscription every year.",
    builtHeading: "How it works",
    built: [
      {
        title: "Servers that sleep when nobody is using them",
        body: "Each location is a small server. One location stays on all the time, and the others shut themselves down after an hour with no traffic. A sleeping server costs about forty cents a month.",
      },
      {
        title: "Phones that never need new settings",
        body: "Every server updates its own address name each time it starts, so the WireGuard settings on the phone keep working no matter how the server was woken up.",
      },
      {
        title: "Locked down by default",
        body: "Only two ports are open. Logins need my SSH key, the admin page is never on the internet, the servers have no access to my cloud account, and security updates install every night.",
      },
      {
        title: "One command for everything",
        body: "A single command creates servers, adds a phone with a QR code, wakes or sleeps a location and checks the status. I also built a small Android app around the WireGuard tunnel library.",
      },
    ],
    stack: ["WireGuard", "wg-easy", "Docker", "Google Cloud", "Cloud Functions", "Bash", "Expo"],
  },
];

export const AI_SYSTEMS: { name: string; where: string; body: string; wide?: boolean }[] = [
  {
    name: "Sawt",
    where: "Hisab",
    wide: true,
    body: "Sawt is a voice companion that people can talk to in their own Arabic dialect. It answers in the same dialect, uses their own numbers, and can read a bank statement back to them out loud.",
  },
  {
    name: "Ask Verinvo",
    where: "Verinvo",
    body: "An AI agent inside the e-invoicing platform. It answers users' questions and can take actions for them, but only within what each user is allowed to do.",
  },
  {
    name: "Oxigen MCP server",
    where: "Verinvo",
    body: "An MCP server with 29 tools for the Verinvo team. Each user's own API key is passed through, so agents never get more access than the person using them.",
  },
  {
    name: "Hisab coach",
    where: "Hisab",
    body: "The coach reads someone's debts, statements and credit report, all anonymised, and turns them into a plan. It can also draft the letter to their bank.",
  },
  {
    name: "Parcel-photo booking",
    where: "Dawurobo",
    body: "You take a photo of a parcel and the app reads the recipient, address, phone number and amount for you. It made bulk orders much faster.",
  },
  {
    name: "Growth agent",
    where: "Dawurobo",
    body: "Every week it drafts campaigns to bring vendors back. It works without ever seeing a customer's personal data.",
  },
  {
    name: "A website AI can read",
    where: "DrivingInstructor.ae",
    wide: true,
    body: "Every page on DrivingInstructor.ae can be served as clean text to AI assistants, so when someone asks an AI about getting a licence in Abu Dhabi, it can quote the site correctly.",
  },
];

export const EXPERIENCE = [
  {
    role: "Lead Frontend Engineer",
    org: "Oxinus Holdings (IHC Group)",
    place: "Abu Dhabi",
    period: "Feb 2024 — now",
    note: "I lead the frontend of Verinvo and helped build Ask Verinvo and the Oxigen MCP server.",
  },
  {
    role: "Co-founder & Product Lead",
    org: "Hisab",
    place: "UAE",
    period: "2026 — now",
    note: "I took Hisab from an idea to the App Store and Google Play.",
  },
  {
    role: "Founder",
    org: "DrivingInstructor.ae",
    place: "Abu Dhabi",
    period: "2025 — now",
    note: "I grew it to more than 5,000 visitors a month without paying for ads.",
  },
  {
    role: "VP of Engineering & Equity Partner",
    org: "Dawurobo",
    place: "Ghana · remote",
    period: "Mar 2021 — now",
    note: "I lead the team building delivery, payments and e-commerce products.",
  },
  {
    role: "Frontend Engineer",
    org: "DAT Engineering Consultancy / Yallah Property",
    place: "Dubai & Abu Dhabi",
    period: "Sep 2022 — Jan 2024",
    note: "I built an attendance app, an internal operations platform and a property marketplace.",
  },
  {
    role: "Frontend Development Manager",
    org: "Hexlen",
    place: "Remote",
    period: "Apr 2021 — Jan 2022",
    note: "I led a small frontend team delivering client projects.",
  },
  {
    role: "Web Developer",
    org: "MCAT Global",
    place: "Remote",
    period: "Nov 2020 — Mar 2022",
    note: "I built web applications and interfaces for client projects.",
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

export const ARCHIVE: { name: string; note: string; stack: string; url: string; image: string }[] =
  [
    {
      name: "StyleNect",
      note: "StyleNect is a booking and management system for salons and spas in Ghana. It handles appointments, staff schedules, customers, invoices and SMS reminders, and customers get their own portal.",
      stack: "React · Firebase",
      url: "https://stylenect.com/",
      image: "/work/archive/stylenect.webp",
    },
    {
      name: "BG Empire",
      note: "BG Empire is an online store from Accra that sells phone cases and passport covers people can personalise. I built it on Shopify with a custom front end.",
      stack: "Next.js · Shopify",
      url: "https://bgempire.store/",
      image: "/work/archive/bg-empire.webp",
    },
    {
      name: "Dawurobo Safe",
      note: "Dawurobo Safe is a marketplace where people in Ghana can buy from businesses that have been verified through real Dawurobo deliveries.",
      stack: "Next.js · Firebase",
      url: "https://safe.dawurobo.com/",
      image: "/work/archive/dawurobo-safe.webp",
    },
    {
      name: "SkinPlus Medspa",
      note: "SkinPlus Medspa is a medical spa in Ghana. I built their website, which covers their services, memberships and how to find them.",
      stack: "Next.js · Firebase",
      url: "https://skinplusofficial.com/",
      image: "/work/archive/skinplus.webp",
    },
  ];

export const HERO_STATS: Metric[] = [
  { value: "6+", label: "years building production web and mobile apps" },
  { value: "GH₵3M+", label: "processed through payments I integrated" },
  { value: "5,000+", label: "monthly visitors with no ad spend" },
  { value: "4", label: "languages shipped, including Arabic" },
];
