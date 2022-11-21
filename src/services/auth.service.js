const { PrismaClient } = require('@prisma/client')
const jwt = require('jsonwebtoken')
const { hash, verify } = require('argon2');
//me tendria que hacer un file con constantes para los errores.

class AuthService {

    constructor() {
        this.prisma = new PrismaClient()
    }

    async register(email, password) {
        try {
            const foundUser = await this.prisma.user.findUnique({
                where: {
                    email: email
                }
            })

            if (foundUser) {
                throw new Error('user_exists')
            }

            const hashedPassword = await hash(password);

            const user = await this.prisma.user.create({
                data: {
                    email: email,
                    password: hashedPassword
                }
            })

            return user

        } catch (error) {
            throw error
        }
    }

    async login(email, password) {

        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    email: email
                }
            })

            if (!user) {
                throw new Error('user_not_found')
            }

            if (await verify(user.password, password)) {

                delete user.password

                var token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '300s' });

                return ({ token, user })

            } else {
                throw new Error('wrong_password')
            }

        } catch (error) {
            throw error
        }
    }

    async getUserByToken(authHeader)
    {
        console.log("E4NTRO ACA")
        const token = authHeader && authHeader.split(' ')[1]

        if (token == null || token == " ") 
            throw new Error('Token NULO - Sin Token no se puede obtener un usuario')
        
        console.log(jwt.decode(token))
        var {user} = jwt.decode(token);
        return (user)
    }
}

module.exports = AuthService