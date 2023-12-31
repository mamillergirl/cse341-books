const express = require("express");
const validation = require("../middleware/validation");
const booksController = require("../controllers/books");
 const auth = require("../middleware/auth")
const router = express.Router();

router.get("/",
  auth.ensureAuth, 
 booksController.getAll);
router.get("/:id", 
 auth.ensureAuth, 
 booksController.getOne);
router.post("/", 
 auth.ensureAuth, 
validation.createBook, booksController.createOne);
router.put("/:id", 
 auth.ensureAuth, 
validation.createBook, booksController.updateOne);
router.delete("/:id",
 auth.ensureAuth,
 booksController.deleteOne);

module.exports = router;
