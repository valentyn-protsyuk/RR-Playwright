import { test as it, expect } from "@playwright/test";

it.describe("Player empty transition testing", () => {
  it.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:8000/");
    await page.evaluate(() => {
        window.next_state("player_empty"); // force player empty transition
    });
  });


  it.describe("AUDIO TESTING", () => {
    it("verify the audio is correct", async ({ page }) => {
        expect(
            await page.locator("#game_audio").getAttribute("src")
          ).toContain("click");
    });

    it("verify the audio is playing", async ({ page }) => {
        await expect(await page.locator("#game_audio").evaluate(audio => audio.ended)).toBe(false);
    });
  });

  it.describe("TITLE TESTING", () => {
    it("verify title text", async ({ page }) => {
        await expect(page.locator("#game_title")).toHaveText(
            "Empty!"
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
      ).toContain("playerLucky");
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

  it.describe("Check next state", () => {
    it("Check that the next state title appears", async ({ page }) => {
        await page.waitForTimeout(2600);
        expect(["Enemy's turn","Enemy Died!"]).toContain(await page.locator("#game_title").textContent());
    });
  });
});