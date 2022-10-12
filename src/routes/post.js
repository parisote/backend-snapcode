const express = require('express')
const postRouter = express.Router()
const { createPost, getAll, getById } = require('../controllers/post.controller');
const { validatePost } = require('../validators/validate.post.dto');

postRouter.post("/", validatePost, createPost)
postRouter.get("/", getAll)
postRouter.get("/:id", getById)

module.exports = postRouter
