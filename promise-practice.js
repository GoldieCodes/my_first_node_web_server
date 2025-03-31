//Creating a promise method. The promise will get resolved when timer times out after 3 seconds
let prompt = require("prompt-sync")({ sigint: true })
var query = prompt("Accept or reject?: ")

let promise = new Promise((resolve, reject) => {
  if (query === "accept")
    setTimeout(() => {
      resolve("Promise resolved")
    }, 3000)
  else
    setTimeout(() => {
      reject("Promise rejected")
    }, 2000)
})

console.log("Before calling promise")

promise
  .then((message) => {
    console.log(message)
  })
  .catch((err) => {
    console.log(err)
  })

console.log("After calling promise")
