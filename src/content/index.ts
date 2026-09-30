import { z } from "zod";
import raw from "../../content/site.json";
import { siteSchema, type SiteContent } from "./schema";

export type { SiteContent, FeatureMock, Person, SummaryItem, SectionId } from "./schema";

export function parseSiteContent(input: unknown): SiteContent {
  const result = siteSchema.safeParse(input);
  if (!result.success) {
    throw new Error(`content/site.json is invalid:\n${z.prettifyError(result.error)}`);
  }
  return result.data;
}

export const site: SiteContent = parseSiteContent(raw);
