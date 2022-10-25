const UserService = require('../services/user.service')
const UserServiceInstance = new UserService()
const { setMessage, setTrace, setError } = require('../utils/log')

const getUser = async (req, res) => {
    /* #swagger.security = [{
        "bearerAuth": []
    }] */
    const { id } = req.params

    if (!id) {
        setError(400, "User ID cannot be null.")
        return res.status(400).send("User ID cannot be null.")
    }

    try {
        const user = await UserServiceInstance.getUser(id)
        setMessage(200, JSON.stringify(user))
        return res.status(200).send(user)
    } catch (error) {
        setTrace(500, error)
        return res.status(500).send()
    }
}

const uploadPfp = async (req, res) => {
    /* #swagger.security = [{
        "bearerAuth": []
    }] */
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

    if (!id){
        setError(400, 'User ID cannot be null')
        return res.status(400).send('User ID cannot be null')
    }

    if (!file){
        setError(400, 'File cannot be null')
        return res.status(400).send('File cannot be null')
    }


    try {
        const imgPath = await UserServiceInstance.uploadPfp(id, file)
        setMessage(200, imgPath)
        return res.status(201).send(imgPath)
    } catch (error) {
        if (error.name === 'NotFoundError' || error.message) {
            setError(400, 'NotFoundError')
            return res.status(404).send('NotFoundError')
        } else {
            setTrace(500, error)
            return res.status(500).send(error)
        }
    }
}

const getFollowings = async (req, res) => {
    /* #swagger.security = [{
        "bearerAuth": []
    }] */
    const { id } = req.params

    if (!id){
        setError(400, 'User ID cannot be null')
        return res.status(400).send('User ID cannot be null')
    }        

    try {
        const data = await UserServiceInstance.getFollowings(id)
        setMessage(200, JSON.stringify(data))
        return res.status(200).send(data)
    } catch (error) {
        setTrace(500, error)
        return res.status(500).send()
    }
}

const getFollowers = async (req, res) => {
    /* #swagger.security = [{
        "bearerAuth": []
    }] */
    const { id } = req.params

    if (!id){
        setError(400, 'User ID cannot be null')
        return res.status(400).send('User ID cannot be null')
    }

    try {
        const data = await UserServiceInstance.getFollowers(id)
        setMessage(200, JSON.stringify(data))
        return res.status(200).send(data)
    } catch (error) {
        setMessage(500, error)
        return res.status(500).send()
    }
}

const getProfile = async (req, res) => {
    /* #swagger.security = [{
        "bearerAuth": []
    }] */
    const { id } = req.params

    if (!id){
        setError(400, 'User ID cannot be null')
        return res.status(400).send('User ID cannot be null')
    }

    try {
        const profile = await UserServiceInstance.getProfile(id)
        setMessage(200, JSON.stringify(profile))
        return res.status(200).send(profile)
    } catch (error) {
        if (error.message === 'NotFoundError') {
            setError(400, 'NotFoundError')
            return res.status(404).send(error.message)
        }
        setTrace(500, error)
        return res.status(500).send()
    }
}

const updateProfile = async (req, res) => {
    /* #swagger.security = [{
        "bearerAuth": []
    }] */
    const { id } = req.params
    const payload = req.body

    if (!id){
        setError(400, 'User ID cannot be null')
        return res.status(400).send('User ID cannot be null')
    }

    try {

        const profileUpdated = await UserServiceInstance
            .updateProfile(id, payload)

        setMessage(200, JSON.stringify(profileUpdated))
        return res.status(201).send(profileUpdated)

    } catch (error) {
        if (error.message === 'UsernameAlreadyExist'){
            setError(400, "Username already exist")
            return res.status(400).send("Username already exist")        
        }

        if(error.message === "UserNotFound"){
            setError(404, "User not found")
            return res.status(404).send("User not found")
        }

        setTrace(500, error)
        return res.status(500).send()
    }
}

const followUser = async (req, res) => {
    /* #swagger.security = [{
        "bearerAuth": []
    }] */
    const { userId, followId } = req.params

    if (!userId){
        setError(404, "User ID not found")
        return res.status(400).send('User ID cannot be null')
    }

    if (!followId){
        setError(404, "Follow ID not found")
        return res.status(400).send('Follow ID cannot be null')
    }

    try {

        const result = await UserServiceInstance.followUser(userId, followId)
        setMessage(201, result)
        return res.status(201).send(result)
    } catch (error) {
        if (error.message === 'NotFoundError') {
            setError(404, "NotFoundError")
            return res.status(404).send(error)
        }

        setTrace(500, error)
        return res.status(500).send()
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
    /* #swagger.security = [{
        "bearerAuth": []
    }] */
    const { id, postId } = req.params

    if (!id){
        setError(404, "ID cannot be null.")
        return res.status(400).send("ID cannot be null.")
    }

    if (!postId){
        setError(404, "Post ID cannot be null.")
        return res.status(400).send("Post ID cannot be null.")
    }

    try {

        const result = await UserServiceInstance.likeOrDislikePost(id, postId)

        setMessage(200, JSON.stringify(result))
        return res.status(200).send(result)

    } catch (error) {
        if (error.message == 'User is not exists' || error.message == 'Post is not exists') {
            setError(404, "User or Post not found")
            return res.status(404).send(error.message)
        } else {
            setTrace(500, error)
            return res.status(500).send(error)
        }
    }
}

const likeOrDislikeComment = async (req, res) => {
    /* #swagger.security = [{
        "bearerAuth": []
    }] */
    const { id, commentId } = req.params

    if (!id) {
        console.log("ID ", id)
        setError(404, "User ID cannot be null.")
        return res.status(400).send("User ID cannot be null.")
    }

    if (!commentId) {
        console.log("ID ", commentId)
        setError(404, "Comment ID cannot be null.")
        return res.status(400).send("Comment ID cannot be null.")
    }

    try {
        const comment = await UserServiceInstance.likeOrDislikeComment(id, commentId)
        setMessage(200, JSON.stringify(comment))
        return res.status(200).send(comment)
    } catch (error) {
        if(error.message == "CommentNotFound"){
            setError(404, "Comment not found")
            return res.status(404).send("Comment not found")
        }

        if(error.message == "UserNotFound"){
            setError(404, "User not found")
            return res.status(404).send("User not found")
        }

        setTrace(500, error)
        return res.status(500).send()
    }
}

module.exports = { getUser, getFollowings, updateProfile, followUser, getFollowers, uploadPfp, getProfile, getProfileByName, likeOrDislikePost, likeOrDislikeComment }
