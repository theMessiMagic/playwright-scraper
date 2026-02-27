const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let grandTotal = 0;

  for (let seed = 56; seed <= 65; seed++) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    console.log(`Visiting: ${url}`);

    await page.goto(url);
    await page.waitForSelector("body");

    // Extract ONLY visible numbers (split by whitespace)
    const numbers = await page.evaluate(() => {
      return document.body.innerText
        .trim()
        .split(/\s+/)
        .map(n => Number(n))
        .filter(n => !isNaN(n));
    });

    const pageTotal = numbers.reduce((sum, value) => sum + value, 0);

    console.log(`Page Total: ${pageTotal}`);
    grandTotal += pageTotal;
  }

  console.log("=================================");
  console.log("FINAL TOTAL:", grandTotal);
  console.log("=================================");

  await browser.close();
})();
