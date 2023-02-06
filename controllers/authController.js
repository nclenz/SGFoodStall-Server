const User = require("../models/user")
const express = require("express")
const auth = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
// const loginLimiter = require("../middleware/loginLimiter")
const checkAuth = require("../middleware/checkAuth")

auth.post(
  "/login",
  //   loginLimiter,
  asyncHandler(async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ msg: "All fields are required" })
    }

    //Check if username exist in db
    const foundUser = await User.findOne({ username }).exec()

    if (!foundUser) {
      return res.status(404).json({ msg: "User not found" })
    }
    const pwdMatch = await bcrypt.compare(password, foundUser.password)
    if (!pwdMatch) return res.status(401).json({ msg: "Not Authorized" })

    //create access token
    const accessToken = jwt.sign(
      {
        username: foundUser.username,
        id: foundUser._id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    )

    res.json({
      accessToken,
      id: foundUser._id,
      username: foundUser.username,
    })
  })
)

auth.get(
  "/user",
  checkAuth,
  asyncHandler(async (req, res) => {
    const user = await User.findOne({ username: req.username })
    return res.status(200).json({
      username: user.username,
      id: user._id,
    })
  })
)

module.exports = auth
