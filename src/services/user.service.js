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
        try {

            const result = await this.prisma.user.findUniqueOrThrow({
                where: {
                    id: Number(userId)
                }
            })
            delete result.password
            return { success: true, user: result }
        } catch (error) {
            return { success: false, user: error }
        }
    }

    async uploadPfp(userId, file) {
        try {
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
                    id: Number(userId)
                },
                data: {
                    pfp: result.Key,
                }
            })

            await this.S3.removeFile(profile.pfp)
            const imagePath = `/ avatars / ${result.Key}`

            return imagePath

        } catch (error) {
            throw error
        }
    }

    async getFollowings(userId) {
        try {
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
        } catch (error) {
            throw error
        }
    }

    async getFollowers(userId) {
        try {
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
        } catch (error) {
            throw error
        }
    }

    async followUser(userId, followId) {
        try {

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
        } catch (error) {
            throw error
        }
    }

    async getProfile(userId) {
        try {
            const profile = await this.prisma.profile
                .findFirstOrThrow({
                    where: {
                        userId: Number(userId)
                    }
                })
            return profile
        } catch (error) {
            throw error
        }
    }

    async updateProfile(userId, payload) {

        const { name, username, pfp, biography,
            workingAt, location, linkedIn, twitter } = payload

        try {
            const user = await this.prisma.user
                .findUniqueOrThrow({
                    where: {
                        id: Number(userId)
                    }
                })

            const profile = await this.prisma
                .profile.findFirst({
                    where: {
                        userId: Number(userId)
                    }
                })

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
                            twitter: twitter
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

        } catch (error) {
            throw error
        }
    }
}

module.exports = UserService