const { PrismaClient } = require('@prisma/client')

class TimelineService {

    constructor() {
        this.prisma = new PrismaClient()
    }

    async getUserTimeline(userId) {
        const result = await this.prisma.post.findMany({
            where: {
                authorId: Number(userId)
            }
        })

        return result
    }
}

module.exports = TimelineService