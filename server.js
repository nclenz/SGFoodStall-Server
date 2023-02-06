require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const db = mongoose.connection
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const userController = require("./controllers/userController")
const listingController = require("./controllers/listingController")

const app = express()
const PORT = process.env.PORT ?? 3400
const MONGO_URI = process.env.MONGO_URI
console.log(MONGO_URI)

//mongoose settings
mongoose.connect(MONGO_URI)
mongoose.set("strictQuery", false)
mongoose.set("runValidators", true)
mongoose.set("debug", true)

// check mongodb connection status
db.on("connected", () => console.log("mongo connected"))
db.on("disconnected", () => console.log("mongo disconnected"))
db.on("error", (error) => {
  console.log(error.message + " is Mongo not running?")
})

//middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "x-access-token"],
  })
)
app.use(morgan("dev"))
app.use(express.json())
app.use(cookieParser())
app.use(express.static("./public/index.html"))

//routes
app.use("/api/listings", listingController)
app.use("/api/users", userController)

app.get("/api/", (req, res) => {
  res.json({ message: "connection success!" })
})

mongoose.connection.once("open", () => {
  console.log("connect to mongodb")
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })
})
