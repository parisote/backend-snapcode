const CommentInstanceService = require('../services/comment.service')
const CommentService = new CommentInstanceService()
const { setMessage, setError, setTrace } = require('../utils/log')

const createComment = async (req, res) => {
    /* #swagger.security = [{
        "bearerAuth": []
    }] */
    const { id } = req.params
    const body = req.body

    if (!id) {
        setError(404, "Post ID cannot be null.")
        return res.status(400).send("Post ID cannot be null.")
    }

    if (!body) {
        setError(404, "Body cannot be null.")
        return res.status(404).send("Body cannot be null.")
    }

    try {
        const comment = await CommentService.createComment(id, body)
        setMessage(201, JSON.stringify(comment))
        return res.status(201).send(comment)
    } catch (error) {
        setTrace(500, error)
        return res.status(500).send()
    }
}

const getAllComments = (req, res) => {
    /* #swagger.security = [{
        "bearerAuth": []
    }] */
}

module.exports = { getAllComments, createComment, likeComment }