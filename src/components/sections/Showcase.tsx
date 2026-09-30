import type { SiteContent } from "@/content";
import { AppShowcase } from "@/components/mocks/AppShowcase";
import { Section } from "@/components/layout/Section";

export function Showcase({ showcase, brandName }: { showcase: NonNullable<SiteContent["showcase"]>; brandName: string }) {
  return (
    <Section id="showcase" label={showcase.label}>
      <div className="showcase">
        <AppShowcase showcase={showcase} brandName={brandName} />
      </div>
    </Section>
  );
}
