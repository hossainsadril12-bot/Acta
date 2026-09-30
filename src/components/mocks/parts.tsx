// Shared product-mock parts, mapped 1:1 from docs/references/nick-analysis/design.md:
// card-app -> Card, chat-bubble -> MeRow / BotRow, typing indicator, micro-tags, segmented pills.
import { SparkleIcon } from "@phosphor-icons/react/dist/ssr";
import type { Person, SummaryItem } from "@/content";
import { Rich } from "@/components/ui/Rich";

export function Card({
  ai = false,
  className = "",
  children,
}: {
  ai?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={["card", ai ? "ai" : "", className].filter(Boolean).join(" ")}>{children}</div>;
}

export function CardHead({
  icon,
  title,
  meta,
  end,
}: {
  icon?: React.ReactNode;
  title: string;
  meta?: React.ReactNode;
  end?: React.ReactNode;
}) {
  return (
    <div className="card-head">
      {icon}
      <span className="card-title">{title}</span>
      {meta && <span className="meta">{meta}</span>}
      {end && <span style={{ marginLeft: "auto" }}>{end}</span>}
    </div>
  );
}

export function Avatar({ person, small = false }: { person: Person; small?: boolean }) {
  return <span className={`av p${person.tone}${small ? " sm" : ""}`}>{person.initials}</span>;
}

export function BotAvatar() {
  return (
    <span className="bot-av">
      <SparkleIcon className="i" />
    </span>
  );
}

export function MeRow({ person, text, className = "", showName = false }: { person: Person; text: string; className?: string; showName?: boolean }) {
  return (
    <div className={`row me ${className}`}>
      <div>
        {showName && <span className="who">{person.name}</span>}
        <p className="bub">
          <Rich text={text} />
        </p>
      </div>
      <Avatar person={person} />
    </div>
  );
}

export function BotRow({ text, className = "" }: { text: string; className?: string }) {
  return (
    <div className={`row bot ${className}`}>
      <BotAvatar />
      <div>
        <p className="bub">{text}</p>
      </div>
    </div>
  );
}

export function SummaryList({ items, stagger = false }: { items: SummaryItem[]; stagger?: boolean }) {
  if (items.length === 0) return null;
  return (
    <ul className={`sum${stagger ? " stag" : ""}`}>
      {items.map((item, i) => (
        <li key={`${item.kind}-${i}`} style={{ "--n": i } as React.CSSProperties}>
          <span className={`mt ${item.kind}`}>{item.label}</span>
          <span>{item.text}</span>
        </li>
      ))}
    </ul>
  );
}

export function Seg({ options, active }: { options: string[]; active: number }) {
  if (options.length === 0) return null;
  return (
    <span className="seg">
      {options.map((o, i) => (
        <span key={o} className={i === active ? "on" : undefined}>
          {o}
        </span>
      ))}
    </span>
  );
}
