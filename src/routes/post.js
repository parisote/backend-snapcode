const express = require('express')
const postRouter = express.Router()
const { createPost, getAll, getById } = require('../controllers/post.controller');
const { validatePost } = require('../validators/validate.post.dto');

postRouter.get("/", getAll)
postRouter.get("/:id", getById)
postRouter.post("/:id", validatePost, createPost)

module.exports = postRouter
