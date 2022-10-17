const express = require('express');
const { getUser, updateProfile, followUser, getFollowings, getFollowers, uploadPfp } = require('../controllers/user.controller');
const { validateProfile } = require('../validators/validate.profile.dto')
const multer = require('multer')

const upload = multer({ dest: 'uploads/' })
const userRouter = express.Router()
//traer los controllers
//a futuro hay que traer el middleware de authorization y de multer (file management)

userRouter.get("/:id", getUser);
userRouter.get("/following/:id", getFollowings)
userRouter.get("/followers/:id", getFollowers)
userRouter.post("/profile/update/:id", validateProfile, updateProfile)
userRouter.post("/follow/:userId/:followId", followUser)
userRouter.post("/avatar/upload/:id", upload.single('image'), uploadPfp)


module.exports = userRouter
