const express = require('express')
const postRouter = express.Router()
const { createPost, getAll, getById, getByUserId, getLikedPostsByUserId, getFeed } = require('../controllers/post.controller');
const { validatePost } = require('../validators/validate.post.dto');
const { authenticateToken } = require('../helpers/verify.helper')

postRouter.get("/", authenticateToken, getAll)
postRouter.get("/:id", authenticateToken, getById)
postRouter.get("/user/:id", authenticateToken, getByUserId)
postRouter.get("/user/liked/:id", authenticateToken, getLikedPostsByUserId)
postRouter.get("/user/feed/:id", authenticateToken, getFeed)
postRouter.post("/:id", validatePost, authenticateToken, createPost)

module.exports = postRouter