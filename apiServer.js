// practicing signin authorization using jwt (json web tokens) with express

const express = require("express")
const app = express()

// the jsonwebtoken package is a node package used to generate json web tokens
const jsonwebtoken = require("jsonwebtoken")

// this constant is declared to store the jwt secret
// this should never be hardcoded, but should always be generated by a password generator
// and stored in a config file as an environment variable
const JWT_SECRET = "aVeryVerySecretString"

// the express.json() method enables the app to return json responses
app.use(express.json())

// the get api is used during authorization to determine which resources a user can access
app.get("/employees", (req, res) => {
  // the token fetched from the call to the signin api is passed in the authorization header
  // that is why this is set to read the authorization header from the incoming api request
  let token = req.header("Authorization")

  if (!token) return res.status(401).send("No token")

  // because all tokens start with "Bearer ..."
  if (token.startsWith("Bearer ")) {
    tokenValue = token.slice(7, token.length).trimStart()
  }

  const verificationStatus = jsonwebtoken.verify(
    tokenValue,
    "aVeryVerySecretString"
  )
  if (verificationStatus.user === "user") {
    return res.status(200).json({ message: "Access successful" })
  }
  return res
    .status(401)
    .json({ message: "Please login to access this resource" })
})

// this is a post api, used during authentication to log a user into an application
app.post("/signin", (req, res) => {
  // this gets the username and password from the request body
  const { uname, pwd } = req.body

  // if there is a match between the username and password provided by the user and that in the database,
  // the token is generated by the jsonwebtoken.sign() method, but you must pass in the user's username
  // and the jwtsecret as parameters to the function.
  // this token is then returned as a json response to the client
  if (uname === "user" && pwd === "password") {
    return res.json({
      token: jsonwebtoken.sign({ user: "user" }, JWT_SECRET),
    })
  }

  // if the username and/or password didn't match, this code is executed
  return res.status(401).json({ message: "Invalid credentials" })
})

// this sets up the server to listen to requests coming from this port
app.listen(3000, () => {
  console.log("Server is setup at port 3000")
})
