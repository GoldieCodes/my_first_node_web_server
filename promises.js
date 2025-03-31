// declaring two promises and calling them in different orders
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise resolved afer 6 seconds")
  }, 6000)
})

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise resolved afer 3 seconds")
  }, 3000)
})

//calling second promise after first promise is resolved
promise1
  .then((message) => {
    console.log(message)
  })
  .then(() => {
    promise2.then((message) => {
      console.log(message)
    })
  })

// calling the promises sequentially
promise1.then((message) => {
  console.log(message)
})
promise2.then((message) => {
  console.log(message)
})
