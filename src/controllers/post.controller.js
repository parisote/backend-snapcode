const PostServiceInstance = require('../services/post.service')
const PostService = new PostServiceInstance()
const { setMessage, setError, setTrace } = require('../utils/log')

const createPost = async (req, res) => {
    const { id } = req.params
    const body = req.body

    if(!id){
        setError(404, "Id not found")
        return res.status(404).send("Id not found")
    }

    if (!body){
        setError(404, "Body not found")
        return res.status(404).send("Body not found")
    }

    try {
        const result = await PostService.createPost(body,id)
        
        if(!result.success)
            throw result.post     

        setMessage(201, JSON.stringify(result.post))
        return res.status(201).send(JSON.stringify(result.post))

    } catch (error) {
        setTrace(500, error)
        return res.status(500).send('Error post create')
    }
}

const getAll = async (req, res) => {
    try{
        const result = await PostService.getAllPost()

        if(!result.success)
            throw error

        setMessage(200, JSON.stringify(result))
        return res.status(200).send(JSON.stringify(result))
    } catch (error) {
        setTrace(500, error)
        return res.status(500).send('Error with post search')
    }
}

const getById = async (req, res) => {
    try{
        const { id } = req.params

        if (!id) {
            return res.status(400).send()
        }

        const result = await PostService.getById(id)

        if(!result.success)
            throw error

        setMessage(200, JSON.stringify(result))
        return res.status(200).send(JSON.stringify(result))
    } catch (error) {
        setTrace(500, error)
        return res.status(500).send(error)
    }
}

const getByUserId = async (req, res) => {
    try{
        const { id } = req.params

        if (!id) {
            return res.status(400).send()
        }

        const result = await PostService.getByUserId(id)

        if(!result.success)
            throw error

        setMessage(200, JSON.stringify(result))
        return res.status(200).send(JSON.stringify(result))
    } catch (error) {
        setTrace(500, error)
        return res.status(500).send(error)
    }
}

module.exports = { createPost, getAll, getById, getByUserId }