const AuthService = require('../auth/auth.service')
const AuthServiceInstance = new AuthService()

const register = async (req, res) => {

    const { email, password } = req.body

    try {
        await AuthServiceInstance.register(email, password)
        return res.status(201).send({ message: 'User created.' })
    } catch (error) {
        if (error.message === 'user_exists') {
            return res.status(400).send({ message: 'user_exists' })
        } else {
            return res.status(500).send(error)
        }
    }

}

const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const loginData = await AuthServiceInstance.login(email, password)
        return res.status(200).send(JSON.stringify(loginData))
    } catch (error) {
        if (error.message === 'wrong_password') {
            return res.status(403).send(error.message)
        } else {
            return res.status(500).send(error.message)
        }
    }
}

module.exports = { register, login }