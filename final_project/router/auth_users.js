const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
  //write code to check is the username is valid
  let userSameUsername = users.filter((user) => {
      return user.username === username
  })

  if (userSameUsername.length > 0){
      return true
  } else {
      return false
  }
}

const authenticatedUser = (username,password)=>{ //returns boolean
  //write code to check if username and password match the one we have in records.
  let validUsers = users.filter((user) => {
      return (user.username === username && user.password === password)
  })

  if (validUsers.length > 0){
      return true
  } else {
      return false
  }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    //Write your code here
    const user = {
        username: req.body.username,
        password: req.body.password
    }

    if (!user){
        return res.status(404).json({message: "Body Empty"})
    }

    let accessToken = jwt.sign({
        data: user
    }, 'access', {expiresIn: 60 * 60})

    req.session.authorization = {
        accessToken
    }

    return res.status(200).send("User successfully logged in")
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const isbn = +req.params.isbn
  const review = req.query.review
  const user = req.user.data.username
  for(let key in books){
      console.log(books[key])
      console.log("key === isbn", +key === isbn)
      if (+key === isbn){
        const existingReviews = books[key].reviews
        for(let rev in existingReviews){
          console.log("Review =? user: " + rev===user)
          if (rev === user){
            existingReviews[rev].review = review
            console.log(existingReviews[rev])
            return res.status(200).json({message: "Review successfully updated"})
          } else {
            books[key].reviews = {...books[key].reviews, [req.user.data.username]: review}
            console.log(books[key].reviews)
            return res.status(200).json({message: `Review from ${req.user.data.username} added`})
          }
        }
      }
  }
  return res.status(500).json({message: "Wrong isbn"})
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn
  const user = req.user.data.username

  for(let key in books){
    if (+key == isbn){
      const reviews = books[key].reviews
      // for ()
    }
  }
})

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
