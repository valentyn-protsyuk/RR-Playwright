import { test as it, expect } from "@playwright/test";

it.describe("GIVE UP TRANSITION testing", () => {
  it.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:8000/");
    await page.waitForTimeout(3000);
    await page.locator("#but_a").click();
    await page.locator("#but_a").click();
    await page.locator("#but_a").click();
    await page.waitForTimeout(3000); //skip transition
    await page.locator("#but_a").click();
    await page.locator("#but_b").click();
  });


  it.describe("AUDIO TESTING", () => {
    it("verify the audio is correct", async ({ page }) => {
        expect(
            await page.locator("#game_audio").getAttribute("src")
          ).toContain("surrender");
    });

    it("verify the audio is playing", async ({ page }) => {
        await expect(await page.locator("#game_audio").evaluate(audio => audio.ended)).toBe(false);
    });
  });

  it.describe("TITLE TESTING", () => {
    it("verify title text", async ({ page }) => {
        await expect(page.locator("#game_title")).toHaveText(
            "You surrender :c"
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
    it("gif is visible", async ({ page }) => {
      await expect(page.locator("#game_img").locator("img")).toBeVisible();
    });

    it("Correct gif is displayed", async ({ page }) => {
      expect(
        await page.locator("#game_img").locator("img").getAttribute("src")
      ).toContain("surrender");
    });
  });

  it.describe("GAME TEXT testing", () => {
    it("no game text on screen", async ({ page }) => {
      await expect(page.locator("#game_text")).toBeHidden();
    });
  });

  it.describe("btns hidden", () => {
    it("first button is hidden", async ({ page }) => {
      await expect(page.locator("#but_a")).toBeHidden();
    });

    it("second button is hidden", async ({ page }) => {
      await expect(page.locator("#but_b")).toBeHidden();
    });

    it("third button is hidden", async ({ page }) => {
      await expect(page.locator("#but_c")).toBeHidden();
    });
  });

  it.describe("Make sure next state appears (You lost screen)", () => {
    it("verify title text", async ({ page }) => {
      await page.waitForTimeout(4000);
      await expect(page.locator("#game_title")).toHaveText(
          "You lost!"
        );
    });

    it("verify the audio is correct", async ({ page }) => {
      await page.waitForTimeout(4000);
      expect(
          await page.locator("#game_audio").getAttribute("src")
        ).toContain("loss");
  });

    it("first button is visible", async ({ page }) => {
      await page.waitForTimeout(4000);
      await expect(page.locator("#but_a")).toBeVisible();
    });

    it("first button text", async ({ page }) => {
      await page.waitForTimeout(4000);
      await expect(page.locator("#but_a")).toHaveText("Try again");
    });

    it("second button is visible", async ({ page }) => {
      await page.waitForTimeout(4000);
      await expect(page.locator("#but_b")).toBeVisible();
    });

    it("second button text", async ({ page }) => {
      await page.waitForTimeout(4000);
      await expect(page.locator("#but_b")).toHaveText("Main menu");
    });

    it("third button is hidden", async ({ page }) => {
      await page.waitForTimeout(4000);
      await expect(page.locator("#but_c")).toBeHidden();
    });
  });
});