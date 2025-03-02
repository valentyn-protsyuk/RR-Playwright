import { test as it, expect } from "@playwright/test";

it.describe("Test loading page elements", () => {
  it.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:8000/");
    await page.waitForTimeout(3000);
    await page.locator("#but_a").click();
  });


//   it.describe("AUDIO TESTING", () => {
//     it("verify audio element exists", async ({ page }) => {
//         await expect(page.locator("#game_audio")).toBeVisible();
//     });
    
//     it("verify the audio is playing", async ({ page }) => {
//         await expect(page.locator("#game_audio")).toHaveCSS('text-transform','uppercase');
//     });

//     it("verify the audio is correct", async ({ page }) => {
//         await expect(page.locator("#game_audio")).toHaveCSS('color','rgb(148, 163, 184)');
//     });
//   });

  it.describe("TITLE TESTING", () => {
    it("verify title text", async ({ page }) => {
        await expect(page.locator("#game_title")).toHaveText(
            "Welcome to Russian Roulette"
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

  it.describe("START BTN testing", () => {

    it("button is visible", async ({ page }) => {
      await expect(page.locator("#but_a")).toBeVisible();
    });

    it("button text", async ({ page }) => {
      await expect(page.locator("#but_a")).toHaveText("Start");
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
        "Lore"
      );
    });

    it("third button is not visible", async ({ page }) => {
      //other buttons should be hidden
      await expect(page.locator("#but_c")).toBeHidden();
    });
  });

  it.describe("EXIT BTN testing", () => {

    it("button is visible", async ({ page }) => {
      await expect(page.locator("#but_b")).toBeVisible();
    });

    it("button text", async ({ page }) => {
      await expect(page.locator("#but_b")).toHaveText("Exit");
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
        "See you next time"
      );
    });

    it("third button is not visible", async ({ page }) => {
      //other buttons should be hidden
      await expect(page.locator("#but_c")).toBeHidden();
    });
  });
});