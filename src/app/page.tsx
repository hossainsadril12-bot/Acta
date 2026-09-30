import { Fragment } from "react";
import { site, type SectionId } from "@/content";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Showcase } from "@/components/sections/Showcase";
import { Journey } from "@/components/sections/Journey";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { Pricing } from "@/components/sections/Pricing";
import { ClosingCta } from "@/components/sections/ClosingCta";

// Section order comes from content (site.sections), not from this file.
const render: Record<SectionId, () => React.ReactNode> = {
  hero: () => <Hero hero={site.hero} filmCloseLabel={site.ui.filmClose} />,
  showcase: () => (site.showcase ? <Showcase showcase={site.showcase} brandName={site.brand.name} /> : null),
  journey: () => <Journey journey={site.journey} />,
  features: () => <FeatureGrid features={site.features} />,
  pricing: () => <Pricing pricing={site.pricing} />,
  closing: () => <ClosingCta closing={site.closing} />,
};

export default function Page() {
  return (
    <>
      <Header site={site} />
      <div className="ledger">
        <main id="main" tabIndex={-1}>
          {site.sections.map((id) => (
            <Fragment key={id}>{render[id]()}</Fragment>
          ))}
        </main>
        <Footer site={site} />
      </div>
    </>
  );
}
