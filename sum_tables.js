const { chromium } = require('playwright');

const seeds = Array.from({ length: 10 }, (_, i) => 6 + i);
const base = 'https://example.com/seed'; // Replace with actual base URL

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  let total = 0;

  for (const seed of seeds) {
    const url = `${base}${seed}`;
    await page.goto(url);

    const numbers = await page.$$eval('table td', cells =>
      cells.map(td => parseFloat(td.innerText.replace(/[^0-9.-]+/g, '')))
           .filter(n => !isNaN(n))
    );

    total += numbers.reduce((acc, val) => acc + val, 0);
  }

  console.log(`✅ Total sum: ${total}`);
  await browser.close();
})();
