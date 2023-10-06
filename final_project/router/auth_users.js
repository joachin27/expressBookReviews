const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [{
    "username": "Reek",
    "password": "1235"
}];

const isValid = (username) => {
    // Code pour vérifier si le nom d'utilisateur est valide
    if (!username) {
      return false;
    }
    return true;
}
  
const authenticatedUser = (username, password) => {
// Code pour vérifier si le nom d'utilisateur et le mot de passe correspondent à ceux de la liste des utilisateurs
for (const user of users) {
    if (user.username === username && user.password === password) {
    return true;
    }
}
return false;
}
  
  // Route pour la connexion d'utilisateurs enregistrés
regd_users.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!isValid(username) || !password) {
        return res.status(400).json({ message: "Invalid body" });
    }

    if (!authenticatedUser(username, password)) {
        return res.status(401).json({ message: "Login failed" });
    }

    const accessToken = jwt.sign(
    {
        data: { username }
        },
        'access', // Assurez-vous que cette clé correspond à celle utilisée pour la vérification de la signature
        { expiresIn: '1h' } // Vous pouvez ajuster la durée de validité selon vos besoins
    );

    req.session.authorization = {
        accessToken
    }
    return res.status(200).json({ message: "User successfully logged in" });
});
  
// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
   const isbn =  req.params.isbn;
   const username = req.session.username;
   var bk = deleteReview(isbn);

   if (bk)
   {
        bk = bk.filter((review) => review.username != username);
        res.send("Review deleted")
   } 
   else
   {
       res.status(404).json({message: "Delete failed"});
   }
});

function deleteReview(isbn)
{
    for (let bookId in books)
    {
        if (books[bookId].isbn === isbn)
        {
            return books[bookId].reviews;
        }
    }
    return null;
}

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
