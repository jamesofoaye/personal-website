# jamesofoaye.dev

Personal site of James Ofori Ayerakwa — Lead Frontend & Applied AI Engineer.

Next.js 16 (App Router) · React 19 · Tailwind 4 · three.js · motion · Lenis · MDX. Deployed on Vercel.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
npm test           # vitest: Markdown, proxy, MCP server and server card
```

Set `NEXT_PUBLIC_SITE_URL` in Vercel (see `.env.example`). It drives canonical URLs, the sitemap, OG images and JSON-LD. Default: `https://jamesofoaye.dev`.

## Where things live

| What | Where |
|---|---|
| All copy: ventures, AI systems, experience, skills | `lib/content.ts` |
| Name, links, nav, site URL | `lib/site.ts` |
| About, CV and privacy copy (shared with the Markdown versions) | `lib/about.ts`, `lib/cv.ts`, `lib/privacy.ts` |
| Now page (edit monthly, bump the date in `page.tsx`) | `app/now/content.mdx` |
| Case studies (generated from `lib/content.ts`) | `app/work/[slug]/page.tsx` |
| Product screenshots | `public/work/<slug>/*.webp` |
| Globe | `components/globe/globe.tsx` |
| Globe land dots (regenerate with `npm run globe:data`) | `public/globe/land.bin` |
| Brand tokens (white, `#0E1017`, gold `#E6AF2E`, Commissioner) | `app/globals.css` |

## Guardrails for copy

- No job-search signals ("open to work", "hire me").
- No phone numbers, date of birth or address. Email is assembled client-side.
- Oxinus/Verinvo: public facts only — no client names, team sizes or roadmap. Ask Verinvo is credited as a team effort.
- Hubtel was integrated, not built.
- Hisab is a financial wellness app, described through user outcomes; never "advice" or "debt management".

## Design

The original jamesofoaye theme: white canvas, brand black `#0E1017`, gold `#E6AF2E`, Commissioner type, the JamesOfoAye wordmark, black section labels with a gold orb, outline pill buttons.

Motion and 3D:

- **Globe** (`components/globe/globe.tsx`): the land dots fly in and assemble on load, an arc links Accra and Abu Dhabi, a gold orbit ring adds depth, the cities send a ripple across the land every few seconds, and a tap or click sends one from that spot. It turns toward Abu Dhabi as the hero scrolls away and leans toward the cursor on desktop. It loads when the browser is idle, after the hero text.
- **Voice field** (`components/voice-field/`): a WebGL field of gold points behind the Applied AI section that moves like speech, a nod to Sawt. The cursor or a finger presses into it. It loads only when the section is close.
- **Tilt** (`components/tilt.tsx`): case-study covers lean toward the cursor on desktop and tip as they scroll on phones; the phones inside move by depth.
- **Page transitions**: React `<ViewTransition>` morphs a project name from the list (or the "Next" link) into the case-study heading, with a short crossfade for the page.
- Every WebGL piece pauses off-screen, caps at 30fps on touch devices and renders one still frame under reduced motion or without a GPU. Add `?forcegl` to a URL to force animation in headless browsers.

Phones get the globe on the first screen, swipe rows for the AI cards and older projects, a modal menu with email and LinkedIn, and a small sticky "Email me / LinkedIn" bar once the hero has scrolled away.

## SEO and AI answer engines

- **Structured data** (`lib/structured-data.ts`): Person and WebSite on every page, ProfilePage with a project list on `/` and `/about`, CreativeWork and BreadcrumbList on each case study, FAQPage on `/about`.
- **FAQ** (`lib/faq.ts`): short factual answers shown on `/about` and published as FAQPage data, so search and AI tools can quote them.
- **MCP server** (`app/mcp/route.ts`, `lib/mcp/`): a public, read-only MCP server over Streamable HTTP at `/mcp` (stateless, no auth) with six tools (`get_profile`, `list_projects`, `get_project`, `get_page`, `search_site`, `get_contact`) and every page as a Markdown resource. It never returns the email address, a phone number or a street address. Its server card (SEP-1649) is at `/.well-known/mcp/server-card.json`, mirrored at `/.well-known/mcp.json`, and `/developers` explains how to connect.
- **Markdown for agents** (`proxy.ts`, `lib/markdown.ts`, `app/md/`): every page answers `Accept: text/markdown` with a Markdown version (with `Vary: Accept`), and any page URL works with `.md` added (`/about.md`, `/index.md`). Unknown paths return a Markdown 404 that lists the real pages.
- **`/llms.txt` and `/llms-full.txt`**: markdown summaries of the site for AI assistants, generated from `lib/content.ts`.
- **robots.txt** allows all crawlers and names the main AI crawlers explicitly. **sitemap.xml** lists every page and its screenshots; bump `UPDATED` in `app/sitemap.ts` when content changes.
- **Open Graph images** are generated per page, including one per case study.

## Analytics

Everything goes to **Vercel Web Analytics** (Pro plan custom events) through `trackEvent()` in `lib/analytics.ts`. Vercel keeps two properties per event on Pro, so each event sends at most two; if an event has only one, `device` (mobile, tablet or desktop) fills the second slot. Speed Insights covers Core Web Vitals. Upgrading to Web Analytics Plus raises the limit to eight properties and adds UTM reporting; nothing in the code needs to change except the `slice(0, 2)` in `trackEvent()`.

Most tracking is declarative: add `data-track="event_name"` and `data-track-<prop>="value"` to any link or button. `components/analytics-tracker.tsx` tracks the rest automatically.

| Event | When it fires | Properties |
|---|---|---|
| `cta_clicked` | Hero, header and sticky mobile bar calls to action | `cta`, `device` |
| `ai_cards_swiped` / `archive_swiped` | Swiping the AI cards or older projects on a phone | `section`, `device` |
| `nav_clicked` | Any nav link, desktop or mobile | `item`, `menu` |
| `mobile_menu_opened` | The mobile menu opens | `device` |
| `project_previewed` | Hovering a project on desktop (once per project) | `project`, `device` |
| `project_opened` | Opening a case study from the list, "Next" or "Previous" | `project`, `from` |
| `screens_swiped` | Swiping the screenshot gallery on a case study | `project`, `device` |
| `section_viewed` | A section crosses the middle of the screen (`data-section`) | `section`, `device` |
| `scroll_depth` | 25, 50, 75 and 100% of a page | `percent`, `device` |
| `page_engagement` | Leaving or hiding a page | `time`, `scrolled` |
| `tab_returned` | Coming back to the tab | `away`, `device` |
| `outbound_link_clicked` | Any external link (LinkedIn, GitHub, live sites, YouTube) | `destination`, `location` |
| `internal_link_clicked` | Any other internal link | `to`, `location` |
| `email_clicked` / `email_copied` | Email link or the Copy email button | `location`, `device` |
| `cv_saved_as_pdf` | The Save as PDF button on `/cv` | `device` |
| `globe_dragged` | First drag of the globe | `input`, `device` |
| `text_copied` | Someone copies text | `section`, `device` |
| `rage_click` | Three fast clicks in the same spot | `element`, `device` |
| `page_not_found` | A 404 page loads | `referrer`, `device` |

Pageviews, referrers, countries and devices come from Web Analytics itself. Filter any custom event by `device` in the dashboard to see mobile behaviour on its own.
