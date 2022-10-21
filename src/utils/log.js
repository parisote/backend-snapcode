const logger = require('loglevel')

const setMessage = (code, message) => {
    const log = {}
    log.code = code
    log.message = message
    logger.info(log)
}

const setError = (code, message) => {
    const log = {}
    log.code = code
    log.message = message
    logger.error(log)
}

const setTrace = (code, message) => {
    const log = {}
    log.code = code
    log.message = message
    logger.trace(log)
}

module.exports = { setMessage, setError, setTrace }