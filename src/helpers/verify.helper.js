const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null || token == " ") return res.sendStatus(401)

  try{
    jwt.verify(token, secret)
  } catch (err) {
    return res.status(401).send("Invalid token")
  }

  next()
}

module.exports = { authenticateToken }