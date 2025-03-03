import { test as it, expect } from "@playwright/test";

it.describe("Test lore screen elements", () => {
  it.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:8000/");
    await page.waitForTimeout(3000);
    await page.locator("#but_a").click();
    await page.locator("#but_a").click();
  });

  it.describe("AUDIO TESTING", () => {
    it("verify the audio is correct", async ({ page }) => {
        expect(
            await page.locator("#game_audio").getAttribute("src")
          ).toContain("menu");
    });

    it("verify the audio is playing", async ({ page }) => {
        await expect(await page.locator("#game_audio").evaluate(audio => audio.ended)).toBe(false);
    });
  });

  it.describe("TITLE TESTING", () => {
    it("verify title text", async ({ page }) => {
        await expect(page.locator("#game_title")).toHaveText(
            "Lore"
          );
    });
    it("verify title text color", async ({ page }) => {
        await expect(page.locator("#game_title")).toHaveCSS('color','rgb(148, 163, 184)');
    });

    it("verify title text is uppercase", async ({ page }) => {
        await expect(page.locator("#game_title")).toHaveCSS('text-transform','uppercase');
    });

    it("verify title top margin", async ({ page }) => {
        await expect(page.locator("#game_title")).toHaveCSS('margin-top','50px');
    });
  });

  it.describe("GIF testing", () => {
    it("no gif in the menu", async ({ page }) => {
      await expect(page.locator("#game_img").locator("img")).toBeHidden();
    });
  });

  it.describe("GAME TEXT testing", () => {
    it("no game text in the menu", async ({ page }) => {
      await expect(page.locator("#game_text")).toHaveText(
        "As tensions escalated between two friends, their disagreement reached a breaking point. With no resolution in sight, the unthinkable was proposed—a game of russian roulette to settle their dispute."
      );
    });
  });

  it.describe("continue BTN testing", () => {
    it("button is visible after 3s", async ({ page }) => {
      await expect(page.locator("#but_a")).toBeVisible();
    });

    it("button text", async ({ page }) => {
      await expect(page.locator("#but_a")).toHaveText("Continue");
    });

    it("button initial color", async ({ page }) => {
      await expect(page.locator("#but_a")).toHaveCSS(
        "color",
        "rgb(144, 43, 145)"
      );
    });

    it("button color on hover", async ({ page }) => {
      await page.locator("#but_a").hover();
      await expect(page.locator("#but_a")).toHaveCSS(
        "color",
        "rgb(144, 43, 245)"
      );
    });

    it("button onclick navigation", async ({ page }) => {
      await page.locator("#but_a").click();
      page.pause();

      await expect(page.locator("#game_title")).toHaveText(
        "Loading..."
      );
    });
  });

  it.describe("Buttons are hidden", () => {
    it("second button is not visible", async ({ page }) => {
        await expect(page.locator("#but_b")).toBeHidden();
    });

    it("third button is not visible", async ({ page }) => {
      await expect(page.locator("#but_c")).toBeHidden();
    });
  });
});