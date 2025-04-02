const express = require("express")
const routes = require("./routes/users.js")
const app = express()
const session = require("express-session")
const authorizeUser = require("./auth.js")

const PORT = 8080

// define middlewares
app.use(express.json()) // to handle requests as a json object

app.use(
  session({ secret: "fingerprint", resave: true, saveUninitialized: true })
)

app.use("/user", authorizeUser)

app.use("/user", routes) // uses the routes defined in this file ./routes/users.js, required above

// Login endpoint
app.post("/login", (req, res) => {
  const user = req.body.user
  if (!user) {
    return res.status(404).json({ message: "Body Empty" })
  }
  // Generate JWT access token
  let accessToken = jwt.sign(
    {
      data: user,
    },
    "access",
    { expiresIn: 60 * 60 }
  )

  // Store access token in session
  req.session.authorization = {
    accessToken,
  }
  return res.status(200).send("User successfully logged in")
})

app.listen(PORT, () => {
  console.log("Server started at port " + PORT)
})
