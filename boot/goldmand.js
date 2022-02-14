const browser = require('../browser')

module.exports = async () => {
    const p = await browser.instance.newPage()

    await p.setViewport({ height: 450, width: 1400 })
    await p.goto('https://play.goldmand.io/mining')
    await p.waitForNetworkIdle()
    
    await p.evaluate(() => {
        setTimeout(async () => {
            const log = (m) => {
                document.querySelector('.header--username').innerHTML = m
            }
    
            const sleep = (ms) => {
                return new Promise(resolve => setTimeout(resolve, ms))
            }
    
            const transfer = async (index=1) => {
                document.querySelectorAll('.plus')[index].click()
                document.querySelector('.max-staking').click()
                document.querySelector('.modal-bottom .button').click()
                await sleep(5000)
            }
    
            const mine = async () => {
                document.querySelectorAll('.start-mining-button')[2].click()
                document.querySelector('.modal-bottom .button').click()
                await sleep(5000)
            }
    
            const withdraw = async () => {
                document.querySelectorAll('.minus')[3].click()

                if (+document.querySelector('.orange-color').innerText.replace(/[^0-9]/g, '') > 2) {
                    return log('withdraw fee too large')
                }

                document.querySelector('.max-staking').click()
                document.querySelector('.modal-bottom .button').click()
                await sleep(5000)
            }
    
            const tick = async () => {
                document.querySelector('.mining-hub-menu a').click()

                await sleep(500)

                try {
                    if (+document.querySelectorAll('.header-resources-numbers')[1].innerText.split('\n')[1] > 0) {
                        log('Transfer GMM')
                        await transfer(1)
                        return
                    }

                    if (+document.querySelectorAll('.header-resources-numbers')[2].innerText.split('\n')[1]) {
                        log('Transfer GME')
                        await transfer(2)
                        return
                    }

                    if (document.querySelectorAll('.start-mining-button')[2]) {
                        log('Mining')
                        await mine()
                        return
                    }

                    if (+document.querySelectorAll('.number')[4].innerText > 50) {
                        log('Withdraw')
                        await withdraw()
                        return
                    }

                    log(`Waiting... ${new Date().getSeconds()}`)
                } catch (error) {
                    log(`${error.message || 'unknow error'}`)
                }

                await sleep(1500)
            }
    
            document.querySelector('.mining-hub-menu a').click()
            window.__t = Date.now()
            
            const __t = window.__t
            while (true) {
                if (window.__t !== __t) {
                    break
                }
                await tick()
            }
        })
    })
}