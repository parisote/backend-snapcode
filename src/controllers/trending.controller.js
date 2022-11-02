const TrendingService = require('../services/trending.service')
const TrendingServiceInstance = new TrendingService()
const { setMessage, setError, setTrace } = require('../utils/log')

const getTrending = async (req, res) => {
    /* #swagger.security = [{
        "bearerAuth": []
    }] */
    try {
        const leader  = await TrendingServiceInstance.getTrending()
        setMessage(200, leader)
        return res.status(200).send(leader)
    } catch (error) {
        setTrace(500,error)
        return res.status(500).send()
    }
}

module.exports = { getTrending }
