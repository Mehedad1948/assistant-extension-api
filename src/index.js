const mongoose = require("mongoose")
require("dotenv/config")

const db = require('./utils/db')

const app = require('./app')

async function main() {
    await db.connect(process.env.MONGODB_URL)

    mongoose.Promise = global.Promise

    app.set('port', process.env.PORT || 7777)

    const port = app.get('port')
    app.listen(port, () => {
        console.log(`✅✅ Server is running on port ${port}`)
    })

}

main().catch(err => {
    console.error('Error starting server:', err)
    process.exit(1)
})