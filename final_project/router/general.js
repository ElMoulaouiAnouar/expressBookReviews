const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  
  const {username , password } =  req.body;

  if(username && password){
    //check user if exists 
    const exists = users.filter(user => user.username === username);
    if(exists.length > 0){
      return res.status(403).json({message: "The username already exists"});
    }
    users.push({
      username , 
      password
    });
    return res.status(201).json({message: "Register successfuly"});
  }
  return res.status(403).json({message: "Please send the username and password"});
});
 
// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.status(200).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  
  const isbn = req.params.isbn;
  if(isbn && books[isbn]){
    return res.status(200).json(books[isbn]);
  }

  return res.status(404).json({message: "Not found , please give isbn valid"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  
 const author = req.params.author;
  
  const books_by_authors =   Object.values(books).filter(book => book.author.includes(author));
   return res.status(200).json(books_by_authors);
  
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  
  const books_by_title =   Object.values(books).filter(book => book.title.includes(title));
   return res.status(200).json(books_by_title);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;

  if(isbn && books[isbn]){
    return res.status(200).json({ reviews :  books[isbn].reviews});
  }

  return res.status(404).json({message: "Not found , please give isbn valid"});
});

module.exports.general = public_users;
