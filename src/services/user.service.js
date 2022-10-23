const sharp = require('sharp')
const fs = require('fs')
const util = require('util')
const S3 = require('../../s3')
const { PrismaClient } = require('@prisma/client')

class UserService {

    constructor() {
        this.prisma = new PrismaClient()
        this.unlinkFile = util.promisify(fs.unlink)
        this.S3 = new S3()
    }

    async getUser(userId) {
        const result = await this.prisma.user.findUniqueOrThrow({
            where: {
                id: Number(userId)
            }
        })
        delete result.password
        return result
    }

    async uploadPfp(userId, file) {
        const profile = await this.prisma.profile.findFirst({
            where: {
                userId: Number(userId)
            }
        })

        if (!profile) {
            await this.unlinkFile(`uploads/${file.filename}`)
            throw new Error('NotFoundError')
        }

        await sharp(`uploads/${file.filename}`)
            .resize(200, 200)
            .toFile(`uploads/${file.filename}rs`)

        const result = await this.S3.uploadFile(`${file.filename}rs`)

        await this.unlinkFile(`uploads/${file.filename}rs`)
        await this.unlinkFile(file.path)

        await this.prisma.profile.update({
            where: {
                userId: Number(userId)
            },
            data: {
                pfp: result.Key,
            }
        })

        await this.S3.removeFile(profile.pfp)
        const imagePath = `/ avatars / ${result.Key}`

        return imagePath
    }

    async getFollowings(userId) {
        const followers = await this.prisma
            .follow.findMany({
                where: {
                    followingId: Number(userId)
                }
            })

        followers.forEach(e => {
            delete e.id
            delete e.followingId
        })

        return followers
    }

    async getFollowers(userId) {
        const followers = await this.prisma
            .follow.findMany({
                where: {
                    followedId: Number(userId)
                }
            })

        followers.forEach(e => {
            delete e.id
            delete e.followedId
        })

        return followers
    }

    async followUser(userId, followId) {
        //confirmo que ambos usarios existan, de no ser asi throweo un error.
        const user = await this.prisma
            .user.findUniqueOrThrow({
                where: {
                    id: Number(userId)
                }
            })

        const userToFollow = await this.prisma
            .user.findUniqueOrThrow({
                where: {
                    id: Number(followId)
                }
            })
        //miro que el usuario no lo este siguiendo ya
        const isFollowing = await this.prisma
            .follow.findFirst(({
                where: {
                    followingId: Number(userId),
                    followedId: Number(followId)
                }
            }))
        //si no encuentra el follow, lo sigue.
        if (!isFollowing) {
            await this.prisma.follow.create({
                data: {
                    followingId: Number(userId),
                    followedId: Number(followId)
                }
            })
            return 'user_followed'
        }
        //si ya lo sigue, cancela el follow
        await this.prisma.follow.delete({
            where: {
                id: isFollowing.id
            }
        })

        return 'user_unfollowed'
    }

    async getProfile(userId) {
        const profile = await this.prisma.profile
            .findFirstOrThrow({
                where: {
                    userId: Number(userId)
                }
            })
        return profile
    }

    async updateProfile(userId, payload) {

        const { name, username, pfp, biography,
            workingAt, location, linkedIn, twitter } = payload

        if(!this.isUserExist(userId))
            throw new Error("UserNotFound")

        const profile = await this.prisma
            .profile.findFirst({
                where: {
                    userId: Number(userId)
                }
            })

        if(await this.isUserNameExist(username))
            throw new Error('UsernameAlreadyExist')        

        if (!profile) {
            const newProfile = await this.prisma
                .profile.create({
                    data: {
                        userId: Number(userId),
                        name: name,
                        username: username,
                        biography: biography,
                        workingAt: workingAt,
                        location: location,
                        linkedIn: linkedIn,
                        twitter: twitter,
                        pfp: '11c3a07db76d29cdf6238c9eef528ccfrs'
                    }
                })
            return newProfile
        }
        const updatedProfile = await this.prisma.profile.update({
            where: {
                id: Number(profile.id)
            }, data: {
                userId: Number(userId),
                name: name,
                username: username,
                biography: biography,
                workingAt: workingAt,
                location: location,
                linkedIn: linkedIn,
                twitter: twitter
            }
        })

        return updatedProfile
    }

    async likeOrDislikePost(id, postId) {

        if (!await this.isUserExist(id))
            throw new Error('User is not exists')

        if (!await this.isPostExist(postId))
            throw new Error('Post is not exists')

        const isLiked = await this.prisma.user.findUnique({
            where: {
                id: Number(id)
            },
            select: {
                likedPosts: {
                    where: {
                        id: Number(postId)
                    }
                }
            }
        })

        let result = ""
        if (isLiked.likedPosts.length > 0) {
            result = "Dislike"
            await this.dislike(id, postId)
        } else {
            result = "Like"
            await this.like(id, postId)
        }

        return result

    }

    async like(id, postId) {
        await this.prisma.user.update({
            where: {
                id: Number(id),
            },
            data: {
                likedPosts: {
                    connect: [{ id: Number(postId) }],
                },
            },
            select: {
                id: true
            }
        })
    }

    async dislike(id, postId) {
        await this.prisma.user.update({
            where: {
                id: Number(id),
            },
            data: {
                likedPosts: {
                    disconnect: [{ id: Number(postId) }],
                },
            },
            select: {
                id: true
            }
        })
    }

    async isUserExist(userId) {
        try {
            const user = await this.prisma.user.findFirst({
                where: {
                    id: Number(userId)
                }
            })

            if (user == null)
                return false

            return true
        } catch (error) {
            throw error
        }
    }

    async isPostExist(postId) {
        try {
            const post = await this.prisma.post.findFirst({
                where: {
                    id: Number(postId)
                }
            })

            if (post == null)
                return false

            return true
        } catch (error) {
            throw error
        }
    }

    async isUserNameExist(username){
        try {
            const profile = await this.prisma.profile.findFirst({
                where: {
                    username: username
                }
            })

            console.log("PRO ",profile)
            console.log(profile == null)

            if (profile == null)
                return false

            return true
        } catch (error) {
            throw error
        }
    }
}

module.exports = UserService