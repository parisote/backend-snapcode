const express = require('express')
const postRouter = express.Router()
const { createPost, getAll, getById, getByUserId } = require('../controllers/post.controller');
const { validatePost } = require('../validators/validate.post.dto');
const { authenticateToken } = require('../helpers/verify.helper')

postRouter.get("/", authenticateToken, getAll)
postRouter.get("/:id", getById)
postRouter.get("/user/:id", getByUserId)
postRouter.post("/:id", validatePost, createPost)

module.exports = postRouter
