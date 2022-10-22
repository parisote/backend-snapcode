const PostServiceInstance = require('../services/post.service')
const PostService = new PostServiceInstance()
const { setMessage, setError, setTrace } = require('../utils/log')

const createPost = async (req, res) => {
    /* #swagger.security = [{
        "bearerAuth": []
    }] */
    const { id } = req.params
    const body = req.body

    if (!id) {
        setError(404, "Id not found")
        return res.status(404).send("Id not found")
    }

    if (!body) {
        setError(404, "Body not found")
        return res.status(404).send("Body not found")
    }

    try {
        const post = await PostService.createPost(body,id)

        setMessage(201, JSON.stringify(post))
        return res.status(201).send(post)

    } catch (error) {
        setTrace(500, error)
        return res.status(500).send('Error post create')
    }
}

const getAll = async (req, res) => {
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    try {
        const result = await PostService.getAllPost()

        setMessage(200, JSON.stringify(result))
        return res.status(200).send(result)

    } catch (error) {
        setTrace(500, error)
        return res.status(500).send('Error with post search')
    }
}

const getById = async (req, res) => {
    /* #swagger.security = [{
        "bearerAuth": []
    }] */
    try{

        const { id } = req.params

        if (!id) {
            return res.status(400).send()
        }

        const result = await PostService.getById(id)

        setMessage(200, JSON.stringify(result))
        return res.status(200).send(result)
    } catch (error) {
        setTrace(500, error)
        return res.status(500).send(error)
    }
}

const getByUserId = async (req, res) => {
    /* #swagger.security = [{
        "bearerAuth": []
    }] */
    try{
        const { id } = req.params

        if (!id) {
            return res.status(400).send()
        }

        const result = await PostService.getByUserId(id)

        setMessage(200, JSON.stringify(result))
        return res.status(200).send(result)
    } catch (error) {
        setTrace(500, error)
        return res.status(500).send(error)
    }
}

const getLikedPostsByUserId = async (req, res) => {
    /* #swagger.security = [{
        "bearerAuth": []
    }] */
    try{
        const { id } = req.params

        if (!id) 
            return res.status(400).send("ID cannot be null.")        

        const result = await PostService.getLikedPostsByUserId(id)

        setMessage(200, JSON.stringify(result))
        return res.status(200).send(result)
    } catch (error) {
        setTrace(500, error)
        return res.status(500).send(error)
    }
}

module.exports = { createPost, getAll, getById, getByUserId, getLikedPostsByUserId }