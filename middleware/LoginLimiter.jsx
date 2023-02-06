const rateLimit = require("express-rate-limit")

const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // Limit each IP to 3 requests per `window` (here, per minute)
  message:
    "Too many login attempted from this IP, please try again after 60 seconds",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

module.exports = loginLimiter
