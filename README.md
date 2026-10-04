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
```

Set `NEXT_PUBLIC_SITE_URL` in Vercel (see `.env.example`). It drives canonical URLs, the sitemap, OG images and JSON-LD. Default: `https://jamesofoaye.dev`.

## Where things live

| What | Where |
|---|---|
| All copy: ventures, AI systems, experience, skills | `lib/content.ts` |
| Name, links, nav, site URL | `lib/site.ts` |
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

The original jamesofoaye theme: white canvas, brand black `#0E1017`, gold `#E6AF2E`, Commissioner type, the JamesOfoAye wordmark, black section labels with a gold orb, outline pill buttons. The globe links Accra and Abu Dhabi; on devices without a GPU, or with reduced motion, it renders a still frame.

## SEO and AI answer engines

- **Structured data** (`lib/structured-data.ts`): Person and WebSite on every page, ProfilePage with a project list on `/` and `/about`, CreativeWork and BreadcrumbList on each case study, FAQPage on `/about`.
- **FAQ** (`lib/faq.ts`): short factual answers shown on `/about` and published as FAQPage data, so search and AI tools can quote them.
- **`/llms.txt` and `/llms-full.txt`**: markdown summaries of the site for AI assistants, generated from `lib/content.ts`.
- **robots.txt** allows all crawlers and names the main AI crawlers explicitly. **sitemap.xml** lists every page and its screenshots; bump `UPDATED` in `app/sitemap.ts` when content changes.
- **Open Graph images** are generated per page, including one per case study.

## Analytics

Events go through `trackEvent()` in `lib/analytics.ts`. They are sent to **Vercel Web Analytics** (custom events, first two properties) and, if `NEXT_PUBLIC_POSTHOG_KEY` is set, to **PostHog** with every property plus pageviews, autocapture, heatmaps and session replay (inputs masked). Speed Insights covers Core Web Vitals.

Most tracking is declarative: add `data-track="event_name"` and `data-track-<prop>="value"` to any link or button. `components/analytics-tracker.tsx` also tracks things automatically.

| Event | When it fires | Properties |
|---|---|---|
| `cta_clicked` | Hero and header calls to action | `cta` |
| `nav_clicked` | Any nav link, desktop or mobile | `item`, `menu` |
| `mobile_menu_opened` | The mobile menu opens | |
| `project_previewed` | Hovering a project on desktop (once per project) | `project` |
| `project_opened` | Opening a case study from the list or "Next" | `project`, `from` |
| `screens_swiped` | Swiping the screenshot gallery on a case study | `project` |
| `section_viewed` | A section crosses the middle of the screen (`data-section`) | `section` |
| `scroll_depth` | 25, 50, 75, 90 and 100% of a page | `percent` |
| `page_engagement` | Leaving or hiding a page | `seconds_bucket`, `max_scroll` |
| `tab_returned` | Coming back to the tab | `away_seconds_bucket` |
| `outbound_link_clicked` | Any external link (LinkedIn, GitHub, live sites, YouTube) | `destination`, `location` |
| `internal_link_clicked` | Any other internal link | `to`, `location` |
| `email_clicked` / `email_copied` | Email link or the Copy email button | `location` |
| `cv_saved_as_pdf` | The Save as PDF button on `/cv` | |
| `globe_dragged` | First drag of the globe | `input` |
| `text_copied` | Someone copies text | `length`, `section` |
| `rage_click` | Three fast clicks in the same spot | `element` |
| `page_not_found` | A 404 page loads | `referrer` |

Every event also carries `path` and `viewport` (mobile, tablet or desktop) when sent to PostHog.
