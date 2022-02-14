const Event = require('events')
const puppeteer = require('puppeteer')


const browser = new Event()


browser.screenshot = async () => {
    const pages = await browser.instance.pages()

    return Promise.all(pages.map((page, index) => {
        return page.screenshot({ encoding: "base64" })
    }))

}

browser.init = async () => {
    browser.instance = await puppeteer.launch({
        // headless: false,
        // slowMo: 100,
        userDataDir: './data',
        args: [
            '--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36',
            '--no-sandbox',
            '--disable-dev-shm-usage',
        ],
    })

    browser.emit('ready')

    const pages = await browser.instance.pages()
    pages[0].goto('https://google.com')
}



module.exports = browser