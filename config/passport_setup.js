const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys");
const User = require("../models/user");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      //options
      callbackURL: "/google/redirect",
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret
    },
    (acessToken, refreshToken, profile, done) => {
      User.findOne({ googleid: profile.id }).then(currentUser => {
        if (currentUser) {
          // already here
          console.log("user:" + currentUser);
          done(null, currentUser);
        } else {
          new User({
            username: profile.displayName,
            googleid: profile.id
          })
            .save()
            .then(newUser => {
              console.log("new user " + newUser);
              done(null, currentUser);
            });
        }
      });
    }
  )
);