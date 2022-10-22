const express = require('express');
const { getUser, 
    updateProfile, 
    followUser, 
    getFollowings, 
    getFollowers, 
    uploadPfp, 
    getProfile, 
    likeOrDislikePost
 } = require('../controllers/user.controller');
const { getUserTimeline } = require('../controllers/timeline.controller') 
const { validateProfile } = require('../validators/validate.profile.dto')
const multer = require('multer');
const { authenticateToken } = require('../helpers/verify.helper')

const upload = multer({ dest: 'uploads/' })
const userRouter = express.Router()
//traer los controllers
//a futuro hay que traer el middleware de authorization y de multer (file management)

userRouter.get("/:id", authenticateToken, getUser);
userRouter.get("/following/:id", authenticateToken, getFollowings)
userRouter.get("/followers/:id", authenticateToken, getFollowers)
userRouter.get("/profile/:id", authenticateToken, getProfile)
userRouter.get("/:id/timeline", authenticateToken, getUserTimeline);
userRouter.post("/profile/update/:id", authenticateToken, validateProfile, updateProfile)
userRouter.post("/follow/:userId/:followId", authenticateToken, followUser)
userRouter.post("/avatar/upload/:id", upload.single('image'), uploadPfp)
userRouter.post("/:id/like/post/:postId", authenticateToken, likeOrDislikePost)


module.exports = userRouter
