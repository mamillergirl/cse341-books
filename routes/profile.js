const express = require("express");
const auth = require("../middleware/auth")
//const profileController = require("../controllers/profile");
const router = express.Router();

router.get("/", auth.ensureAuth, 
//profileController.getProfile
(req, res) => {res.send(`Welcome ${req.user.displayName}`);}
)
    

module.exports = router;
