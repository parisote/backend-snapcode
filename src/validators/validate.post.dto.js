const { check } = require('express-validator')
const { validateResult } = require('../helpers/validate.helper')

const validatePost = [
    check('value')
        .exists(),
    check('language')
        .exists(),
    check('theme')
        .exists(),
    check('options')
        .exists(),
    check('code')
        .exists(),
    check('text')
        .exists(),
    check('imageUrl')
        .exists(),
    check('videoUrl')
        .exists(),
    check('tags')
        .exists(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validatePost }