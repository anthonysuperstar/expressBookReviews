const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const {username, password} = req.body
  const newUser = {username: username, password: password}
  if (!newUser){
      return res.status(400).json({message: "Empty username/password"})
  }
  if (users.includes(newUser)){
      return res.status(409).json({message: "User already exists"})
  } 
  users.push(newUser)
  console.log(users)
  return res.status(200).json({message: `${newUser.username} successfully registered`})
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    //Write your code here
    let allBooks = JSON.stringify(books)
    res.status(200).json(allBooks)
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  let isbn = +req.params.isbn
  let pickedBook;
  for (let key in books){
      if (+key == isbn){
          pickedBook = books[+key]
          return res.status(200).json(pickedBook)
      }
    }
    return res.status(404).json({message: "Book not found"})
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let author = req.params.author
  let pickedBook
  for (let key in books){
    const author_slug = books[key].author.toLowerCase().replaceAll(' ', '-')
    if (author_slug == author){
        pickedBook = books[key]
        return res.status(200).json(pickedBook)
    }
  }
  res.status(404).json({message: "Book not found"})
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let title = req.params.title
  let pickedBook
  for (let key in books){
    const title_slug = books[key].title.toLowerCase().replace(' ', '-')
    if (title_slug == title){
        pickedBook = books[key]
        return res.status(200).json(pickedBook)
    }
  }
  res.status(404).json({message: "Book not found"})
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  let isbn = +req.params.isbn
  let pickedBook;
  for (let key in books){
      if (+key == isbn){
          pickedBook = books[+key]
          return res.status(200).json(pickedBook.reviews)
      }
    }
    return res.status(404).json({message: "Book not found"})
});

module.exports.general = public_users;
