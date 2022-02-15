
const readline = require('readline')

const browser = require('../browser')


const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

const prompt = async (title) => {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })

        rl.question(title, (name) => {
            resolve(name)
            rl.close()
        })
    })
}

module.exports = async () => {
    const p = await browser.instance.newPage()

    await p.goto('https://wallet.wax.io')

    await p.waitForNetworkIdle()

    await p.type('input[name="userName"]', 'shovity@gmail.com')
    await p.type('input[name="password"]', ';')
    await p.click('.button-primary')

    await p.waitForNetworkIdle()

    if (!p.isClosed()) {
        const opt = await prompt('OPT: ')
        await p.type('input', opt)
        await p.click('button')
    }
}