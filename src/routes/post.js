const express = require('express')
const postRouter = express.Router()

const { createPost, getAll, getById, getByUserId, getLikedPostsByUserId, getFeed } = require('../controllers/post.controller');
const { createComment } = require('../controllers/comment.controller')    
const { validatePost } = require('../validators/validate.post.dto');
const { validateComment } = require('../validators/validate.comment.dto');
const { authenticateToken } = require('../helpers/verify.helper');

postRouter.get("/", authenticateToken, getAll)
postRouter.get("/:id", authenticateToken, getById)
postRouter.get("/user/:id", authenticateToken, getByUserId)
postRouter.get("/user/liked/:id", authenticateToken, getLikedPostsByUserId)
postRouter.get("/user/feed/:id", authenticateToken, getFeed)

postRouter.post("/:id", authenticateToken, validatePost, createPost)
postRouter.post("/:id/comment", authenticateToken, validateComment, createComment)


module.exports = postRouter