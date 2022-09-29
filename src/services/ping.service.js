class PingService {

    constructor() {

    }

    async ping() {
        const message = 'pong'
        return message
    }
}

module.exports = PingService