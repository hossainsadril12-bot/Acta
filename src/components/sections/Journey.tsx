import {
  CalendarCheckIcon,
  ChatsCircleIcon,
  LightningIcon,
  ListChecksIcon,
  MagnifyingGlassIcon,
  SparkleIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { SiteContent } from "@/content";
import type { journeyIcons } from "@/content/schema";
import { Section } from "@/components/layout/Section";

const ICONS: Record<(typeof journeyIcons)[number], typeof ChatsCircleIcon> = {
  chat: ChatsCircleIcon,
  sparkle: SparkleIcon,
  calendar: CalendarCheckIcon,
  search: MagnifyingGlassIcon,
  list: ListChecksIcon,
  lightning: LightningIcon,
};

// Journey beats (MASTER 7.8) as tall value cards, after the aeye-saas.webflow.io value section:
// headline, then a row of columns on the ledger net (as pricing). Each card puts a line icon and
// its index at the top, the title and body under them, and an optional tag pinned to the bottom.
// Hover (as Aeye): the title turns primary, the icon crossfades to its filled version and the body
// unfolds. On touch screens the body is always shown.
export function Journey({ journey }: { journey: SiteContent["journey"] }) {
  if (journey.beats.length === 0) return null;
  return (
    <Section id="journey" label={journey.label} headline={journey.headline} body={journey.body}>
      <ol className="journey" style={{ "--cols": Math.min(journey.beats.length, 3) } as React.CSSProperties}>
        {journey.beats.map((beat, i) => {
          const Icon = beat.icon ? ICONS[beat.icon] : null;
          return (
            <li key={beat.number} className="jcard" data-reveal="slide" style={{ "--n": i, "--d": `${i * 160}ms` } as React.CSSProperties}>
              <div className="jcard-main">
                <div className="jcard-top">
                  {Icon ? (
                    <span className="jcard-icon" aria-hidden="true">
                      <Icon className="off-hover" weight="regular" />
                      <Icon className="on-hover" weight="fill" />
                    </span>
                  ) : (
                    <span />
                  )}
                  <span className="jcard-num" aria-hidden="true">
                    <span className="slash">{"//"}</span>
                    {beat.number}
                  </span>
                </div>
                <div className="jcard-text">
                  <h3>{beat.title}</h3>
                  <div className="jcard-body">
                    <p>{beat.body}</p>
                  </div>
                </div>
              </div>
              {beat.tag && <span className="jcard-tag">{beat.tag}</span>}
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
