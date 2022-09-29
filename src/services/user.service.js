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
}

module.exports = UserService