const { check } = require('express-validator')
const { validateResult } = require('../helpers/validate.helper')

const validateRegister = [ //todo email password
    check('email')
        .exists()
        .not()
        .isEmpty()
        .isEmail(),
    check('password')
        .exists()
        .not()
        .isEmpty(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateRegister }