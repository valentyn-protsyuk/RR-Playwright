import { test as it, expect } from "@playwright/test";

it.describe("VERIFY PULL TRIGGER IS RANDOM", () => {
  it("both states should be accessible", async ({ page }) => {
    await page.goto("http://localhost:8000/");

    let event1 = false;
    let event2 = false;
    let count = 0;
    let pass = true;

    while (!(event1 && event2)) {
      count++;

      await page.goto("http://localhost:8000/");
      await page.evaluate(() => {
        window.next_state("player_turn"); // force choose your turn
      });

      await page.locator("#but_a").click(); //choose pull trigger

      if ((await page.locator("#game_title").textContent()) === "Empty!") {
        event1 = true;
      }

      if ((await page.locator("#game_title").textContent()) === "Bang!") {
        event2 = true;
      }

      //chance is one out of 6 so 20 attempts should be enough
      if (count > 19) {
        pass = false;
        break;
      }
    }

    expect(pass).toBe(true);
  });
});