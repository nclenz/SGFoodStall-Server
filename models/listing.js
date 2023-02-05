const mongoose = require("mongoose")

const listingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    min: 4,
  },
  location: {
    type: String,
    required: true,
    min: 3,
  },
  rental: {
    type: Number,
    required: true,
    min: 0,
  },
  negotiable: {
    type: Boolean,
  },
  availability: {
    type: String,
  },
  cuisine: [
    {
      type: String,
    },
  ],
  desc: {
    type: String,
  },
})

const Listing = mongoose.model("listing", listingSchema)

module.exports = Listing
