var express = require("express");
var router = express.Router();
var passport = require("passport");
var paycontroller = require("../controller/payController");

const authCheck = function(req, res, next) {
  if (!req.user) {
    res.redirect("/");
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
router.get("/gredirect", passport.authenticate("google"), function(
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

router.get("/user/profile", authCheck, function(req, res, next) {
  res.render("profile", { user: req.user });
});

router.post("/payment/payu", paycontroller.payUMoneyPayment);

module.exports = router;
