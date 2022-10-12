const { check } = require('express-validator')
const { validateResult } = require('../helpers/validate.helper')

const validatePost = [
    check('value')
        .exists()
        .withMessage('Value is needed'),
    check('language')
        .exists()
        .withMessage('Value is needed'),
    check('theme')
        .exists(),
    check('options')
        .exists(),
    check('code')
        .exists(),
    check('text')
        .exists()
        .withMessage('Value is needed'),
    check('tags')
        .exists(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validatePost }