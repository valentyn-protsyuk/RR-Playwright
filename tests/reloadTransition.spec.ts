import { test as it, expect } from "@playwright/test";

it.describe("Enemy empty transition testing", () => {
  it.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:8000/");
    await page.evaluate(() => {
        window.next_state("load_revolver"); // force enemy empty transition
    });
  });


  it.describe("PART 1 AUDIO TESTING", () => {
    it("verify the audio is correct", async ({ page }) => {
        expect(
            await page.locator("#game_audio").getAttribute("src")
          ).toContain("loadBullet");
    });

    it("verify the audio is playing", async ({ page }) => {
        await expect(await page.locator("#game_audio").evaluate(audio => audio.ended)).toBe(false);
    });
  });

  it.describe("PART 1 TITLE TESTING", () => {
    it("verify title text", async ({ page }) => {
        await expect(page.locator("#game_title")).toHaveText(
            "Loading..."
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
 
  it.describe("PART 1 GIF testing", () => {
    it("gif is visible", async ({ page }) => {
      await expect(page.locator("#game_img").locator("img")).toBeVisible();
    });

    it("Correct gif is displayed", async ({ page }) => {
      expect(
        await page.locator("#game_img").locator("img").getAttribute("src")
      ).toContain("loadBullet");
    });
  });

  it.describe("PART 1 GAME TEXT testing", () => {
    it("no game text on screen", async ({ page }) => {
      await expect(page.locator("#game_text")).toBeHidden();
    });
  });

  it.describe("PART 1 btns hidden", () => {
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

  it.describe("PART 2 AUDIO TESTING", () => {
    it("verify the audio is correct", async ({ page }) => {
        await page.waitForTimeout(600);
        expect(
            await page.locator("#game_audio").getAttribute("src")
          ).toContain("spin3");
    });

    it("verify the audio is playing", async ({ page }) => {
        await page.waitForTimeout(600);
        await expect(await page.locator("#game_audio").evaluate(audio => audio.ended)).toBe(false);
    });
  });

  it.describe("PART 2 TITLE TESTING", () => {
    it("verify title text", async ({ page }) => {
        await page.waitForTimeout(600);
        await expect(page.locator("#game_title")).toHaveText(
            "Loading..."
          );
    });

    it("verify title text color", async ({ page }) => {
        await page.waitForTimeout(600);
        await expect(page.locator("#game_title")).toHaveCSS('color','rgb(148, 163, 184)');
    });

    it("verify title text is uppercase", async ({ page }) => {
        await page.waitForTimeout(600);
        await expect(page.locator("#game_title")).toHaveCSS('text-transform','uppercase');
    });

    it("verify title top margin", async ({ page }) => {
        await page.waitForTimeout(600);
        await expect(page.locator("#game_title")).toHaveCSS('margin-top','50px');
    });
  });
 
  it.describe("PART 2 GIF testing", () => {
    it("gif is visible", async ({ page }) => {
        await page.waitForTimeout(600);
      await expect(page.locator("#game_img").locator("img")).toBeVisible();
    });

    it("Correct gif is displayed", async ({ page }) => {
        await page.waitForTimeout(600);
      expect(
        await page.locator("#game_img").locator("img").getAttribute("src")
      ).toContain("cylinderSpin");
    });
  });

  it.describe("PART 2 GAME TEXT testing", () => {
    it("no game text on screen", async ({ page }) => {
        await page.waitForTimeout(600);
      await expect(page.locator("#game_text")).toBeHidden();
    });
  });

  it.describe("PART 2 btns hidden", () => {
    it("first button is hidden", async ({ page }) => {
        await page.waitForTimeout(600);
        await expect(page.locator("#but_a")).toBeHidden();
      });

    it("second button is hidden", async ({ page }) => {
        await page.waitForTimeout(600);
        await expect(page.locator("#but_b")).toBeHidden();
    });

    it("third button is hidden", async ({ page }) => {
        await page.waitForTimeout(600);
      await expect(page.locator("#but_c")).toBeHidden();
    });
  });

  it.describe("Check next state", () => {
    it("Check that the next state title appears", async ({ page }) => {
        await page.waitForTimeout(3000);
        await expect(page.locator("#game_title")).toHaveText(
            "Choose who goes first"
          );
    });
  });
});