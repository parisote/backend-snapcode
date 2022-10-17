const util = require('util')
const { PrismaClient } = require('@prisma/client')

class PostService {

    constructor() {
        this.prisma = new PrismaClient()
    }

    async createPost(post, userId) {
        try {

            const user = await this.prisma.user.findUniqueOrThrow({
                where: {
                    id: Number(userId)
                }
            })

            if(!user)
                return {success: false, post: 'User not found' }

            const result = await this.prisma.post.create({
                data:{
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

            return { success: true, post: result }
        } catch (error) {
            return { success: false, post: error }
        }
    }

    async getAllPost(){
        try{
            const result = await this.prisma.post.findMany()
            return { success: true, post: result }
        } catch (error) {
            return { success: false, post: error }
        }
    }

    async getById(postId){
        try{
            const result = await this.prisma.post.findUniqueOrThrow({
                where: {
                    id: Number(postId)
                }
            })
            return { success: true, post: result }
        } catch (error) {
            return { success: false, post: error }
        }
    }

    async getByUserId(userId){
        try{
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

module.exports = PostService