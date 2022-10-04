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

const updateProfile = async (req, res) => {
    const { id } = req.params
    const payload = req.body

    try {

        const profileUpdated = await UserServiceInstance
            .updateProfile(id, payload)

        return res.status(201).send(JSON.stringify(profileUpdated))

    } catch (error) {

        if (error.name === 'NotFoundError') {
            return res.status(404).send(error)
        }

        return res.status(500).send(error)
    }

}

const followUser = async (req, res) => {
    const { userId, followId } = req.params

    try {

        const result = await UserServiceInstance.followUser(userId, followId)

        return res.status(201).send(result)

    } catch (error) {

        if (error.name === 'NotFoundError') {
            return res.status(404).send(error)
        }

        return res.status(500).send(error)
    }
}

module.exports = { getUser, updateProfile, followUser }
