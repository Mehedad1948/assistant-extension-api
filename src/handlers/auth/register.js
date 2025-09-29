const mongoose = require('mongoose')

const {
    generateHash,
    generateCryptoToken,
    generateToken,
} = require('../../utils/crypto')

const { parseUser } = require("../../utils/parse-user")
const { sendVerification } = require("../../utils/mail")

const User = mongoose.model("User")
const Token = mongoose.model("Token")


exports.register = async (req, res) => {
    const { email, password, name } = req.body

    const existingUser = await User.findOne({ email })

    if (existingUser) {
        res.status(400).send({
            error: "An Account with provided email already exists"
        })
        return
    }

    const hashedPassword = generateHash(password)
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    const { token: emailToken } = await Token.create({
        user: user._id,
        token: generateCryptoToken()
    })

    await sendVerification({
        email: user.email,
        token: emailToken
    })

    const token = generateToken(user)
    const parsedUser = parseUser(user)



    res.status(201).send({
        token,
        user: parsedUser
    })
}
