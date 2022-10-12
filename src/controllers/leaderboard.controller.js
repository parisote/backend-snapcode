const LeaderboardService = require('../services/leaderboard.service')
const LeaderboardService = new LeaderboardService()

const getLeaderboard = async (req, res) => {
    try {
        const { post } = await LeaderboardService.getLeaderboard()
        return res.status(200).send(JSON.stringify(post))
    } catch (error) {
        return res.status(500).send()
    }
}

module.exports = getLeaderboard
