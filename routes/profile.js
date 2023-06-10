const express = require("express");
const auth = require("../middleware/auth")

//const profileController = require("../controllers/profile");
const router = express.Router();

router.get("/", auth.ensureAuth, 
//profileController.getProfile
(req, res) => {res.send(`<h2>Welcome ${req.user.displayName}</h2><ul><li><a href="http://localhost:8080/api-docs">View Documentation</a></li><li><a href="http://localhost:8080/authors">View Authors</a></li><li><a href="http://localhost:8080/books">View Books</a></li></ul><button><a href="http://localhost:8080/auth/logout">Log Out</a></button>`);}
)
    

module.exports = router;
