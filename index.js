const playwright = require('playwright');

(async () => {
  const browser = await playwright.chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://native-land.ca/');
  await page.screenshot({ path: 'example1.png' });

  await browser.close();
})();