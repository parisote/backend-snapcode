const express = require('express');
const { getUser, 
    updateProfile, 
    followUser, 
    getFollowings, 
    getFollowers, 
    uploadPfp, 
    getProfile, 
    getProfileByName,
    likeOrDislikePost,
    likeOrDislikeComment
 } = require('../controllers/user.controller');
const { getUserTimeline } = require('../controllers/timeline.controller') 
const { validateProfile } = require('../validators/validate.profile.dto')
const multer = require('multer');
const { authenticateToken } = require('../helpers/verify.helper')

const upload = multer({ dest: 'uploads/' })
const userRouter = express.Router()

userRouter.get("/:id", authenticateToken, getUser);
userRouter.get("/following/:id", authenticateToken, getFollowings)
userRouter.get("/followers/:id", authenticateToken, getFollowers)
userRouter.get("/profile/:id", authenticateToken, getProfile)
userRouter.get("/:id/timeline", authenticateToken, getUserTimeline);
userRouter.get("/profile/search/:username", authenticateToken, getProfileByName)
userRouter.post("/profile/update/:id", validateProfile, updateProfile)
userRouter.post("/follow/:userId/:followId", authenticateToken, followUser)
userRouter.post("/avatar/upload/:id", authenticateToken, upload.single('image'), uploadPfp)
userRouter.post("/:id/like/post/:postId", authenticateToken, likeOrDislikePost)
userRouter.post("/:id/like/comment/:commentId", authenticateToken, likeOrDislikeComment)

module.exports = userRouter
