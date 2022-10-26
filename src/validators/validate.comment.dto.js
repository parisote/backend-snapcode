const { check } = require('express-validator')
const { validateResult } = require('../helpers/validate.helper')

const validateComment = [
    check('text')
        .exists()
        .withMessage('text is needed'),
    check('authorId')
        .exists()
        .isNumeric()
        .withMessage('AuthorId is needed'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateComment }