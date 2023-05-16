const express = require("express");

const booksController = require("../controllers/books");

const router = express.Router();

router.get("/", booksController.getAll);
router.get("/:id", booksController.getOne);
router.post("/", booksController.createOne);
router.put("/:id", booksController.updateOne);
router.delete("/:id", booksController.deleteOne);

module.exports = router;
