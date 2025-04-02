const express = require("express")
const routes = require("./routes/users.js")
const app = express()

const PORT = 8080

// define middlewares
app.use(express.json()) // to handle requests as a json object
app.use("/user", routes) // uses the routes defined in this file ./routes/users.js, required above

app.listen(PORT, () => {
  console.log("Server started at port " + PORT)
})
