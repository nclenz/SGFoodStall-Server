const express = require("express")
const User = require("../models/user")
const users = express.Router()
const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const { param, validationResult } = require("express-validator")
const userValidation = require("../middleware/userValidation")
const checkAuth = require("../middleware/checkAuth")

users.get(
  "/all",
  asyncHandler(async (req, res) => {
    const users = await User.find().exec()
    if (!users?.length) {
      return res.status(400).json({ msg: "No users found" })
    }
    return res.json(users)
  })
)

//POST
users.post("/create", userValidation, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors })
  }

  const { username, password, mobile } = req.body
  //hash and salt
  const hashedPwd = await bcrypt.hash(password, 10)

  const newUser = await User.create({
    username,
    password: hashedPwd,
    mobile,
  })
  return res.status(200).json(newUser)
})
module.exports = users

users.put(
  "/changepwd",
  checkAuth,
  asyncHandler(async (req, res) => {
    const { oldPassword, newPassword, id } = req.body

    const foundUser = await User.findById(id).exec()
    console.log("FOUND USER", foundUser)

    const pwdMatch = await bcrypt.compare(oldPassword, foundUser.password)
    if (!pwdMatch) return res.status(401).json({ msg: "Not Authorized 888" })

    const hashedNewPwd = await bcrypt.hash(newPassword, 10)

    const updatedPwd = await User.findByIdAndUpdate(id, {
      password: hashedNewPwd,
      new: true,
    }).exec()
    if (updatedPwd) {
      res.status(200).json(updatedPwd)
    } else return res.status(404).json({ message: "user not found" })
  })
)
