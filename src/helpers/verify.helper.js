const { expressjwt: jwt } = require('express-jwt')
const secret = process.env.JWT_SECRET

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt({ secret: secret },  
  function (req, res) {
    if (!req.auth.user) return res.sendStatus(401);
    next()
  })
}

module.exports = { authenticateToken }