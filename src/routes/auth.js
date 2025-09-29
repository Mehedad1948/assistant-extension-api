const express = require("express")

const {register} = require('../handlers/auth')
const response = require("../utils/response")

const router = express.Router()

router.post('/register', response(register))

module.exports = router