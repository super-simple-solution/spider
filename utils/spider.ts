const { chromium } = require('playwright')

interface browserOptions {
  not_headless: boolean
}
export async function initBrowser(options : browserOptions) {
  let extraOptions = {}
  if (options.not_headless) {
    extraOptions = {
      headless: false
    }
  }
  if (!global.browser) {
    global.browser = await chromium.launch({ extraOptions })
  }
  return
}


export async function newPage() {
  const context = await global.browser.newContext({
    javaScriptEnabled: false
  })
  const page = await context.newPage()
  return page
}