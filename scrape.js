const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let grandTotal = 0;

  for (let seed = 56; seed <= 65; seed++) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    console.log(`Visiting: ${url}`);

    await page.goto(url);
    await page.waitForLoadState("networkidle");

    const content = await page.textContent("body");

    const matches = content.match(/\d+/g) || [];

    const numbers = matches
      .map(n => parseInt(n, 10))
      .filter(n => Number.isFinite(n));

    const pageTotal = numbers.reduce((sum, value) => sum + value, 0);

    console.log(`Page Total: ${pageTotal}`);
    grandTotal += pageTotal;
  }

  console.log("=================================");
  console.log("FINAL TOTAL:", grandTotal);
  console.log("=================================");

  await browser.close();
})();
