const mongoose = require("mongoose")

const enquirySchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "listing",
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      trim: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    msg: {
      type: String,
    },
  },
  { timestamps: true }
)

const Enquiry = mongoose.model("enquiry", enquirySchema)
module.exports = Enquiry
