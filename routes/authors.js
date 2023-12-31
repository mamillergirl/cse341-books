const express = require("express");
const authorsController = require("../controllers/authors");
const validation = require("../middleware/validation");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/", auth.ensureAuth, authorsController.getAll);
router.get("/:id", auth.ensureAuth, authorsController.getOne);
router.post(
  "/",
  auth.ensureAuth,
  validation.createAuthor,
  authorsController.createOne
);
router.put(
  "/:id",
  auth.ensureAuth,
  validation.createAuthor,
  authorsController.updateOne
);
router.delete("/:id", auth.ensureAuth, authorsController.deleteOne);

module.exports = router;
