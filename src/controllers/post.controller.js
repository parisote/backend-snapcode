const PostServiceInstance = require('../services/post.service')
const PostService = new PostServiceInstance()

const createPost = async (req, res) => {

    let body = req.body

    if (!body) {
        return res.status(500).send()
    }

    try {
        const { post } = await PostService.createPost(body)
        return res.status(200).send(JSON.stringify(post))
    } catch (error) {
        return res.status(404).send('User not found')
    }
}

const getAll = async (req, res) => {
    try{
        const result = await PostService.getAllPost()
        return res.status(200).send(JSON.stringify(result))
    } catch (error) {
        return res.status(404).send('User not found')
    }
}

module.exports = { createPost, getAll }