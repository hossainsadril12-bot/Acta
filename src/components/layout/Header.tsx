import type { SiteContent } from "@/content";
import { LogoFull } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "./MobileMenu";

// Sticky header (MASTER 6.2, Nick header): logo, nav links, flexible gap, primary CTA.
// Below 1024px the links move into the mobile menu sheet.
export function Header({ site }: { site: SiteContent }) {
  const { nav, ui, brand } = site;
  return (
    <header className="site-head">
      <a className="skip-link" href="#main">
        {ui.skipLink}
      </a>
      <div className="in">
        <a className="logo-link" href="#main" aria-label={brand.logoAlt}>
          <LogoFull label={brand.logoAlt} />
        </a>
        {nav.items.length > 0 && (
          <nav className="navlinks" aria-label={ui.navLabel}>
            {nav.items.map((item) => (
              <a key={item.href + item.label} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
        )}
        <div className="head-end">
          {nav.cta && (
            <Button href={nav.cta.href} className="head-cta">
              {nav.cta.label}
            </Button>
          )}
          {nav.items.length > 0 && (
            <MobileMenu items={nav.items} cta={nav.cta} openLabel={ui.menuOpen} closeLabel={ui.menuClose} navLabel={ui.navLabel} />
          )}
        </div>
      </div>
    </header>
  );
}
