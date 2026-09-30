import { describe, expect, it } from "vitest";
import raw from "../../content/site.json";
import { parseSiteContent, site } from "@/content";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const clone = () => structuredClone(raw) as Record<string, any>;

describe("content/site.json", () => {
  it("parses against the schema", () => {
    expect(site.hero.headline).toBe("From conversation to execution.");
    expect(site.features.items).toHaveLength(4);
    expect(site.features.items.map((f) => f.mock?.type)).toEqual(["summary", "task", "search", "compose"]);
    expect(site.pricing.tiers.map((t) => t.name)).toEqual(["Starter", "Pro", "Enterprise"]);
    expect(site.pricing.tiers.filter((t) => t.featured).map((t) => t.id)).toEqual(["pro"]);
    expect(site.sections[0]).toBe("hero");
  });

  it("rejects content missing a required field", () => {
    const bad = clone();
    delete bad.hero.headline;
    expect(() => parseSiteContent(bad)).toThrow(/content\/site\.json is invalid/);
  });

  it("rejects an unknown mock type", () => {
    const bad = clone();
    bad.features.items[0].mock.type = "chart";
    expect(() => parseSiteContent(bad)).toThrow(/content\/site\.json is invalid/);
  });

  it("accepts missing optional fields", () => {
    const c = clone();
    delete c.hero.eyebrow;
    delete c.hero.secondaryCta;
    delete c.hero.microcopy;
    delete c.showcase;
    delete c.journey.headline;
    delete c.features.items[0].mock;
    delete c.pricing.tiers[1].badge;
    delete c.closing.body;
    expect(() => parseSiteContent(c)).not.toThrow();
  });

  it("accepts empty lists and lists of any length", () => {
    const c = clone();
    c.features.items = [];
    c.journey.beats = [];
    c.footer.groups = [];
    c.pricing.tiers[0].features.push("A fourth bullet", "A fifth bullet");
    const parsed = parseSiteContent(c);
    expect(parsed.features.items).toEqual([]);
    expect(parsed.pricing.tiers[0].features).toHaveLength(5);
  });

  it("defaults the section order when it is omitted", () => {
    const c = clone();
    delete c.sections;
    expect(parseSiteContent(c).sections).toEqual(["hero", "showcase", "journey", "features", "pricing", "closing"]);
  });

  it("contains no em or en dashes in any string", () => {
    expect(JSON.stringify(raw)).not.toMatch(/[–—]/);
  });
});
