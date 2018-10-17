var express = require("express");
var router = express.Router();
var passport = require("passport");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Magnaton" });
});

// GET product page
router.get("/product", function(req, res, next) {
  res.render("product", { title: "Magnaton" });
});

//auth with google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email"]
  })
);

//redirect URI
router.get("/google/redirect", passport.authenticate("google"), function(
  req,
  res,
  next
) {
  res.send("Callback URi");
});

module.exports = router;
