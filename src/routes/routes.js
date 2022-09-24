const router = require('express').Router();
const { ping } = require('../controllers/ping.controller.js');

router.get('/ping', ping)

module.exports = router;