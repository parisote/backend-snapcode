const { PrismaClient } = require('@prisma/client')

class UserService {

    constructor() {
        this.prisma = new PrismaClient()
    }

    async getUser(userId) {
        try {

            const result = await this.prisma.user.findUniqueOrThrow({
                where: {
                    id: Number(userId)
                }
            })
            return { success: true, user: result }
        } catch (error) {
            return { success: false, user: error }
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
                        followedById: Number(followId)
                    }
                }))
            //si no encuentra el follow, lo sigue.
            if (!isFollowing) {
                await this.prisma.follow.create({
                    data: {
                        followingId: Number(userId),
                        followedById: Number(followId)
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
            console.log(error)
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