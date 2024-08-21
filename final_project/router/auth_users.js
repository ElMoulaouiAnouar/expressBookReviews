const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
  const exists = users.filter(user => user.username === username);
  return exists.length > 0;
}

const authenticatedUser = (username,password)=>{ //returns boolean

  const exists = users.filter(user => user.username === username && user.password === password);
  return exists.length > 0;

}

//only registered users can login
regd_users.post("/login", (req,res) => {
 
  const {username , password} = req.body;

  if(!isValid(username))
    return  res.status(403).json({message: "username or password incorrect"});

  if(!authenticatedUser(username,password))
    return  res.status(403).json({message: "username or password incorrect"});

  const accessToken = jwt.sign({data :{username }},'yoursecret',{expiresIn: 60 * 60});
  
  req.session.authorization = {accessToken};

  return res.status(200).json({message: "User successfully logged in"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const {review} = req.body;


 const payload =  jwt.decode(req.session.authorization.accessToken);
 const username = payload.data.username;

  if(!isbn || !books[isbn]){
    return res.status(403).json({message : "Please give isbn correct"})
  }
  if(!review){
    return res.status(403).json({message : "Please give review correct"})
  }

  books[isbn].reviews[username] = review;

  return res.status(200).json({message : "adding success" , book : books[isbn]});
});

regd_users.delete('/auth/review/:isbn' , (req,res)=> {
  const isbn = req.params.isbn;
 
 const payload =  jwt.decode(req.session.authorization.accessToken);
 const username = payload.data.username;

  if(!isbn || !books[isbn]){
    return res.status(403).json({message : "Please give isbn correct"})
  }
  
  delete books[isbn].reviews[username] 
  

  return res.status(200).json({message : "deleting success" , book : books[isbn]});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
