// Import Node.js built-in HTTP module
const http = require("http")

// Define the port where our server will run
const PORT = 3000

// Create an HTTP server
const server = http.createServer((request, response) => {
  // Log request details to the console
  console.log(`Received request for: ${request.url}`)

  // Handle different URL paths
  if (request.url === "/") {
    // Set the response header
    response.writeHead(200, { "Content-Type": "text/html" })
    // Home page
    response.end(
      "<h1>Welcome to my first Node.js server!</h1><p>This server is created using only Node.js built-in modules.</p>"
    )
  } else if (request.url === "/about") {
    // Set the response header
    response.writeHead(200, { "Content-Type": "text/html" })
    // About page
    response.end(
      "<h1>About This Server</h1><p>This is a simple HTTP server created with pure Node.js.</p>"
    )
  } else {
    // 404 Not Found for any other paths
    response.writeHead(404, { "Content-Type": "text/html" })
    response.end(
      "<h1>404: Page Not Found</h1><p>The page you requested does not exist.</p>"
    )
  }
})

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
  console.log("Press Ctrl+C to stop the server")
})
