const { body } = require("express-validator")
const User = require("../models/user")

const userValidation = [
  body("password").isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
  }),

  body("username").custom(async (value) => {
    return await User.find({ username: value }).then((user) => {
      if (user.length) {
        return Promise.reject("Username already in use")
      }
    })
  }),
]

module.exports = userValidation
