var express = require("express");
var router = express.Router();
var passport = require("passport");

const authCheck = function(req, res, next) {
  if (!req.user) {
    router.redirect("/");
  } else {
    // if logged in
    next();
  }
};

/* GET home page. */
router.get("/", function(req, res, next) {
  if (req.user) {
    res.render("index", { title: "Magnaton", user: req.user });
  } else {
    res.render("index", { title: "Magnaton", user: false });
  }
});

// GET product page
router.get("/product", function(req, res, next) {
  if (req.user) {
    res.render("product", { title: "Magnaton", user: req.user });
  } else {
    res.render("product", { title: "Magnaton" });
  }
});

//auth with google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"]
  })
);

//redirect URI
router.get("/google/redirect", passport.authenticate("google"), function(
  req,
  res,
  next
) {
  res.redirect("/product");
});

//logout
router.get("/logout", function(req, res, next) {
  req.logout();
  res.redirect("/");
});

module.exports = router;
