const express = require('express');
const { getUser, 
    updateProfile, 
    followUser, 
    getFollowings, 
    getFollowers, 
    uploadPfp, 
    getProfile, 
    getProfileByName,
    likeOrDislikePost } = require('../controllers/user.controller');
const { getUserTimeline } = require('../controllers/timeline.controller') 
const { validateProfile } = require('../validators/validate.profile.dto')
const multer = require('multer');
const { authenticateToken } = require('../helpers/verify.helper')

const upload = multer({ dest: 'uploads/' })
const userRouter = express.Router()
//traer los controllers
//a futuro hay que traer el middleware de authorization y de multer (file management)

userRouter.get("/:id", getUser);
userRouter.get("/following/:id", getFollowings)
userRouter.get("/followers/:id", getFollowers)
userRouter.get("/profile/:id", getProfile)
userRouter.get("/:id/timeline", authenticateToken, getUserTimeline);
userRouter.get("/profile/search/:username", authenticateToken, getProfileByName)
userRouter.post("/profile/update/:id", validateProfile, updateProfile)
userRouter.post("/follow/:userId/:followId", followUser)
userRouter.post("/avatar/upload/:id", upload.single('image'), uploadPfp)
userRouter.post("/:id/like/post/:postId", authenticateToken, likeOrDislikePost)
module.exports = userRouter
