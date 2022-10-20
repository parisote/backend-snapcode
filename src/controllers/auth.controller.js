const AuthService = require('../services/auth.service')
const AuthServiceInstance = new AuthService()
const { setMessage, setError, setTrace } = require('../utils/log')

const register = async (req, res) => {

    const { email, password } = req.body

    try {
        const user = await AuthServiceInstance.register(email, password)
        setMessage(201, JSON.stringify(user))
        return res.status(201).send(JSON.stringify(user))
    } catch (error) {
        if (error.message === 'user_exists') {
            setError(400,'user_exists')
            return res.status(400).send({ message: 'user_exists' })
        } else {
            setTrace(500, error)
            return res.status(500).send(error)
        }
    }

}

const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const loginData = await AuthServiceInstance.login(email, password)
        setMessage(200, loginData)
        return res.status(200).send(JSON.stringify(loginData))
    } catch (error) {
        if (error.message === 'wrong_password') {
            setError(403, error.message)
            return res.status(403).send(error.message)
        } else {
            setTrace(500, error)
            return res.status(500).send(error.message)
        }
    }
}

module.exports = { register, login }