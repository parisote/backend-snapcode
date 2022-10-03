const { PrismaClient } = require('@prisma/client')

class LeaderboardService {

    constructor() {
        this.prisma = new PrismaClient()
    }

    async getLeaderboard() {
        try {

            const result = await this.prisma.post.findMany({                
                orderBy: {
                    
                }
            })

            return { success: true, post: result }
        } catch (error) {
            return { success: false, post: error }
        }
    }
}

module.exports = LeaderboardService