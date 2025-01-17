const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');


public_users.post("/register", (req,res) => {
  //Write your code here
  const {username, password} = req.body;
  const newUser = {username: username, password: password};
  if (!newUser){
      return res.status(400).json({message: "Empty username/password"});
  }
  if (users.includes(newUser)){
      return res.status(409).json({message: "User already exists"});
  } 
  users.push(newUser);
  console.log(users);
  return res.status(200).json({message: `${newUser.username} successfully registered`});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    //Write your code here
    let allBooks = JSON.stringify(books);
    res.status(200).json(allBooks);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  let isbn = +req.params.isbn;
  let pickedBook;
  for (let key in books){
      if (+key == isbn){
          pickedBook = books[+key];
          return res.status(200).json(pickedBook);
      }
    }
    return res.status(404).json({message: "Book not found"})
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let author = req.params.author;
  let pickedBook;
  for (let key in books){
    const authorSlug = books[key].author.toLowerCase().replaceAll(' ', '-')
    if (authorSlug == author){
        pickedBook = books[key];
        return res.status(200).json(pickedBook);
    }
  }
  res.status(404).json({message: "Book not found"})
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let title = req.params.title;
  let pickedBook;
  for (let key in books){
    const titleSlug = books[key].title.toLowerCase().replaceAll(' ', '-')
    if (titleSlug == title){
        pickedBook = books[key];
        return res.status(200).json(pickedBook);
    }
  }
  res.status(404).json({message: "Book not found"})
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  let isbn = +req.params.isbn;
  let pickedBook;
  for (let key in books){
      if (+key == isbn){
          pickedBook = books[+key];
          return res.status(200).json(pickedBook.reviews);
      }
    }
    return res.status(404).json({message: "Book not found"});
});

// Tests (task 10 - 13)

// Get all books (Task 10)
const getBooks = async () => {
    const outcome = await axios.get('https://anthonymulam-5000.theiadocker-3-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/');
}

// Get book by ISBN (Task 11)
const getBookbyIsbn = async (isbn) => {
    const outcome = await axios.get(`https://anthonymulam-5000.theiadocker-3-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/isbn/${isbn}`);
}

// Get book by author (Task 12)
const getbookByAuthor = async (author) => {
    const authorSlug = author.toLowerCase().replaceAll(' ', '-');
    const outcome = await axios.get(`https://anthonymulam-5000.theiadocker-3-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/author/${authorSlug}`);
}

//Get book by title (Task 13)
const getBookByTitle = async (title) => {
    const titleSlug = title.toLowerCase().replaceAll(' ', '-');
    const outcome = await axios.get(`https://anthonymulam-5000.theiadocker-3-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/title/${titleSlug}`);
}
module.exports.general = public_users;
