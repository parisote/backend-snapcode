const PingService = require('../services/ping.service')
const PingServiceInstance = new PingService()

const ping = async (req, res) => {
    try {
        const result = await PingServiceInstance.ping()
        return res.status(200).send(result)
    } catch (error) {
        return res.status(404).send()
    }
}

module.exports = ping;