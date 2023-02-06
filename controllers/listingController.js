const express = require("express")
const Listing = require("../models/listing")
const asyncHandler = require("express-async-handler")
const listings = express.Router()
const { body, param, validationResult } = require("express-validator")

listings.post(
  "/create",
  asyncHandler(async (req, res) => {
    const newListing = req.body
    try {
      const createdListing = await Listing.create(newListing)
      res.status(200).send(createdListing)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  })
)

listings.get("/all", async (req, res) => {
  try {
    const allListings = await Listing.find().exec()
    if (!allListings?.length) {
      res.status(400).json({ msg: "No listings found" })
    }
    // console.log(Listing)
    res.status(200).json(allListings)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
  // res.send("Testing")
})

//UPDATE
listings.put(
  "/edit/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params

    const { newListingsInput } = req.body

    try {
      const updatedListings = await Listing.findByIdAndUpdate(
        id,
        {
          newListingsInput,
        },
        {
          new: true,
        }
      ).exec()
      if (updatedListings) {
        res.status(200).json(updatedListings)
      } else return res.status(404).json({ message: "Listing not found" })
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  })
)

module.exports = listings
