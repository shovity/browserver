const goldmand = require('./goldmand')

module.exports = async () => {
    await goldmand()
    console.log('boot: goldmand is running')
}
