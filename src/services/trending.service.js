const { PrismaClient } = require('@prisma/client')

class TrendingService {

    constructor() {
        this.prisma = new PrismaClient()
    }

    async getTrending() {
        const result = await this.prisma.post.findMany({
            select:{
                id: true,
                authorId: true,
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
            where:{
                visibility: Number(0),
                likedBy: {
                    some:{
                        email:{
                            not: ""
                        } 
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