const jwt = require("jsonwebtoken")

const checkAuth = async (req, res, next) => {
  let authHeader = req.header("Authorization")

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized401" })
  }

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    req.username = decoded.username
    req.id = decoded.id
    next()
  } catch (error) {
    return res.status(403).json({ msg: "Unauthorized" })
  }
}
module.exports = checkAuth
