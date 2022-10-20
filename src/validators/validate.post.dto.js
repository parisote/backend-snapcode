const { check } = require('express-validator')
const { validateResult } = require('../helpers/validate.helper')

const validatePost = [
    check('title')
        .exists(),
    check('code')
        .exists()
        .withMessage('Code is needed'),
    check('language')
        .exists()
        .withMessage('Value is needed'),
    check('fileName')
        .exists()
        .withMessage('Value is needed'),
    check('tags')
        .exists(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validatePost }