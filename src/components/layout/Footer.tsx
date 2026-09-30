import type { SiteContent } from "@/content";
import { LogoFull } from "@/components/brand/Logo";
import { reveal } from "@/lib/reveal";

// Footer (MASTER 6.9, Nick footer): logo, content-driven link groups, legal line.
export function Footer({ site }: { site: SiteContent }) {
  const { footer, brand, ui } = site;
  return (
    <footer className="site-foot" {...reveal("fade")}>
      <div style={{ display: "grid", gap: 16, alignContent: "start" }}>
        <LogoFull label={brand.logoAlt} />
        <p className="legal">{footer.legal}</p>
      </div>
      {footer.groups.length > 0 && (
        <nav className="foot-groups" aria-label={ui.footerNavLabel}>
          {footer.groups.map((group) => (
            <div key={group.label}>
              <h2>{group.label}</h2>
              <ul>
                {group.links.map((link) => (
                  <li key={link.href + link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      )}
    </footer>
  );
}
