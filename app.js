const { create, config, Router } = require('eroc')
const path = require('node:path')
const auth = require('basic-auth')
const util = require('util')
const browser = require('./browser')

let b = null

create((app) => {
    const router = Router()

    router.get('/', async (req, res, next) => {
        return res.sendFile(path.join(__dirname, 'index.html'))
    })

    router.get('/screenshot', async (req, res, next) => {
        return res.success(await browser.screenshot())
    })

    if (config.auth) {
        const [username, pass] = config.auth.split(':')

        router.use(async (req, res, next) => {
            const user = auth(req)

            if (user === undefined || user['name'] !== username || user['pass'] !== pass) {
                res.statusCode = 401
                res.setHeader('WWW-Authenticate', 'Basic realm="root"')
                res.end('Unauthorized')
            } else {
                next()
            }
        })
    }

    router.get('/evaluate', async (req, res, next) => {
        const content = req.gp('content')

        if (content[0] === '/') {
            const action = content.split(' ')[0].slice(1)
            return res.success(action)
        }

        try {
            const handle = eval(`async () => {return (${content})}`)
            const result = await handle()

            return res.success(util.inspect(result))
        } catch (error) {
            return res.success(error.message || 'Unknown error')
        }
    })

    router.post('/action', async (req, res, next) => {
        const index = req.gp('index')
        const x = req.gp('x')
        const y = req.gp('y')

        const pages = await b.pages()
        await pages[index].mouse.click(x, y)

        return res.success()
    })

    app.use(router)
})

browser.init().then(async () => {
    b = browser.instance
})
