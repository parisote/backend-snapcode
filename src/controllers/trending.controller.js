const TrendingService = require('../services/trending.service')
const TrendingServiceInstance = new TrendingService()

const getTrending = async (req, res) => {
    /* #swagger.security = [{
        "bearerAuth": []
    }] */
    try {
        const leader  = await TrendingServiceInstance.getTrending()
        return res.status(200).send(JSON.stringify(leader))
    } catch (error) {
        console.log(error)
        return res.status(500).send()
    }
}

module.exports = { getTrending }
