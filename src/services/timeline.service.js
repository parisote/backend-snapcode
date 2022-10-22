const { PrismaClient } = require('@prisma/client')

class TimelineService {

    constructor() {
        this.prisma = new PrismaClient()
    }

    async getUserTimeline(userId) {
        try {

            const result = await this.prisma.post.findMany({                
                where: {
                    authorId: Number(userId)
                }
            })

            return { success: true, post: result }
        } catch (error) {
            return { success: false, post: error }
        }
    }
}

module.exports = TimelineService