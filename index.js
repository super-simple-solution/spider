const { chromium } = require('playwright');
const { writeFile } = require('./utils/writeFile');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    javaScriptEnabled: false
  });
  const page = await context.newPage();

  const url = 'https://read.douban.com/topic/4887/'
  await getDom(page, browser, url)
})()

async function getDom(page, browser, url) {
  await page.goto(url);
  await page.waitForTimeout(3000)
  // const list = await page.evaluate(() => {
  //   const domList = document.querySelectorAll('.ui-slide-item')
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

  let list = await page.$$eval('.item .border-wrap', doms => {
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

  console.log(list, 'list', url)
  const nextPage = await page.$('.pagination .next a')
  const pageIndex = await page.innerText('.pagination .active')
  if (!nextPage) {
    await browser.close();
  } else {
    const nextPageUrl = await page.$eval('.pagination .next a', dom => dom.href) 
    list = await getDom(page, browser, nextPageUrl)
    try {
      await page.click('.pagination .next')
    } catch (e) {
      console.log(e, 'error')
    }
  }
  writeFile('douban', pageIndex, list)
  return list
}