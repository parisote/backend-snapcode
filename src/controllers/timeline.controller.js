const TimelineService = require('../services/timeline.service')
const TimelineServiceInstance = new TimelineService()

const getUserTimeline = async (req, res) => {
    /* #swagger.security = [{
        "bearerAuth": []
    }] */
    const { id } = req.params
    if(!id)
        return res.status(404).send('ID cannot be null')

    try {
        const post = await TimelineServiceInstance.getUserTimeline(id)
        return res.status(200).send(JSON.stringify(post))
    } catch (error) {
        return res.status(500).send()
    }
}

module.exports = { getUserTimeline }
