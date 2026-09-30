import { CheckIcon } from "@phosphor-icons/react/dist/ssr";
import type { SiteContent } from "@/content";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";

// Pricing (MASTER 7.10): the 21st.dev "Blueprint Tiers" layout rebuilt on Acta tokens and Nick's ledger.
// Each plan is a column of three ruled rows (header, price + CTA, features) aligned across columns.
// The column count follows the number of tiers; the featured plan gets the primary CTA and corner ticks.
// Columns swing in from a slight 3D turn, one after another (Terascape's process cards).
export function Pricing({ pricing }: { pricing: SiteContent["pricing"] }) {
  if (pricing.tiers.length === 0) return null;
  return (
    <Section id="pricing" label={pricing.label} headline={pricing.headline} body={pricing.body}>
      {pricing.note && <p className="pricing-note">{pricing.note}</p>}
        <div className="pricing" style={{ "--cols": pricing.tiers.length } as React.CSSProperties}>
          {pricing.tiers.map((tier, i) => {
            const isNumber = /\d/.test(tier.price);
            return (
              <article
                key={tier.id}
                className={`plan${tier.featured ? " featured" : ""}`}
                aria-labelledby={`plan-${tier.id}`}
                data-reveal="tilt"
                style={{ "--d": `${i * 180}ms` } as React.CSSProperties}
              >
                <div className="plan-head">
                  <div className="top">
                    <h3 id={`plan-${tier.id}`}>{tier.name}</h3>
                    {tier.badge && <span className="badge">{tier.badge}</span>}
                  </div>
                  {tier.description && <p className="desc">{tier.description}</p>}
                </div>
                <div className="plan-body">
                  <p className="price">
                    <span className={`amount tnum${isNumber ? "" : " word"}`}>{tier.price}</span>
                    {isNumber && tier.unit && <span className="unit">{tier.unit}</span>}
                  </p>
                  {tier.note && <p className="note">{tier.note}</p>}
                  <div className={`cta${tier.featured ? " ticks" : ""}`}>
                    {tier.featured && (
                      <>
                        <i aria-hidden="true" />
                        <i aria-hidden="true" />
                        <i aria-hidden="true" />
                        <i aria-hidden="true" />
                      </>
                    )}
                    <Button href={tier.cta.href} size="lg" variant={tier.featured ? "primary" : "secondary"}>
                      {tier.cta.label}
                    </Button>
                  </div>
                </div>
                {tier.features.length > 0 ? (
                  <ul className="plan-features">
                    {tier.features.map((feature) => (
                      <li key={feature}>
                        <span className="chk" aria-hidden="true">
                          <CheckIcon className="i" weight="bold" />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div />
                )}
              </article>
            );
          })}
        </div>
    </Section>
  );
}
