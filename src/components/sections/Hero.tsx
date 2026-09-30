import type { SiteContent } from "@/content";
import { Button } from "@/components/ui/Button";
import { FilmButton } from "@/components/ui/FilmButton";
import { HeroVideo } from "@/components/motion/HeroVideo";
import { reveal } from "@/lib/reveal";

// Hero: eyebrow, H1, the paragraph right under it, then the CTA row (and optional micro-copy),
// all in the left column; the ribbon video fills the right. Stacks in the same order on mobile.
export function Hero({ hero, filmCloseLabel = "Close" }: { hero: SiteContent["hero"]; filmCloseLabel?: string }) {
  const film = hero.secondaryCta?.filmUrl ? hero.secondaryCta : undefined;
  return (
    <section aria-labelledby="hero-title" className={`sec hero${hero.backgroundVideo ? " has-video" : ""}`}>
      {hero.backgroundVideo && <HeroVideo src={hero.backgroundVideo.src} poster={hero.backgroundVideo.poster} />}
      <div className="hero-main">
        {hero.eyebrow && (
          <p className="eyebrow" {...reveal("fade")}>
            {hero.eyebrow}
          </p>
        )}
        <h1 id="hero-title" {...reveal("wipe", 150)}>
          {hero.headline}
        </h1>
        <p className="lead" {...reveal("fade", 450)}>
          {hero.body}
        </p>
        <div className="cta-row" {...reveal("fade", 600)}>
          <Button href={hero.primaryCta.href} size="lg" arrow>
            {hero.primaryCta.label}
          </Button>
          {film && <FilmButton label={film.label} url={film.filmUrl!} closeLabel={filmCloseLabel} />}
        </div>
        {hero.microcopy && (
          <p className="hero-micro" {...reveal("fade", 750)}>
            {hero.microcopy}
          </p>
        )}
      </div>
    </section>
  );
}
