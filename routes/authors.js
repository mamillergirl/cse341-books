const express = require("express");

const authorsController = require("../controllers/authors");

const router = express.Router();

router.get("/", authorsController.getAll);
router.get("/:id", authorsController.getOne);
router.post("/", authorsController.createOne);
router.put("/:id", authorsController.updateOne);
router.delete("/:id", authorsController.deleteOne);

module.exports = router;
