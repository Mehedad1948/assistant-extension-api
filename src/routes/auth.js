const express = require("express")

const { register, verify } = require('../handlers/auth')
const response = require("../utils/response")
const { login } = require('../handlers/auth/login')

const router = express.Router()

router.post('/register', response(register))
router.post('/login', response(login))
router.put('/verify/:token', response(verify))

module.exports = router