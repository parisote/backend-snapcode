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
                code: {
                    create:
                    {
                        value: post.code,
                        language: post.language,
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

    async getByUserId(userId) {
        const result = await this.prisma.post.findMany({
            where: {
                authorId: Number(userId)
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
}

module.exports = PostService