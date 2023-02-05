const express = require("express")
const User = require("../models/user")
const users = express.Router()
const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const { param, validationResult } = require("express-validator")
const userValidation = require("../middleware/userValidation")

users.get(
  "/all",
  asyncHandler(async (req, res) => {
    try {
      const users = await User.find().exec()
      if (!users?.length) {
        return res.status(400).json({ msg: "No users found" })
      }
      return res.json(users)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  })
)

//POST
users.post("/create", userValidation, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors })
  }
  try {
    const { username, password } = req.body
    //hash and salt
    const hashedPwd = await bcrypt.hash(password, 10)

    const newUser = await User.create({
      username,
      password: hashedPwd,
    })
    return res.status(200).json(newUser)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})
module.exports = users
