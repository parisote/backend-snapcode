const PostServiceInstance = require('../services/post.service')
const PostService = new PostServiceInstance()

const createPost = async (req, res) => {
    const { id } = req.params
    const body = req.body

    if(!id)
        return res.status(500).send("Id not found")


    if (!body)
        return res.status(500).send("Body not found")

    try {
        const result = await PostService.createPost(body,id)

        if(!result.success)
            return res.status(500).send(JSON.stringify(result))        

        return res.status(200).send(JSON.stringify(result.post))
    } catch (error) {
        return res.status(500).send('Error post create')
    }
}

const getAll = async (req, res) => {
    try{
        const result = await PostService.getAllPost()
        return res.status(200).send(JSON.stringify(result))
    } catch (error) {
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
        return res.status(200).send(JSON.stringify(result))
    } catch (error) {
        return res.status(404).send('Post not found')
    }
}

module.exports = { createPost, getAll, getById }