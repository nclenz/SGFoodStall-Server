const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minLength: 6,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 8,
  },
  mobile: {
    type: String,
    trim: true,
    minLength: 8,
  },
})

const User = mongoose.model("user", userSchema)
module.exports = User
