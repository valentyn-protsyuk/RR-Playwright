import { test as it, expect } from "@playwright/test";

it.describe("Test Turn choice page elements", () => {
  it.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:8000/");
    await page.waitForTimeout(3000);
    await page.locator("#but_a").click();
    await page.locator("#but_a").click();
    await page.locator("#but_a").click();
    await page.waitForTimeout(3000); //skip transition
  });


  it.describe("AUDIO TESTING", () => {
    it("verify the sound effect ended", async ({ page }) => {
        await expect(await page.locator("#game_audio").evaluate(audio => audio.ended)).toBe(true);
    });
  });

  it.describe("TITLE TESTING", () => {
    it("verify title text", async ({ page }) => {
        await expect(page.locator("#game_title")).toHaveText(
            "Choose who goes first"
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
      await expect(page.locator("#game_text")).toBeHidden();
    });
  });

  it.describe("YOU BTN testing", () => {

    it("button is visible", async ({ page }) => {
      await expect(page.locator("#but_a")).toBeVisible();
    });

    it("button text", async ({ page }) => {
      await expect(page.locator("#but_a")).toHaveText("You");
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
      await expect(page.locator("#game_title")).toHaveText(
        "Your turn"
      );
    });
  });

  it.describe("ENEMY BTN testing", () => {
    it("button is visible", async ({ page }) => {
      await expect(page.locator("#but_b")).toBeVisible();
    });

    it("button text", async ({ page }) => {
      await expect(page.locator("#but_b")).toHaveText("Enemy");
    });

    it("button initial color", async ({ page }) => {
      await expect(page.locator("#but_b")).toHaveCSS(
        "color",
        "rgb(144, 43, 145)"
      );
    });

    it("button color on hover", async ({ page }) => {
      await page.locator("#but_b").hover();
      await expect(page.locator("#but_b")).toHaveCSS(
        "color",
        "rgb(144, 43, 245)"
      );
    });

    it("button onclick navigation", async ({ page }) => {
      await page.locator("#but_b").click();
      await expect(page.locator("#game_title")).toHaveText(
        "Enemy's turn"
      );
    });
  });

  it.describe("COIN FLIP BTN testing", () => {
    it("button is visible", async ({ page }) => {
      await expect(page.locator("#but_c")).toBeVisible();
    });

    it("button text", async ({ page }) => {
      await expect(page.locator("#but_c")).toHaveText("Coin flip");
    });

    it("button initial color", async ({ page }) => {
      await expect(page.locator("#but_c")).toHaveCSS(
        "color",
        "rgb(144, 43, 145)"
      );
    });

    it("button color on hover", async ({ page }) => {
      await page.locator("#but_c").hover();
      await expect(page.locator("#but_c")).toHaveCSS(
        "color",
        "rgb(144, 43, 245)"
      );
    });

    it("button onclick navigation", async ({ page }) => {
      await page.locator("#but_c").click();
      page.pause();
      await expect(page.locator("#game_title")).toHaveText(
        "Coin flip!"
      );
    });
  });
});