let http = require("http")
let server = http.createServer(function (request, response) {
  let body = "Hello World, once again"

  response.writeHead(200, {
    "content-length": body.length,
    "content-type": "text/plain",
  })

  response.end(body)
})

server.listen(8080)

module.exports.name = "Dear"

module.exports.theDate = function theDate() {
  let date = new Date().toLocaleString("en-US", {
    timeZone: "Australia/Brisbane",
  })
  return date
}
