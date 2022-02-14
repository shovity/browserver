const eroc = require('eroc')
const path = require('path')
const auth = require('basic-auth')
const util = require('util')

const browser = require('./browser')
const boot = require('./boot')

let b = null
let p = null


const app = eroc.createApplication((app) => {

    app.get('/', async (req, res, next) => {
        return res.sendFile(path.join(__dirname, 'index.html'))
    })

    app.get('/screenshot', async (req, res, next) => {
        return res.success(await browser.screenshot())
    })

    app.use(async (req, res, next) => {
        const user = auth(req)
    
        if (user === undefined || user['name'] !== 'shovity' || user['pass'] !== 'ytivohs') {
            res.statusCode = 401
            res.setHeader('WWW-Authenticate', 'Basic realm="root"')
            res.end('Unauthorized')
        } else {
            next()
        }
    })

    app.get('/command', async (req, res, next) => {
        const command = req.gp('command')

        if (command[0] === '/') {
            const action = command.split(' ')[0].slice(1)

            
            return res.success(action)
        }

        try {
            const handle = eval(`async () => {return (${command})}`)
            const result = await handle()

            return res.success(util.inspect(result))
        } catch (error) {
            return res.success(error.message || 'unknow error')
        }
    })
})

app.start()

browser.init().then(async () => {
    b = browser.instance
    p = (await b.pages())[0]

    await boot()
})