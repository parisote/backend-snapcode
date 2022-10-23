const { PrismaClient } = require('@prisma/client')

class TrendingService {

    constructor() {
        this.prisma = new PrismaClient()
    }

    async getTrending() {
        const result = await this.prisma.post.findMany({
            include: {
                code: true,
                likedBy: true,
                commentaries: true,
            },
            orderBy: {
                likedBy: {
                    _count: 'desc'
                }
            }
        })

        return result
    }
}

module.exports = TrendingService