const util = require('util')
const { PrismaClient } = require('@prisma/client')

class PostService {

    constructor() {
        this.prisma = new PrismaClient()
    }

    async createPost(post) {
        try {

            /*const r_code = await this.prisma.code.create({
                data:{
                    value: post.value,
                    language: post.language,
                    theme: post.theme,
                    options: post.options,
                }
            })*/


            console.log("before")
            
            const result = await this.prisma.post.create({
                data:{
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    text: post.text,
                    imgageUrl: post.imageUrl,
                    videoUrl: post.videoUrl,
                    tags: post.tags,
                    code: {
                        create:
                            {
                                value: post.value,
                                language: post.language,
                            },
                    },
                    author: {
                        connect: {
                            id: 1                        
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
}

module.exports = PostService