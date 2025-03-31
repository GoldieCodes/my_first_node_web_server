// Requiring axios module for making HTTP requests
const axios = require("axios")

// Handling the promise resolution
async function getData() {
  try {
    // Sending a GET request to the specified URL using axios
    const req = axios.get(
      "https://raw.githubusercontent.com/ibm-developer-skills-network/lkpho-Cloud-applications-with-Node.js-and-React/master/CD220Labs/async_callback/courseDetails.json"
    )
    console.log(req)
    // Storing the response data in the courseDetails variable
    let courseDetails = (await req).data
    // Logging the course details as a formatted JSON string
    console.log(JSON.stringify(courseDetails, null, 4))
  } catch (err) {
    // Logging the error message
    console.log(err.toString())
    // This will console log the error with the code. e.g., Error: Request failed with status code 404
  }
}

getData()
