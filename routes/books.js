const express = require("express");
const validation = require("../middleware/validation");
const booksController = require("../controllers/books");

const router = express.Router();

router.get("/", booksController.getAll);
router.get("/:id", booksController.getOne);
router.post("/", validation.createBook, booksController.createOne);
router.put("/:id", validation.createBook, booksController.updateOne);
router.delete("/:id", booksController.deleteOne);

module.exports = router;
