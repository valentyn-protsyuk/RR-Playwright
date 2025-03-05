import { test as it, expect } from "@playwright/test";

it.describe("COIN FLIP TRANSITION TESTING", () => {
    it.beforeEach(async ({ page }) => {
        await page.goto("http://localhost:8000/");
        await page.evaluate(() => {
            window.next_state("coin"); // force coin transition
        });
      });
    
      it.describe("AUDIO TESTING", () => {
        it("verify the audio is correct", async ({ page }) => {
            expect(
                await page.locator("#game_audio").getAttribute("src")
              ).toContain("coin");
        });
    
        it("verify the audio is playing", async ({ page }) => {
            await expect(await page.locator("#game_audio").evaluate(audio => audio.ended)).toBe(false);
        });
      });
    
      it.describe("TITLE TESTING", () => {
        it("verify title text", async ({ page }) => {
            await expect(page.locator("#game_title")).toHaveText(
                "Coin flip!"
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
          ).toContain("coinFlip");
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

  it("BOTH OUTCOMES ARE ACCESSIBLE", async ({ page }) => {
    let event1 = false;
    let event2 = false;
    let count = 0;

    while (!(event1 && event2)) {
      count++;
      await page.evaluate(() => {
        window.next_state("start"); // force choose turn screen
      });

      await page.locator("#but_c").click(); //choose coin flip

      await page.waitForTimeout(2600); //skip transition

      if ((await page.locator("#game_title").textContent()) === "Enemy's turn") {
        event1 = true;
      }

      if ((await page.locator("#game_title").textContent()) === "Your turn") {
        event2 = true;
      }

      //chance is 50 50 so 10 attempts should be enough
      if (count > 9) {
        break;
      }
    }
  });
});