const express = require("express")
const app = express()

app.get("/temperature/:location_code", (req, res) => {
  let location = req.params.location_code
  weather.current(location, function (error, temp_f) {})
})

app.listen(3000, () => {
  console.log("Port is active at 3000")
})
