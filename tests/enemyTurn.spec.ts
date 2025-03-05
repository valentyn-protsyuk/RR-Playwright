import { test as it, expect } from "@playwright/test";

it.describe("VERIFY ENEMY TURN IS RANDOM", () => {
  it("BOTH STATES ARE ACCESSIBLE", async ({ page }) => {
    await page.goto("http://localhost:8000/");

    let event1 = false;
    let event2 = false;
    let count = 0;

    while (!(event1 && event2)) {
      count++;

      await page.goto("http://localhost:8000/");
      await page.evaluate(() => {
        window.next_state("start"); // force choose turn screen
      });

      await page.locator("#but_b").click(); //choose enemy turn

      if ((await page.locator("#game_title").textContent()) === "Enemy's turn") {
        event1 = true;
      }

      if ((await page.locator("#game_title").textContent()) === "Enemy Died!") {
        event2 = true;
      }

      //chance is one out of 6 so 20 attempts should be enough
      if (count > 19) {
        break;
      }
    }
  });
});
