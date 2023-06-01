const express = require("express");
const authorsController = require("../controllers/authors");
const validation = require("../middleware/validation");
const router = express.Router();


router.get("/", authorsController.getAll);
router.get("/:id", authorsController.getOne);
router.post("/", validation.createAuthor, authorsController.createOne);
router.put("/:id",  validation.createAuthor, authorsController.updateOne);
router.delete("/:id",  authorsController.deleteOne);

module.exports = router;
