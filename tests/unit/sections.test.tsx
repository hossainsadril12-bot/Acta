import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { site, type SiteContent } from "@/content";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { Journey } from "@/components/sections/Journey";
import { Pricing } from "@/components/sections/Pricing";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { Showcase } from "@/components/sections/Showcase";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const features = (n: number): SiteContent["features"] => ({
  ...site.features,
  items: Array.from({ length: n }, (_, i) => ({ ...site.features.items[i % 4], id: `f${i}` })),
});

describe("FeatureGrid", () => {
  it.each([1, 4, 6])("renders one cell per feature (%i)", (n) => {
    const { container } = render(<FeatureGrid features={features(n)} />);
    expect(container.querySelectorAll(".fcell")).toHaveLength(n);
  });

  it("renders nothing for an empty list", () => {
    const { container } = render(<FeatureGrid features={features(0)} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders each feature's copy and a screen-reader summary of its mock", () => {
    render(<FeatureGrid features={site.features} />);
    for (const f of site.features.items) {
      expect(screen.getByRole("heading", { level: 3, name: f.headline })).toBeInTheDocument();
      expect(screen.getByText(f.mock!.srSummary)).toBeInTheDocument();
    }
  });

  it("renders the mock text from content", () => {
    render(<FeatureGrid features={site.features} />);
    expect(screen.getByText("3 key updates while you were away")).toBeInTheDocument();
    expect(screen.getByText("Task detected → Added to Sprint Calendar for Tuesday, 5:00 PM")).toBeInTheDocument();
    expect(screen.getByText("Format into executive summary")).toBeInTheDocument();
  });

  it("renders a feature without a mock", () => {
    const f = features(1);
    delete f.items[0].mock;
    const { container } = render(<FeatureGrid features={f} />);
    expect(container.querySelector(".fvis")).toBeNull();
  });
});

describe("Journey", () => {
  it("renders every beat in order", () => {
    render(<Journey journey={site.journey} />);
    expect(screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent)).toEqual(["Talk", "Distill", "Deliver"]);
  });

  it("shows each card's tag and no eyebrow", () => {
    const { container } = render(<Journey journey={site.journey} />);
    expect(container.querySelector(".eyebrow")).toBeNull();
    for (const beat of site.journey.beats) if (beat.tag) expect(screen.getByText(beat.tag)).toBeInTheDocument();
  });

  it("tolerates cards without an icon or tag", () => {
    const beats = site.journey.beats.map((b) => ({ number: b.number, title: b.title, body: b.body }));
    const { container } = render(<Journey journey={{ ...site.journey, beats }} />);
    expect(container.querySelectorAll(".jcard")).toHaveLength(beats.length);
    expect(container.querySelector(".jcard-tag, .jcard-icon")).toBeNull();
  });

  it("renders nothing without beats", () => {
    const { container } = render(<Journey journey={{ ...site.journey, beats: [] }} />);
    expect(container).toBeEmptyDOMElement();
  });
});

describe("Pricing", () => {
  it("renders each tier, marks the featured one and never renders internal notes", () => {
    const { container } = render(<Pricing pricing={site.pricing} />);
    expect(container.querySelectorAll(".plan")).toHaveLength(3);
    expect(container.querySelector(".plan.featured h3")).toHaveTextContent("Pro");
    expect(screen.queryByText(/Top-of-funnel/)).not.toBeInTheDocument();
    expect(screen.getByText("Custom pricing")).toBeInTheDocument();
  });

  it("gives only the featured plan the primary CTA and corner ticks", () => {
    const { container } = render(<Pricing pricing={site.pricing} />);
    expect(container.querySelectorAll(".btn-primary")).toHaveLength(1);
    expect(container.querySelector(".plan.featured .btn-primary")).not.toBeNull();
    expect(container.querySelectorAll(".plan.featured .ticks > i")).toHaveLength(4);
  });

  it("renders an optional note under the price", () => {
    const tiers = site.pricing.tiers.map((t, i) => (i === 0 ? { ...t, note: "No card needed." } : t));
    render(<Pricing pricing={{ ...site.pricing, tiers }} />);
    expect(screen.getByText("No card needed.")).toBeInTheDocument();
  });

  it("renders any number of plan bullets", () => {
    const tiers = site.pricing.tiers.map((t, i) => (i === 0 ? { ...t, features: [...t.features, "Extra one", "Extra two"] } : t));
    render(<Pricing pricing={{ ...site.pricing, tiers }} />);
    expect(screen.getByText("Extra two")).toBeInTheDocument();
  });
});

