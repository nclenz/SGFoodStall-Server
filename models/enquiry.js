const mongoose = require("mongoose")
const AutoIncrement = require("mongoose-sequence")(mongoose)

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
    status: {
      type: String,
      enum: [
        "Open",
        "Uncontactable",
        "Failed",
        "Following",
        "Pending Viewing",
        "Viewing Done",
        "Deposit Collected",
        "Completed",
      ],
      default: "Open",
    },
    remarks: {
      type: String,
    },
  },
  { timestamps: true }
)

enquirySchema.plugin(AutoIncrement, {
  inc_field: "ticket",
  id: "ticketNums",
  start_seq: 00001,
})

const Enquiry = mongoose.model("enquiry", enquirySchema)
module.exports = Enquiry
