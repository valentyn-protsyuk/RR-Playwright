import { test as it, expect } from "@playwright/test";

it.describe("Your Turn screen testing", () => {
  it.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:8000/");
    await page.waitForTimeout(3000);
    await page.locator("#but_a").click();
    await page.locator("#but_a").click();
    await page.locator("#but_a").click();
    await page.waitForTimeout(3000); //skip transition
    await page.locator("#but_a").click();
  });


  it.describe("AUDIO TESTING", () => {
    it("verify the sound effect ended", async ({ page }) => {
        await page.waitForTimeout(1000);
        await expect(await page.locator("#game_audio").evaluate(audio => audio.ended)).toBe(true);
    });
  });

  it.describe("TITLE TESTING", () => {
    it("verify title text", async ({ page }) => {
        await expect(page.locator("#game_title")).toHaveText(
            "Your turn"
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
      ).toContain("playerWait");
    });
  });

  it.describe("GAME TEXT testing", () => {
    it("no game text on screen", async ({ page }) => {
      await expect(page.locator("#game_text")).toBeHidden();
    });
  });

  it.describe("PULL TRIGGER BTN testing", () => {
    it("button is visible", async ({ page }) => {
      await expect(page.locator("#but_a")).toBeVisible();
    });

    it("button text", async ({ page }) => {
      await expect(page.locator("#but_a")).toHaveText("Pull trigger");
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
      expect(["Empty!","Bang!"]).toContain(await page.locator("#game_title").textContent());
    });
  });

  it.describe("GIVE UP BTN testing", () => {
    it("button is visible", async ({ page }) => {
      await expect(page.locator("#but_b")).toBeVisible();
    });

    it("button text", async ({ page }) => {
      await expect(page.locator("#but_b")).toHaveText("Give up");
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
        "You surrender :c"
      );
    });
  });

  it.describe("no third option/btn", () => {
    it("third button is hidden", async ({ page }) => {
      await expect(page.locator("#but_c")).toBeHidden();
    });
  });
});