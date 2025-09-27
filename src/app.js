const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
require('dotenv/config')

const routes = require('./routes')

const app = express()

app.use(helmet())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(morgan('dev'))

app.use(cors({
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Link-Saver']
}))

app.use((req, res, next) => {
    if (req.method === 'OPTIONS' &&
        req.headers['origin'] &&
        req.headers['origin'] !== process.env.UI_URL &&
        !req.headers['X-Link-Saver']
    ) {
        return res.status(403).json({ message: 'Forbidden' })
    }

    next()
})

routes(app)

module.exports = app