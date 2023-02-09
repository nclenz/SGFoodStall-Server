const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
  {
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
      required: true,
      minLength: 8,
    },
  },
  { timestamps: true }
)

const User = mongoose.model("user", userSchema)
module.exports = User
