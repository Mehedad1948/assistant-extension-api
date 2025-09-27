const {notFound} = require('../handlers/not-found')

const baseRoutes = require('./base')

module.exports = (app)=> {
    app.use('/', baseRoutes)

    app.use(notFound)
}