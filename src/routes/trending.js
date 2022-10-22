const express = require('express')
const trendingRouter = express.Router()
const { getTrending } = require('../controllers/trending.controller');
const { authenticateToken } = require('../helpers/verify.helper')

trendingRouter.get("/", authenticateToken, getTrending);

module.exports = trendingRouter