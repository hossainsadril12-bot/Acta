import type { SiteContent } from "@/content";
import { Section } from "@/components/layout/Section";
import { FeatureMock } from "@/components/mocks/FeatureMock";
import { DemoPlayer } from "@/components/motion/DemoPlayer";
import { reveal } from "@/lib/reveal";

// Feature cells (MASTER 7.7, Nick cell): mock on top, eyebrow + 24px H3 + body below, 2x2 on rails.
export function FeatureGrid({ features }: { features: SiteContent["features"] }) {
  if (features.items.length === 0) return null;
  return (
    <Section id="features" label={features.label} headline={features.headline} body={features.body}>
      <div className="fgrid">
        {features.items.map((f) => (
          <DemoPlayer key={f.id} as="article" className="fcell">
            {f.mock && (
              <div className="fvis" aria-hidden="true">
                <FeatureMock mock={f.mock} />
              </div>
            )}
            <div className="ftext">
              {f.eyebrow && (
                <p className="eyebrow" {...reveal("fade")}>
                  {f.eyebrow}
                </p>
              )}
              <h3 {...reveal("wipe", 120)}>{f.headline}</h3>
              <p {...reveal("fade", 320)}>{f.body}</p>
            </div>
            {f.mock && <p className="sr-only">{f.mock.srSummary}</p>}
          </DemoPlayer>
        ))}
      </div>
    </Section>
  );
}
