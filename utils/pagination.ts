export async function getPage(nextDom, page) {
  let hasNext = await page.$(nextDom)

  let nextUrl = ''
  if (hasNext) {
    nextUrl = await page.$eval(nextDom, dom => dom.href)
  }

  if (!hasNext) {
    await page.close()
    return
  }

  if (nextUrl) {
    await page.goto(nextUrl)
  }
}