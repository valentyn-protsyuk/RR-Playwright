import { test as it, expect } from "@playwright/test";

it.describe("YOU LOST SCREEN tests", () => {
  it.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:8000/");
    await page.waitForTimeout(3000);
    await page.locator("#but_a").click();
    await page.locator("#but_a").click();
    await page.locator("#but_a").click();
    await page.waitForTimeout(3000); //skip transition
    await page.locator("#but_a").click();
    await page.locator("#but_b").click();
    await page.waitForTimeout(4000); //skip transition
  });

  it.describe("AUDIO TESTING", () => {
    it("verify the audio is correct", async ({ page }) => {
        expect(
            await page.locator("#game_audio").getAttribute("src")
          ).toContain("loss");
    });

    it("verify the audio is playing", async ({ page }) => {
        await expect(await page.locator("#game_audio").evaluate(audio => audio.ended)).toBe(false);
    });
  });

  it.describe("TITLE TESTING", () => {
    it("verify title text", async ({ page }) => {
        await expect(page.locator("#game_title")).toHaveText(
            "You lost!"
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
    it("no gif on screen", async ({ page }) => {
      await expect(page.locator("#game_img").locator("img")).toBeHidden();
    });
  });

  it.describe("GAME TEXT testing", () => {
    it("no game text on screen", async ({ page }) => {
      await expect(page.locator("#game_text")).toBeHidden();
    });
  });

  it.describe("TRY AGAIN BTN testing", () => {

    it("button is visible", async ({ page }) => {
      await expect(page.locator("#but_a")).toBeVisible();
    });

    it("button text", async ({ page }) => {
      await expect(page.locator("#but_a")).toHaveText("Try again");
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
        "Loading..."
      );
    });
  });

  it.describe("MAIN MENU BTN testing", () => {

    it("button is visible", async ({ page }) => {
      await expect(page.locator("#but_b")).toBeVisible();
    });

    it("button text", async ({ page }) => {
      await expect(page.locator("#but_b")).toHaveText("Main menu");
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
        "Welcome to Russian Roulette"
      );
    });
  });

  it.describe('third button should be hidden', () => {
    it("third button is not visible", async ({ page }) => {
        //other buttons should be hidden
        await expect(page.locator("#but_c")).toBeHidden();
      });
  });
});