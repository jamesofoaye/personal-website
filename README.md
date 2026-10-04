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
