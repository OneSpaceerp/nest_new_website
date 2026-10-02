const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');
const fs = require('node:fs');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage();
  const routes = ['/', '/about', '/onespace', '/onespace/erpnext', '/onespace/industries', '/onespace/implementation', '/miravoice', '/nestcloud', '/web-development', '/mobile-apps', '/digital-marketing', '/infrastructure'];
  const results = [];
  fs.mkdirSync('docs/responsive-check', { recursive: true });
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      const response = await page.goto('http://127.0.0.1:3000' + route, { waitUntil: 'domcontentloaded' });
      await page.evaluate(() => document.fonts.ready);
      const metrics = await page.evaluate(() => ({
        width: innerWidth,
        contentWidth: document.documentElement.scrollWidth,
        overflow: [...document.querySelectorAll('main h1, main h2, main p, .btn, .footer__grid, .story-card, .contact__panel')].filter(el => {
          const r = el.getBoundingClientRect();
          return r.width && (r.right > innerWidth + 2 || r.left < -2);
        }).map(el => el.className),
        companyLegal: document.querySelectorAll('nav[aria-label="COMPANY"] a[href="/privacy"], nav[aria-label="COMPANY"] a[href="/terms"]').length,
      }));
      results.push({ width, route, status: response.status(), ...metrics });
      fs.writeFileSync('docs/responsive-check/results.json', JSON.stringify(results, null, 2));
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://127.0.0.1:3000');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'docs/responsive-check/home-mobile.png' });
  await page.locator('#contact').scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'docs/responsive-check/contact-mobile.png' });
  await page.getByRole('button', { name: 'Open menu' }).click();
  await page.setViewportSize({ width: 320, height: 480 });
  const menu = await page.locator('.navpill__menu').boundingBox();
  results.push({ menuFitsShortScreen: menu.y >= 0 && menu.y + menu.height <= 480 });
  await page.getByRole('button', { name: 'Close menu' }).click();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator('.footer').scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'docs/responsive-check/footer-mobile.png' });
  fs.writeFileSync('docs/responsive-check/results.json', JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results.filter(r => r.status !== undefined && (r.status !== 200 || r.contentWidth > r.width || r.overflow.length || r.companyLegal) || r.menuFitsShortScreen === false), null, 2));
  console.log('Checked ' + (results.length - 1) + ' route/viewport combinations.');
  await browser.close();
})();
