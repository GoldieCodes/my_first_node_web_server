const express = require("express")
const router = express.Router()

let users = [
  {
    firstName: "John",
    lastName: "wick",
    email: "johnwick@gamil.com",
    DOB: "22-01-1990",
  },
  {
    firstName: "John",
    lastName: "smith",
    email: "johnsmith@gamil.com",
    DOB: "21-07-1983",
  },
  {
    firstName: "Joyal",
    lastName: "white",
    email: "joyalwhite@gamil.com",
    DOB: "21-03-1989",
  },
]

// GET request: Retrieve users with optional filtering
router.get("/", (req, res) => {
  let email = req.query.email
  let lastName = req.query.lastName

  if (email) {
    // If email is provided, filter by email
    const user = users.filter((user) => user.email === email)
    if (user.length > 0) {
      return res.send(user)
    } else {
      return res.send(`There's no user with the email ${email}`)
    }
  } else if (lastName) {
    // If lastName is provided, filter by lastName
    let filteredUsers = users.filter((user) => user.lastName === lastName)
    if (filteredUsers.length > 0) {
      return res.send(JSON.stringify({ filteredUsers }, null, 4))
    } else {
      return res.send(`There's no user with the last name: ${lastName}`)
    }
  } else {
    // If no query parameters are provided, return all users
    return res.send(JSON.stringify({ users }, null, 4))
  }
})

// POST request: Create a new user
router.post("/", (req, res) => {
  // Push a new user object into the users array based on query parameters from the request
  users.push({
    firstName: req.query.firstName,
    lastName: req.query.lastName,
    email: req.query.email,
    DOB: req.query.DOB,
  })
  // Send a success message as the response, indicating the user has been added
  res.send("The user " + req.query.firstName + " has been added!")
})

// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
  // Extract email parameter and find users with matching email
  let email = req.params.email
  let userToUpdate = users.find((user) => user.email === email)

  if (userToUpdate) {
    if (req.query.firstName) userToUpdate.firstName = req.query.firstName
    if (req.query.lastName) userToUpdate.lastName = req.query.lastName
    if (req.query.DOB) userToUpdate.DOB = req.query.DOB

    // update the users array with the updates
    users = users.filter((user) => user.email != email)
    users.push(userToUpdate)

    // Send success message indicating the user has been updated
    res.send(`User with the email ${email} updated.`)
  } else {
    // Send error message if no user found
    res.send("Unable to find user!")
  }
})

// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  // Extract the email parameter from the request URL
  const email = req.params.email
  // Filter the users array to exclude the user with the specified email
  users = users.filter((user) => user.email != email)
  // Send a success message as the response, indicating the user has been deleted
  res.send(`User with the email ${email} deleted.`)
})

// Function to convert a date string in the format "dd-mm-yyyy" to a Date object
function getDateFromString(strDate) {
  let [dd, mm, yyyy] = strDate.split("-")
  return new Date(yyyy + "/" + mm + "/" + dd)
}

// Define a route handler for GET requests to the "/sort" endpoint
router.get("/sort", (req, res) => {
  // Sort the users array by DOB in ascending order
  let sorted_users = users.sort(function (a, b) {
    let d1 = getDateFromString(a.DOB)
    let d2 = getDateFromString(b.DOB)
    return d1 - d2
  })
  // Send the sorted_users array as the response to the client
  res.send(sorted_users)
})

module.exports = router
