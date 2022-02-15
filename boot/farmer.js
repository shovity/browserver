const browser = require('../browser')


module.exports = async (email, password) => {
    const p = await browser.instance.newPage()

    await p.setViewport({ height: 660, width: 550 })
    await p.goto('https://waxcenter.io/farmersworld')

    await p.waitForNetworkIdle()
    await p.click('.el-button.el-button--success')

    await p.waitForSelector('.el-button--small.is-round', {
        timeout: 60000,
    })

    await p.waitForTimeout(500)
    await p.click('.el-button--small.is-round')

    console.log('boot farmer done!')
}