import type { SiteContent } from "@/content";
import { LogoMark } from "@/components/brand/Logo";
import { SignupForm } from "@/components/forms/SignupForm";
import { reveal } from "@/lib/reveal";

// Closing CTA (Nick: 2-col, headline + sub-copy left, identity + action right).
export function ClosingCta({ closing }: { closing: SiteContent["closing"] }) {
  return (
    <section id="signup" className="sec" aria-labelledby="closing-title">
      <div className="closing">
        <div>
          <h2 id="closing-title" {...reveal("wipe")}>
            {closing.headline}
          </h2>
          {closing.body && (
            <p className="lead" {...reveal("fade", 300)}>
              {closing.body}
            </p>
          )}
        </div>
        <div {...reveal("fade", 450)}>
          <LogoMark className="mark-lg" />
          <SignupForm form={closing.form} />
          {closing.microcopy && <p className="hero-micro">{closing.microcopy}</p>}
        </div>
      </div>
    </section>
  );
}
