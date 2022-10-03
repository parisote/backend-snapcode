const express = require('express');
const { getUser, updateProfile } = require('../controllers/user.controller');
const { validateProfile } = require('../validators/validate.profile.dto')
const userRouter = express.Router()
//traer los controllers
//a futuro hay que traer el middleware de authorization y de multer (file management)

userRouter.get("/get/:id", getUser);
userRouter.post("/profile/update/:id", validateProfile, updateProfile)


module.exports = userRouter
