const { PrismaClient } = require('@prisma/client')

class TrendingService {

    constructor() {
        this.prisma = new PrismaClient()
    }

    async getTrending() {

        const result = await this.prisma.post.findMany({
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