const express = require('express')
const passport = require('passport')
const router = express.Router()
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const dotenv = require('dotenv');
dotenv.config();
const mongodb = require("../db/connect");



passport.use(
  new GoogleStrategy({
      // options for google strategy
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: '/auth/callback'
  }, (accessToken, refreshToken, profile, done) => {
      
      //console.log('passport callback function fired:');
      //console.log(profile);
      const newUser = {
        googleId: profile.id,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        image: profile.photos[0].value,
      }

      
        mongodb.getDb()
        .db("library")
        .collection("users")
        .find({ googleId: profile.id})
        .toArray()
        .then( (lists) => {
          
          if (lists.length == 0) 
          mongodb
            .getDb()
            .db("library")
            .collection("users")
            .insertOne(newUser).then((newUser) => {
                  console.log('new user created: ', newUser);
            });
          
        }
         )
        let user = profile
        done(null, user)
       
  
      } ))

      passport.serializeUser((user, done) => {
        done(null, user);
      });
      
      
      passport.deserializeUser((user, done) => {
        done(null, user);
      })
      
router.get('/', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/callback',
  passport.authenticate('google'), (req, res) => {
    res.redirect('/profile')
});


router.get('/logout', (req, res, next) => {
  req.logout((error) => {
      if (error) {return next(error)}
      res.redirect('/')
  })
})

module.exports = router;