const express = require('express')
const { register, login } = require('../controllers/auth.controller')
const { validateRegister } = require('../validators/validate.register.dto')
const authRouter = express.Router()
//traer los controllers
//a futuro hay que traer el middleware de authorization y de multer (file management)

authRouter.post("/register", validateRegister, register)
authRouter.post("/login", validateRegister, login)

module.exports = authRouter
