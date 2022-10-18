const express = require('express')
const postRouter = express.Router()
const { createPost, getAll, getById, getByUserId } = require('../controllers/post.controller');
const { validatePost } = require('../validators/validate.post.dto');

postRouter.get("/", getAll)
postRouter.get("/:id", getById)
postRouter.get("/user/:id", getByUserId)
postRouter.post("/:id", validatePost, createPost)

module.exports = postRouter
