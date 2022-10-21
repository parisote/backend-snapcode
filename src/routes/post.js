const express = require('express')
const postRouter = express.Router()
const { createPost, getAll, getById, getByUserId, getLikedPostsByUserId } = require('../controllers/post.controller');
const { validatePost } = require('../validators/validate.post.dto');

postRouter.get("/", getAll)
postRouter.get("/:id", getById)
postRouter.get("/user/:id", getByUserId)
postRouter.get("/user/liked/:id", getLikedPostsByUserId)
postRouter.post("/:id", validatePost, createPost)

module.exports = postRouter
