const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    javaScriptEnabled: false
  });
  const page = await context.newPage();
  await page.goto('https://book.douban.com/');
  await page.waitForTimeout(1000)
  // const list = await page.evaluate(() => {
  //   const domList = document.querySelectorAll('.slide-item')
  //   return Array.from(domList).map(dom => {
  //     const poster = dom.querySelector('.poster img')
  //     const title = dom.querySelector('.title')
  //     const author = dom.querySelector('.rating')
  //     return {
  //       poster: poster && poster.getAttribute('src'),
  //       title: title && title.innerText,
  //       rating: rating && title.innerText,
  //     }
  //   })
  // })


  const list = await page.$$eval('.slide-item li', doms => {
    return doms.map(dom => {
      const cover = dom.querySelector('.cover img')
      const title = dom.querySelector('.title')
      const author = dom.querySelector('.author')
      const href = dom.querySelector('.cover a')
      return {
        cover: cover && cover.getAttribute('src'),
        title: title && title.innerText,
        author: author && author.innerText,
        href: href && href.getAttribute('href')
      }
    })
  })
  console.log(list, 444444)
  await browser.close();
})()