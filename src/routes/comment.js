const express = require('express')
const commentRouter = express.Router()
const { authenticateToken } = require('../helpers/verify.helper')
const { getAllComments } = require('../controllers/comment.controller')

commentRouter.get('/:id', authenticateToken, getAllComments)

module.exports = commentRouter
