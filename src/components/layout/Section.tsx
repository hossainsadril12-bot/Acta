import { reveal } from "@/lib/reveal";

// Ledger section (Nick): a full-bleed rule with plus-shaped corner marks on top,
// optional intro block (left-aligned H2 + paragraph), then content. No hatch bands (removed at the user's request).

export function Section({
  id,
  label,
  headline,
  body,
  children,
}: {
  id?: string;
  label: string;
  headline?: string;
  body?: string;
  children: React.ReactNode;
}) {
  const headingId = id ? `${id}-title` : undefined;
  return (
    <section
      id={id}
      className="sec"
      aria-labelledby={headline ? headingId : undefined}
      aria-label={headline ? undefined : label}
    >
      {headline && (
        <div className="intro">
          <h2 id={headingId} className="h2" {...reveal("wipe")}>
            {headline.split("\n").map((line, i) => (
              <span key={i} className="line">
                {line}
              </span>
            ))}
          </h2>
          {body && (
            <p className="lead" {...reveal("fade", 300)}>
              {body}
            </p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
