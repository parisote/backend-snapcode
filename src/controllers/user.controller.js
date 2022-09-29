const UserService = require('../services/user.service')
const UserServiceInstance = new UserService()

//ej basico. me gustaria hacer dtos para checkear la validez de lo que viene por body/params.
const getUser = async (req, res) => {
    const { id } = req.params

    if (!id) {
        return res.status(400).send()
    }

    try {
        const { user } = await UserServiceInstance.getUser(id)
        return res.status(200).send(JSON.stringify(user))
    } catch (error) {
        return res.status(404).send('User not found')
    }
}

module.exports = getUser
