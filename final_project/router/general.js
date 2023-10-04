const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


/*public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});*/

public_users.post("/register", (req,res) => {
    //Write your code here
    const username = req.body.username;
    const password = req.body.password;
  
    for (const usr in users)
    {
        if (usr.username === username)
        {
            return res.send("User already exists !");
        }
    }
    if (username && password)
    {
        users.push({"username":username, "passeword":password});
        res.send("User added !");
        }
});
  

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(200).json({books});
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    const book = findByAuthor(author);
    if (book){
        res.json(book);
    }
    else{
        res.status(404).json({message: "Book not found"});
    }
});

function findByAuthor(author){
    for (const key in books){
        if (books[key].author === author){
            return books[key];
        }
    
    }
    return null;
}
  
  
// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const book = findByISBN(isbn);
  if (book){
      res.json(book);
  }else{
      res.status(404).json({message: "Book not found"});
  }

});

function findByISBN(isbn){
    for (const key in books){
        if (books[key].isbn === isbn){
            return books[key];
        }
    }
    return null;
}



// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  const book = findByTitle(title);

  if (book){
      res.json(book);
  }
  else{
      res.status(404).json({message: "Book not found"});
  }
  
});

function findByTitle(title){
    for (const key in books){
        if (books[key].title === title){
            return books[key];
        }
    }
    return null;
}   

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    //Write your code here
    const isbn = req.params.isbn;
    const book = findByISBN(isbn);
    if (book){
        res.json(book.reviews);
    }else{
        res.status(404).json({message: "Book not found"});
    }
  
});
  
function findByISBN(isbn){
    for (const key in books){
        if (books[key].isbn === isbn){
            return books[key];
        }
    }
    return null;
}


module.exports.general = public_users;
