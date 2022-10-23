const { PrismaClient } = require('@prisma/client')

class TrendingService {

    constructor() {
        this.prisma = new PrismaClient()
    }

    async getTrending() {
        const result = await this.prisma.post.findMany({
            select:{
                text: true,
                tags: true,
                createdAt: true,
                code: true,
                commentaries: true,
                likedBy:{
                    select:{
                       id:true
                    }
                }          
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