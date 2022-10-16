const TimelineService = require('../services/timeline.service')
const TimelineServiceInstance = new TimelineService()

const getUserTimeline = async (req, res) => {
    try {
        const { post } = await TimelineServiceInstance.getUserTimeline(id)
        return res.status(200).send(JSON.stringify(post))
    } catch (error) {
        return res.status(500).send()
    }
}

module.exports = getUserTimeline
