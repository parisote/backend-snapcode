const express = require('express')
const postRouter = express.Router()
const { createPost, getAll, getById, getByUserId, getLikedPostsByUserId } = require('../controllers/post.controller');
const { validatePost } = require('../validators/validate.post.dto');
const { authenticateToken } = require('../helpers/verify.helper')

postRouter.get("/", authenticateToken, getAll)
postRouter.get("/:id", authenticateToken, getById)
postRouter.get("/user/:id", authenticateToken, getByUserId)
postRouter.post("/:id", validatePost, authenticateToken, , createPost)
postRouter.get("/user/liked/:id", authenticateToken, getLikedPostsByUserId)

module.exports = postRouter
