import { z } from "zod";

// Every visible string on the page lives in content/site.json and is described here.
// Inline markup convention for mock text: wrap a phrase in [[double brackets]] to mark
// it as a detected phrase (underlined in chat) or a search match (highlighted).

const text = z.string().min(1);

const link = z.object({
  label: text,
  href: text,
});

const person = z.object({
  name: text,
  initials: z.string().min(1).max(3),
  tone: z.number().int().min(1).max(4).default(1),
});

const summaryItem = z.object({
  kind: z.enum(["decision", "blocker", "next"]),
  label: text,
  text,
});

const summaryMock = z.object({
  type: z.literal("summary"),
  srSummary: text,
  question: z.object({ author: person, text }),
  reply: text.optional(),
  card: z.object({ title: text, meta: text.optional() }),
  items: z.array(summaryItem),
});

const taskMock = z.object({
  type: z.literal("task"),
  srSummary: text,
  message: z.object({ author: person, text }),
  card: z.object({ title: text, meta: text.optional() }),
  callout: text.optional(),
  days: z.array(
    z.object({
      label: text,
      today: z.boolean().default(false),
      events: z.array(z.object({ title: text, time: text, isNew: z.boolean().default(false) })),
    }),
  ),
  undo: text.optional(),
  open: text.optional(),
});

const searchMock = z.object({
  type: z.literal("search"),
  srSummary: text,
  placeholder: text,
  query: text.optional(),
  shortcut: text.optional(),
  understoodLabel: text.optional(),
  chips: z.array(z.object({ icon: z.enum(["person", "date", "topic"]), label: text })),
  result: z.object({ title: text, meta: text.optional(), author: person, time: text, text }),
  file: z.object({ name: text, size: text.optional() }).optional(),
  action: text.optional(),
});

const composeMock = z.object({
  type: z.literal("compose"),
  srSummary: text,
  channel: text,
  modes: z.array(text),
  activeMode: z.number().int().min(0).default(0),
  draft: z.array(text),
  action: text,
  result: z.object({ title: text, meta: text.optional(), body: text }),
  languages: z.array(text),
  activeLanguage: z.number().int().min(0).default(0),
  insert: text.optional(),
});

export const featureMockSchema = z.discriminatedUnion("type", [summaryMock, taskMock, searchMock, composeMock]);

// Icons the showcase can use (mapped to Phosphor icons in AppShowcase.tsx).
export const showcaseIcons = ["hash", "calendar", "sparkle", "team", "tasks", "file", "image", "checklist"] as const;
const showcaseIcon = z.enum(showcaseIcons);

const showcaseMessage = z
  .object({
    // A person's message has an author; Acta's own message sets `acta: true` (shown with the logo mark).
    author: person.optional(),
    acta: z.boolean().default(false),
    time: text,
    text: text.optional(),
    // Optional card Acta attaches to its message, e.g. the tasks it just created.
    tasks: z
      .object({
        title: text,
        items: z.array(
          z.object({
            title: text,
            tag: z.object({ label: text, tone: z.enum(["primary", "success", "neutral"]).default("neutral") }).optional(),
            due: text.optional(),
          }),
        ),
      })
      .optional(),
  })
  .refine((m) => m.acta || m.author, { message: "A message needs an author unless it is Acta's" });

const showcase = z.object({
  label: text,
  srSummary: text,
  groups: z.array(
    z.object({
      label: text,
      items: z.array(
        z.object({
          label: text,
          // An item shows either a line icon or a person's avatar.
          icon: showcaseIcon.optional(),
          person: person.optional(),
          active: z.boolean().default(false),
          muted: z.boolean().default(false),
        }),
      ),
    }),
  ),
  channel: z.object({ name: text, meta: text.optional() }),
  messages: z.array(showcaseMessage),
  composer: z.object({ placeholder: text }).optional(),
  summary: z.object({ title: text, items: z.array(summaryItem) }).optional(),
  task: z.object({ title: text, meta: text.optional(), text }).optional(),
  activity: z
    .object({
      title: text,
      items: z.array(z.object({ icon: showcaseIcon, text, time: text })),
      action: text.optional(),
    })
    .optional(),
});

const intro = {
  label: text,
  headline: text.optional(),
  body: text.optional(),
};

// Line icons a journey card can show (mapped to Phosphor icons in Journey.tsx).
export const journeyIcons = ["chat", "sparkle", "calendar", "search", "list", "lightning"] as const;

export const sectionIds = ["hero", "showcase", "journey", "features", "pricing", "closing"] as const;

export const siteSchema = z.object({
  meta: z.object({
    title: text,
    description: text,
    lang: z.string().min(2),
  }),
  brand: z.object({
    name: text,
    logoAlt: text,
  }),
  ui: z.object({
    skipLink: text,
    navLabel: text,
    menuOpen: text,
    menuClose: text,
    footerNavLabel: text,
    filmClose: text,
  }),
  sections: z.array(z.enum(sectionIds)).default([...sectionIds]),
  nav: z.object({
    items: z.array(link),
    cta: link.optional(),
  }),
  hero: z.object({
    eyebrow: text.optional(),
    headline: text,
    body: text,
    primaryCta: link,
    secondaryCta: z.object({ label: text, filmUrl: z.string().optional() }).optional(),
    microcopy: text.optional(),
    // Decorative looping background video behind the hero (Nick's hero ribbon). Paths under /public.
    backgroundVideo: z.object({ src: text, poster: text.optional() }).optional(),
  }),
  showcase: showcase.optional(),
  journey: z.object({
    ...intro,
    beats: z.array(
      z.object({
        number: text,
        title: text,
        body: text,
        // Optional card extras (Aeye-style value card): a line icon and a bottom tag.
        icon: z.enum(journeyIcons).optional(),
        tag: text.optional(),
      }),
    ),
  }),
  features: z.object({
    ...intro,
    items: z.array(
      z.object({
        id: text,
        eyebrow: text.optional(),
        headline: text,
        body: text,
        mock: featureMockSchema.optional(),
      }),
    ),
  }),
  pricing: z.object({
    ...intro,
    note: text.optional(),
    tiers: z.array(
      z.object({
        id: text,
        name: text,
        badge: text.optional(),
        description: text.optional(),
        price: text,
        unit: text.optional(),
        note: text.optional(),
        features: z.array(text),
        cta: link,
        featured: z.boolean().default(false),
        // Internal planning note. Never rendered.
        internalNote: z.string().optional(),
      }),
    ),
  }),
  closing: z.object({
    label: text,
    headline: text,
    body: text.optional(),
    microcopy: text.optional(),
    form: z.object({
      action: text,
      label: text,
      placeholder: text,
      submit: text,
      success: text,
      error: text,
      failure: text,
    }),
  }),
  footer: z.object({
    groups: z.array(z.object({ label: text, links: z.array(link) })),
    legal: text,
  }),
});

export type SiteContent = z.infer<typeof siteSchema>;
export type FeatureMock = z.infer<typeof featureMockSchema>;
export type Person = z.infer<typeof person>;
export type SummaryItem = z.infer<typeof summaryItem>;
export type SectionId = (typeof sectionIds)[number];
