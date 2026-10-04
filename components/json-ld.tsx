import { siteGraph } from "@/lib/structured-data";

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/** Person + WebSite, on every page. */
export function PersonJsonLd() {
  return <JsonLd data={siteGraph()} />;
}
