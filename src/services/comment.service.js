const util = require('util')
const { PrismaClient } = require('@prisma/client')

class CommentService {

    constructor() {
        this.prisma = new PrismaClient()
    }

    async createComment(postId, comment) {
        const post = await this.prisma.post.findUniqueOrThrow({
            where: {
                id: Number(postId)
            }
        })

        if (!post)
            throw new Error('User not found')

        const result = await this.prisma.comment.create({
            data: {
                createdAt: new Date(),
                text: comment.text,
                imageUrl: comment.imageUrl ? comment.imageUrl : null,
                Post:{
                    connect: {
                        id: Number(postId)
                    }
                },
                author: {
                    connect: {
                        id: Number(comment.authorId)
                    },
                },
            },
        })

        return result
    }
}

module.exports = CommentService