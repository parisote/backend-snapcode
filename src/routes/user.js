const express = require('express');
const { getUser, updateProfile, followUser, getFollowings, getFollowers } = require('../controllers/user.controller');
const { validateProfile } = require('../validators/validate.profile.dto')
const userRouter = express.Router()
//traer los controllers
//a futuro hay que traer el middleware de authorization y de multer (file management)

userRouter.get("/:id", getUser);
userRouter.get("/following/:id", getFollowings)
userRouter.get("/followers/:id", getFollowers)
userRouter.post("/profile/update/:id", validateProfile, updateProfile)
userRouter.post("/follow/:userId/:followId", followUser)


module.exports = userRouter
