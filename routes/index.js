const express = require("express");
const auth = require("../middleware/auth")
const router = express.Router();

router.use('/', require('./swagger'))
router.use("/books",
  auth.ensureAuth, 
 require("./books"));
router.use("/authors", 
 auth.ensureAuth, 
require("./authors"));
router.use("/auth",  
require("./auth"));
router.use("/profile", 
 auth.ensureAuth,
 require("./profile"));
module.exports = router;
