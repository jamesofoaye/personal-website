import { describe, expect, it } from "vitest";
import { caseStudyGraph, personNode } from "@/lib/structured-data";
import { VENTURES } from "@/lib/content";
import { PERSON } from "@/lib/site";

describe("JSON-LD", () => {
  it("describes James as a Person with his profiles and city, never a street address or email", () => {
    const p = personNode();
    expect(p["@type"]).toBe("Person");
    expect(p.sameAs).toEqual(expect.arrayContaining([PERSON.links.linkedin, PERSON.links.github]));
    expect(p.address).toEqual({
      "@type": "PostalAddress",
      addressLocality: "Abu Dhabi",
      addressCountry: "AE",
    });
    const json = JSON.stringify(p);
    expect(json).not.toContain(PERSON.emailParts.join("@"));
    expect(json).not.toContain("streetAddress");
  });

  it("does not invent support contacts for the products", () => {
    for (const v of VENTURES) {
      expect(JSON.stringify(caseStudyGraph(v))).not.toContain("customer support");
    }
  });

  it("credits James as creator of every case study", () => {
    for (const v of VENTURES) {
      const [work] = caseStudyGraph(v)["@graph"] as { creator: { "@id": string } }[];
      expect(work!.creator["@id"]).toMatch(/#person$/);
    }
  });
});