describe("Showcase", () => {
  it("renders Acta's task card, the composer and recent activity from content", () => {
    const { container } = render(<Showcase showcase={site.showcase!} brandName={site.brand.name} />);
    const card = site.showcase!.messages.find((m) => m.tasks)!.tasks!;
    expect(container.querySelectorAll(".task-card li")).toHaveLength(card.items.length);
    expect(container.querySelector(".app-composer")?.textContent).toContain(site.showcase!.composer!.placeholder);
    expect(container.querySelectorAll(".activity li")).toHaveLength(site.showcase!.activity!.items.length);
  });

  it("tolerates a showcase without composer, activity or task card", () => {
    const { composer: _c, activity: _a, ...rest } = site.showcase!;
    const messages = rest.messages.filter((m) => !m.tasks);
    const { container } = render(<Showcase showcase={{ ...rest, messages }} brandName={site.brand.name} />);
    expect(container.querySelector(".app-composer, .activity, .task-card")).toBeNull();
  });

  it("renders the workspace mock with its screen-reader summary", () => {
    render(<Showcase showcase={site.showcase!} brandName={site.brand.name} />);
    expect(screen.getByText(site.showcase!.srSummary)).toBeInTheDocument();
    expect(screen.getByText("While you were away")).toBeInTheDocument();
  });
});

describe("Header and Footer", () => {
  it("renders nav links and the CTA from content", () => {
    render(<Header site={site} />);
    for (const item of site.nav.items) {
      expect(screen.getAllByRole("link", { name: item.label }).length).toBeGreaterThan(0);
    }
    expect(screen.getByRole("link", { name: site.ui.skipLink })).toHaveAttribute("href", "#main");
  });

  it("toggles the mobile menu", () => {
    render(<Header site={site} />);
    const btn = screen.getByRole("button", { name: site.ui.menuOpen });
    expect(btn).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(btn);
    expect(screen.getByRole("button", { name: site.ui.menuClose })).toHaveAttribute("aria-expanded", "true");
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.getByRole("button", { name: site.ui.menuOpen })).toHaveAttribute("aria-expanded", "false");
  });

  it("renders footer groups and legal line", () => {
    render(<Footer site={site} />);
    expect(screen.getByRole("heading", { name: site.footer.groups[0].label })).toBeInTheDocument();
    expect(screen.getByText(site.footer.legal)).toBeInTheDocument();
  });
});

describe("ClosingCta signup form", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("shows the content error for an invalid email", async () => {
    render(<ClosingCta closing={site.closing} />);
    fireEvent.change(screen.getByLabelText(site.closing.form.label), { target: { value: "maya@" } });
    fireEvent.click(screen.getByRole("button", { name: site.closing.form.submit }));
    expect(await screen.findByText(site.closing.form.error)).toBeInTheDocument();
    expect(screen.getByLabelText(site.closing.form.label)).toHaveAttribute("aria-invalid", "true");
  });

  it("shows the content success line after a successful post", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    render(<ClosingCta closing={site.closing} />);
    fireEvent.change(screen.getByLabelText(site.closing.form.label), { target: { value: "maya@northwind.io" } });
    fireEvent.click(screen.getByRole("button", { name: site.closing.form.submit }));
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent(site.closing.form.success));
    expect(fetchMock).toHaveBeenCalledWith(site.closing.form.action, expect.objectContaining({ method: "POST" }));
  });

  it("shows the content failure line when the request fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    render(<ClosingCta closing={site.closing} />);
    fireEvent.change(screen.getByLabelText(site.closing.form.label), { target: { value: "maya@northwind.io" } });
    fireEvent.click(screen.getByRole("button", { name: site.closing.form.submit }));
    expect(await screen.findByText(site.closing.form.failure)).toBeInTheDocument();
  });
});
