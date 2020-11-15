const puppeteer = require('puppeteer');
 
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:8080');
  let img = await page.$('a');
  console.log(img)
 
  await browser.close();
})();