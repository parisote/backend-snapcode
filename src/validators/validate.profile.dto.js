const { check } = require('express-validator')
const { validateResult } = require('../helpers/validate.helper')

const validateProfile = [ //todo email password
    check('name')
        .exists(),
    check('username')
        .exists(),
    check('biography')
        .exists(),
    check('workingAt')
        .exists(),
    check('location')
        .exists(),
    check('linkedIn')
        .exists(),
    check('twitter')
        .exists(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateProfile }