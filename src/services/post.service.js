const util = require('util')
const { PrismaClient } = require('@prisma/client')

class PostService {

    constructor() {
        this.prisma = new PrismaClient()
    }

    async createPost(post, userId) {
        const user = await this.prisma.user.findUniqueOrThrow({
            where: {
                id: Number(userId)
            }
        })

        if (!user)
            throw new Error('User not found')

        const result = await this.prisma.post.create({
            data: {
                createdAt: new Date(),
                text: post.title,
                imageUrl: post.imageUrl ? post.imageUrl : null,
                videoUrl: post.videoUrl ? post.imageUrl : null,
                tags: post.tags,
                visibility: post.visibility,
                code: {
                    create:
                    {
                        value: post.code,
                        language: post.language,
                        filename: post.fileName,
                    },
                },
                author: {
                    connect: {
                        id: Number(userId)
                    },
                },
            },
        })

        return result
    }

    async getAllPost() {
        const result = await this.prisma.post.findMany({
            include: {
                commentaries: true,
                _count: {
                    select: {
                        likedBy: true
                    }
                }
            },
            orderBy: [
                { id: 'asc' }
            ]
        })
        return result
    }

    async getById(postId) {
        const result = await this.prisma.post.findUniqueOrThrow({
            where: {
                id: Number(postId)
            }, include: {
                code: true,
                commentaries: {
                    select: {
                        id: true,
                        text: true,
                        imageUrl: true,
                        postId: true,
                        authorId: true,
                        likedBy: { select: { id: true } }
                    }
                },
                likedBy: { select: { id: true } }
            }
        })
        return result
    }

    async getByUserId(userId, userLoggedId) {
        const result = await this.prisma.post.findMany({
            where: {
                authorId: Number(userId),
            }, include: {
                code: true,
                commentaries: {
                    select: {
                        id: true,
                        text: true,
                        imageUrl: true,
                        postId: true,
                        authorId: true,
                        likedBy: { select: { id: true } }
                    }
                },
                likedBy: { select: { id: true } }
            }
        })
        
        let allPosts = []
        result.forEach((item) => 
        {
            if (item.visibility == Number(0)  || (userId == userLoggedId && item.visibility > Number(0)))
            {
                allPosts.push(item)
            }
        })
        return allPosts
    }

    async getLikedPostsByUserId(userId) {
        const result = await this.prisma.user.findMany({
            where: {
                id: Number(userId)
            }, select: {
                likedPosts: {
                    include: {
                        code: true,
                        likedBy: true,
                        commentaries: true
                    }
                }
            }
        })
        return result
    }

    async getFeed(userId) {
        
        const result = await this.prisma.follow.findMany({
            where: {
                followingId: Number(userId)
            }, select: {
                followed: {
                    select: {
                        posts: {
                            where: {
                                visibility: Number(0)
                            },
                            orderBy: { createdAt: 'desc' },
                            include: {
                                code: {
                                    select: {
                                        value: true,
                                        language: true,
                                        theme: true,
                                        options: true
                                    }
                                },
                                commentaries: { include: { likedBy: { select: { id: true } } } },
                                likedBy: { select: { id: true } }
                            },
                        },
                    }
                }
            }
        })
        
        let allPosts = []        

        result.forEach((item) => {
            item.followed.posts.forEach((post) => { 
                allPosts.push(post)
            })
        })
        allPosts = allPosts.sort(function (a, b) { return b.createdAt - a.createdAt })
        return allPosts
    }

    async getFeedFiltered(userId, title, from, to) {        
        let posts = await this.getFeed(userId)

        title = title === "undefined" || title.length === 0? "" : title
        from = from === "undefined" ? 0 : new Date(`${from}T00:00:00`).getTime()
        to = to === "undefined" ? 99999999999999 : new Date(`${to}T23:59:59`).getTime()
        
        let filteredPosts = posts.filter((post) => {
            let createdAt = new Date(post.createdAt).getTime()
            return ((createdAt >= from && createdAt <= to) && post.text.includes(title))
        })
                   
        return filteredPosts.length === 0? posts : filteredPosts
    }
}

module.exports = PostService