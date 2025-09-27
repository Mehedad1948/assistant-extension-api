const mongoose = require('mongoose')
require('dotenv/config')

let connection

const connect = async (connectionURI) => {
    const url = connectionURI || process.env.MONGODB_URL

    try {
        return mongoose.connect(url)
    } catch (error) {
        console.error('Error connecting to MongoDB:', error)
    }
}

const disconnect = async () => mongoose.disconnect()

const getConnection = () => connection

module.exports = {
    connect,
    disconnect,
    getConnection
}
