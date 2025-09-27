const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
require("dotenv/config")

const salt = bcrypt.genSaltSync(12)

exports.generateHash = (password) => {
    const hashPassword = bcrypt.hashSync(password, salt)
    return hashPassword
}

exports.generateToken = (user) => {
    const token = jwt.sign({
        userId: user.userId,
        email: user.email
    },
        process.env.JWT_SECRET,
        {
            expiresIn: 60 * 60 * 24 * 7

        }
    )

    return token
}

exports.generateCryptoToken = ()=> crypto.randomBytes(32).toString("hex")