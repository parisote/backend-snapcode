const UserService = require('../services/user.service')
const UserServiceInstance = new UserService()
const { setMessage, setTrace, setError } = require('../utils/log')

//ej basico. me gustaria hacer dtos para checkear la validez de lo que viene por body/params.
const getUser = async (req, res) => {
    const { id } = req.params

    if (!id) {
        return res.status(400).send("User ID cannot be null.")
    }

    try {
        const user = await UserServiceInstance.getUser(id)
        return res.status(200).send(user)
    } catch (error) {
        return res.status(404).send('User not found')
    }
}

const uploadPfp = async (req, res) => {
    /*	#swagger.requestBody = {
            required: true,
            content: {
                "multipart/form-data": {
                schema: {
                type: "object",
                properties: {
                  image: {
                    type: "string",
                    format: "binary",
                    nullable: true
                  }
                }
              },
              encoding: {
                file: {
                  style: "form"
                }
              }
            }
        } 
    }
    */
    const { id } = req.params
    const file = req.file

    if (!id)
        return res.status(400).send('User ID cannot be null')

    if (!file)
        return res.status(400).send('File cannot be null')


    try {
        const imgPath = await UserServiceInstance.uploadPfp(id, file)

        return res.status(201).send(imgPath)
    } catch (error) {
        if (error.name === 'NotFoundError' || error.message) {
            return res.status(404).send('NotFoundError')
        } else {
            return res.status(500).send(error)
        }
    }
}

const getFollowings = async (req, res) => {
    const { id } = req.params

    if (!id)
        return res.status(400).send('User ID cannot be null')

    try {
        const data = await UserServiceInstance.getFollowings(id)
        return res.status(200).send(data)
    } catch (error) {
        return res.status(404).send('User not found')
    }
}

const getFollowers = async (req, res) => {
    const { id } = req.params

    if (!id)
        return res.status(400).send('User ID cannot be null')

    try {
        const data = await UserServiceInstance.getFollowers(id)

        return res.status(200).send(data)
    } catch (error) {
        return res.status(404).send('User not found')
    }
}

const getProfile = async (req, res) => {
    const { id } = req.params

    if (!id)
        return res.status(400).send('User ID cannot be null')

    try {
        const profile = await UserServiceInstance.getProfile(id)
        return res.status(200).send(profile)
    } catch (error) {
        if (error.name === 'NotFoundError') {
            return res.status(404).send(error)
        }

        return res.status(500).send(error)
    }
}

const updateProfile = async (req, res) => {
    const { id } = req.params
    const payload = req.body

    if (!id)
        return res.status(400).send('User ID cannot be null')

    try {

        const profileUpdated = await UserServiceInstance
            .updateProfile(id, payload)

        return res.status(201).send(profileUpdated)

    } catch (error) {

        if (error.name === 'NotFoundError') {
            return res.status(404).send(error)
        }

        return res.status(500).send(error)
    }
}

const followUser = async (req, res) => {
    const { userId, followId } = req.params

    if (!userId)
        return res.status(400).send('User ID cannot be null')

    if (!followId)
        return res.status(400).send('Follow ID cannot be null')

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

const getProfileByName = async (req, res) => {
    const { username } = req.params

    try {

        const profiles = await UserServiceInstance.getProfilesByName(username)

        return res.status(200).send(profiles)

    } catch (error) {
        if (error.name === 'NotFoundError') {
            return res.status(404).send(error)
        }

        return res.status(500).send(error)
    }
}

const likeOrDislikePost = async (req, res) => {
    const { id, postId } = req.params

    if (!id)
        return res.status(400).send("ID cannot be null.")


    if (!postId)
        return res.status(400).send("Post ID cannot be null.")

    try {

        const result = await UserServiceInstance.likeOrDislikePost(id, postId)

        setMessage(200, JSON.stringify(result))
        return res.status(200).send(result)

    } catch (error) {
        if (error.message == 'User is not exists' || error.message == 'Post is not exists') {
            setError(404, "Not found")
            return res.status(404).send(error.message)
        } else {
            setTrace(500, error)
            return res.status(500).send(error)
        }
    }
}

module.exports = { getUser, getFollowings, updateProfile, followUser, getFollowers, uploadPfp, getProfile, getProfileByName, likeOrDislikePost }
