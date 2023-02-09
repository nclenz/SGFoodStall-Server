const express = require("express")
const Enquiry = require("../models/enquiry")
const asyncHandler = require("express-async-handler")
const enquiry = express.Router()

enquiry.post(
  "/send",
  asyncHandler(async (req, res) => {
    const msg = req.body
    const enquiryForm = await Enquiry.create(msg)
    if (enquiryForm) {
      return res.status(201).json(enquiryForm)
    } else {
      return res.status(400).json({ msg: "Enquiry Failed" })
    }
  })
)

enquiry.get(
  "/all",
  asyncHandler(async (req, res) => {
    const allEnquiries = await Enquiry.find().populate("id").exec()
    if (!allEnquiries?.length) {
      return res.status(400).json({ msg: "No Enquiry" })
    }
    return res.json(allEnquiries)
  })
)

module.exports = enquiry
