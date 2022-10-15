const PingService = require('../services/ping.service')
const PingServiceInstance = new PingService()
const { setMessage } = require('../utils/log')

const ping = async (req, res) => {
    try {
        const result = await PingServiceInstance.ping()
        setMessage(200, result)
        return res.status(200).send(result)
    } catch (error) {
        return res.status(404).send()
    }
}

module.exports = ping;