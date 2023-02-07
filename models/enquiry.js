const mongoose = require("mongoose")

const enquirySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
    trim: true,
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
})

const User = mongoose.model("user", enquirySchema)
module.exports = User
