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

// GET request: Retrieve all users
router.get("/", (req, res) => {
  res.send(JSON.stringify({ users }, null, 4))
})

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email", (req, res) => {
  const email = req.params.email
  const user = users.filter((user) => user.email === email)
  res.send(user)
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

module.exports = router
