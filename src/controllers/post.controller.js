const PostServiceInstance = require('../services/post.service')
const PostService = new PostServiceInstance()

const createPost = async (req, res) => {

    let body = req.body

    if (!body) {
        return res.status(500).send()
    }

    try {
        const result = await PostService.createPost(body)

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