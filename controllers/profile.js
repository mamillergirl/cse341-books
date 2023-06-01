const mongodb = require("../db/connect");


const getProfile = async (req, res) => {
    
    
    mongodb
      .getDb()
      .db("library")
      .collection("users")
      .find({ googleId: req.user.id })
      .toArray((err) => {
        if (err) {
          res.status(400).json({ message: err });
        }
      })
      .then((lists) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(lists[0]);
      });
  
  };
module.exports = getProfile