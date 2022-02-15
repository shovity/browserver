const browser = require('../browser')


module.exports = async (email, password) => {
    const p = await browser.instance.newPage()

    await p.goto('https://wallet.wax.io')

    await p.waitForNetworkIdle()

    await p.type('input[name="userName"]', email)
    await p.type('input[name="password"]', password)
    await p.click('.button-primary')
}