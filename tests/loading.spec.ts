import { test as it, expect } from "@playwright/test";

it.describe("Test loading page elements", () => {
  it.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:8000/");
  });

  it.describe("TITLE TESTING", () => {
    it("verify There is no title", async ({ page }) => {
        await expect(page.locator("#game_title")).toBeHidden();
    });

    it("verify title top margin", async ({ page }) => {
        await expect(page.locator("#game_title")).toHaveCSS('margin-top','50px');
    });
  });

  it.describe("GAME TEXT testing", () => {
    it("no game text in the loading screen", async ({ page }) => {
      await expect(page.locator("#game_text")).toBeHidden();
    });
  });

  it.describe("GIF testing", () => {
    it("has gif", async ({ page }) => {
      await expect(page.locator("#game_img").locator("img")).toBeVisible();
    });

    it("gif is visible", async ({ page }) => {
      await expect(page.locator("#game_img").locator("img")).toBeVisible();
    });

    it("Correct gif is displayed", async ({ page }) => {
      expect(
        await page.locator("#game_img").locator("img").getAttribute("src")
      ).toContain("loading");
    });
  });

  it.describe("continue BTN testing", () => {
    it("button is not visible at first", async ({ page }) => {
      await expect(page.locator("#but_a")).toBeHidden();
    });

    it("button is visible after 3s", async ({ page }) => {
      await page.waitForTimeout(3000);
      await expect(page.locator("#but_a")).toBeVisible();
    });

    it("button text", async ({ page }) => {
      await page.waitForTimeout(3000);
      await expect(page.locator("#but_a")).toHaveText("Continue");
    });

    it("button initial color", async ({ page }) => {
      await page.waitForTimeout(3000);
      await expect(page.locator("#but_a")).toHaveCSS(
        "color",
        "rgb(144, 43, 145)"
      );
    });

    it("button color on hover", async ({ page }) => {
      await page.waitForTimeout(3000);
      await page.locator("#but_a").hover();
      await expect(page.locator("#but_a")).toHaveCSS(
        "color",
        "rgb(144, 43, 245)"
      );
    });

    it("button onclick navigation", async ({ page }) => {
      await page.waitForTimeout(3000);
      await page.locator("#but_a").click();
      await expect(page.locator("#game_title")).toHaveText(
        "Welcome to Russian Roulette"
      );
    });

    it("other buttons not visible", async ({ page }) => {
      await page.waitForTimeout(3000);
      //other buttons should be hidden
      await expect(page.locator("#but_b")).toBeHidden();
      await expect(page.locator("#but_c")).toBeHidden();
    });
  });
});
