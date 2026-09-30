import { expect, test } from "@playwright/test";
import site from "../../content/site.json" with { type: "json" };

for (const width of [375, 768, 1024, 1440]) {
  test(`page renders every section at ${width}px without horizontal scroll`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(site.hero.headline);
    for (const f of site.features.items) {
      await expect(page.getByRole("heading", { level: 3, name: f.headline })).toBeAttached();
    }
    for (const t of site.pricing.tiers) {
      await expect(page.getByRole("heading", { level: 3, name: t.name })).toBeAttached();
    }
    await expect(page.getByRole("heading", { level: 2, name: site.closing.headline })).toBeAttached();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(overflow).toBe(false);
  });
}

test("light theme uses the brand tokens", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  const bg = await page.evaluate(() => getComputedStyle(document.documentElement).backgroundColor);
  expect(bg).toBe("rgb(255, 255, 255)");
  const cta = page.locator(".hero").getByRole("link", { name: site.hero.primaryCta.label });
  await expect(cta).toHaveCSS("background-color", "rgb(114, 58, 197)");
  await expect(page.locator(".plan.featured .btn")).toHaveCSS("background-color", "rgb(114, 58, 197)");
  const font = await page.evaluate(() => getComputedStyle(document.body).fontFamily);
  expect(font.toLowerCase()).toContain("inter");
});

test("dark theme follows the system preference through tokens.css", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  const bg = await page.evaluate(() => getComputedStyle(document.documentElement).backgroundColor);
  expect(bg).toBe("rgb(18, 11, 32)");
  await expect(page.locator(".fcell .card").first()).toHaveCSS("background-color", "rgb(29, 20, 50)");
});

test("skip link comes first and keyboard focus is visible", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: site.ui.skipLink });
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();
  await page.keyboard.press("Tab");
  const shadow = await page.evaluate(() => getComputedStyle(document.activeElement as Element).boxShadow);
  expect(shadow).not.toBe("none");
});

test("mobile menu opens, closes with Escape and returns focus", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 800 });
  await page.goto("/");
  const btn = page.getByRole("button", { name: site.ui.menuOpen });
  await btn.click();
  const sheet = page.locator(".menu-sheet");
  await expect(sheet).toBeVisible();
  for (const item of site.nav.items) await expect(sheet.getByRole("link", { name: item.label })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(sheet).toBeHidden();
  await expect(page.getByRole("button", { name: site.ui.menuOpen })).toBeFocused();
});

test("desktop shows inline nav and hides the menu button", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.getByRole("button", { name: site.ui.menuOpen })).toBeHidden();
  await expect(page.locator(".navlinks")).toBeVisible();
});

test("reduced motion shows every mock in its final state", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  // Each demo plays once when its cell comes into view; visit all four.
  for (const cell of await page.locator(".fcell").all()) {
    await cell.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
  }
  // Reduced motion keeps gentle fades (no movement); wait for the longest timeline to finish.
  await page.waitForTimeout(2800);
  const transforms = await page.locator(".fcell .card").evaluateAll((els) => els.map((e) => getComputedStyle(e).transform));
  expect(transforms.every((t) => t === "none")).toBe(true);
  const opacities = await page.locator(".fcell .card").evaluateAll((els) => els.map((e) => getComputedStyle(e).opacity));
  expect(opacities.every((o) => o === "1")).toBe(true);
});

test("signup form shows the content error, then success", async ({ page }) => {
  await page.goto("/");
  const input = page.getByLabel(site.closing.form.label);
  await input.fill("maya@");
  await page.getByRole("button", { name: site.closing.form.submit }).click();
  await expect(page.getByText(site.closing.form.error)).toBeVisible();
  await input.fill("maya@northwind.io");
  await page.getByRole("button", { name: site.closing.form.submit }).click();
  await expect(page.getByRole("status")).toHaveText(site.closing.form.success);
});

test("touch targets on interactive controls are at least 44px tall", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 800 });
  await page.goto("/");
  const small = await page.evaluate(() =>
    [...document.querySelectorAll("a.btn, button, .foot-groups a, .menu-btn")]
      .filter((el) => (el as HTMLElement).offsetParent !== null)
      .filter((el) => el.getBoundingClientRect().height < 44)
      .map((el) => el.textContent),
  );
  expect(small).toEqual([]);
});

test("hero video is decorative, muted, and stays paused under reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const video = page.locator(".hero-video");
  await expect(video).toHaveAttribute("src", site.hero.backgroundVideo.src);
  expect(await video.evaluate((v: HTMLVideoElement) => v.muted && v.loop && v.paused)).toBe(true);
});

test("sticky header is frosted glass (real backdrop blur, see-through fill)", async ({ page }) => {
  await page.goto("/");
  const style = await page.locator(".site-head").evaluate((el) => {
    const cs = getComputedStyle(el);
    return { filter: cs.backdropFilter, bg: cs.backgroundColor };
  });
  expect(style.filter).toContain("blur(24px)");
  expect(style.bg).toMatch(/rgba\(.+, 0\.5\)/);
});

test("every scroll reveal finishes once the page has been scrolled", async ({ page }) => {
  await page.goto("/");
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y <= height; y += 400) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(80);
  }
  await page.waitForTimeout(1600);
  const pending = await page.locator("[data-reveal]:not(.is-in)").count();
  expect(pending).toBe(0);
  const hiddenHeadings = await page.locator("h1, h2, h3").evaluateAll((els) =>
    els.filter((e) => getComputedStyle(e).opacity !== "1").length,
  );
  expect(hiddenHeadings).toBe(0);
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });
  test("no content is hidden behind reveal animations", async ({ page }) => {
    await page.goto("/");
    const headline = page.getByRole("heading", { level: 1 });
    await expect(headline).toHaveText(site.hero.headline);
    expect(await headline.evaluate((e) => getComputedStyle(e).clipPath)).toBe("none");
    const faded = await page.locator("[data-reveal]").evaluateAll((els) => els.filter((e) => getComputedStyle(e).opacity !== "1").length);
    expect(faded).toBe(0);
  });
});

test("feature demos build up once and never blank or replay", async ({ page }) => {
  await page.goto("/");
  const cell = page.locator(".fcell").first();
  const card = cell.locator(".r3");
  expect(await card.evaluate((e) => getComputedStyle(e).opacity)).toBe("0"); // hidden until it plays, no blink
  await cell.scrollIntoViewIfNeeded();
  await expect(cell).toHaveClass(/play/);
  await expect.poll(() => card.evaluate((e) => getComputedStyle(e).opacity), { timeout: 5000 }).toBe("1");
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(600);
  await cell.scrollIntoViewIfNeeded();
  expect(await card.evaluate((e) => getComputedStyle(e).opacity)).toBe("1"); // still finished: no replay
});

test("hero heading is 64px on desktop and the CTA is sized to it", async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 945 });
  await page.goto("/");
  await expect(page.locator("#hero-title")).toHaveCSS("font-size", "64px");
  const cta = page.locator(".hero .btn-primary");
  await expect(cta).toHaveCSS("height", "48px");
  await expect(cta).toHaveCSS("font-size", "16px");
});
