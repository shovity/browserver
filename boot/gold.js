const browser = require('../browser')


module.exports = async (email, password) => {
    const p = await browser.instance.newPage()

    await p.setViewport({ height: 660, width: 550 })
    await p.goto('https://auto.p2e.tools/#/auto-goldmand')
    await p.waitForNetworkIdle()

    if (await p.$('.btn-primary')) {
        await p.click('.btn-primary')
        await p.click('.btn-group')
    }

    await p.waitForSelector('.btn-info', {
        timeout: 120000,
    })

    await p.waitForTimeout(500)
    await p.click('.btn-info')
    
    console.log('boot gold done!')
}