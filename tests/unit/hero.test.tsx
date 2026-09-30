import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "@/components/sections/Hero";
import { site, type SiteContent } from "@/content";

describe("Hero", () => {
  it("renders every hero field from content", () => {
    render(<Hero hero={site.hero} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(site.hero.headline);
    expect(screen.getByText(site.hero.body)).toBeInTheDocument();
    expect(screen.getByText(site.hero.eyebrow!)).toBeInTheDocument();
    if (site.hero.microcopy) expect(screen.getByText(site.hero.microcopy)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: site.hero.primaryCta.label })).toHaveAttribute("href", site.hero.primaryCta.href);
  });

  it("updates when only the content changes", () => {
    const edited: SiteContent["hero"] = { ...site.hero, headline: "Edited headline." };
    render(<Hero hero={edited} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Edited headline.");
  });

  it("hides the film trigger until a film URL exists", () => {
    render(<Hero hero={{ ...site.hero, secondaryCta: { label: "Watch the film →", filmUrl: "" } }} />);
    expect(screen.queryByRole("button", { name: "Watch the film →" })).not.toBeInTheDocument();
  });

  it("shows the film trigger when a film URL is set", () => {
    render(<Hero hero={{ ...site.hero, secondaryCta: { label: "Watch the film →", filmUrl: "https://example.com/film.mp4" } }} />);
    expect(screen.getByRole("button", { name: "Watch the film →" })).toBeInTheDocument();
  });

  it("renders the decorative background video from content", () => {
    const { container } = render(<Hero hero={site.hero} />);
    const video = container.querySelector("video.hero-video");
    expect(video).toHaveAttribute("src", site.hero.backgroundVideo!.src);
    expect(video).toHaveAttribute("poster", site.hero.backgroundVideo!.poster);
    expect(video?.closest("[aria-hidden='true']")).not.toBeNull();
    expect(video).not.toHaveAttribute("controls");
  });

  it("renders no video when the field is absent", () => {
    const { container } = render(<Hero hero={{ ...site.hero, backgroundVideo: undefined }} />);
    expect(container.querySelector("video")).toBeNull();
  });

  it("renders the paragraph right after the heading, in the same column", () => {
    render(<Hero hero={site.hero} />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1.nextElementSibling).toHaveTextContent(site.hero.body);
  });

  it("renders optional micro-copy only when content provides it", () => {
    const { rerender } = render(<Hero hero={{ ...site.hero, microcopy: undefined }} />);
    expect(screen.queryByText("Free for teams. Ready in seconds.")).not.toBeInTheDocument();
    rerender(<Hero hero={{ ...site.hero, microcopy: "Free for teams. Ready in seconds." }} />);
    expect(screen.getByText("Free for teams. Ready in seconds.")).toBeInTheDocument();
  });

  it("renders without the optional fields", () => {
    const minimal: SiteContent["hero"] = {
      headline: site.hero.headline,
      body: site.hero.body,
      primaryCta: site.hero.primaryCta,
    };
    render(<Hero hero={minimal} />);
    expect(screen.getAllByRole("link")).toHaveLength(1);
    expect(screen.queryByText(site.hero.eyebrow!)).not.toBeInTheDocument();
  });
});
