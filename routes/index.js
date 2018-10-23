var express = require("express");
var router = express.Router();
var passport = require("passport");
var paycontroller = require("../controller/payController");
const Product = require("../models/product");

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
  res.render("index", {
    title: "Magnaton",
    user: req.user
  });
});

// GET product page
router.get("/product", function(req, res, next) {
  Product.find().then(products => {
    res.render("product", {
      title: "Magnaton",
      products: products,
      user: req.user
    });
  });
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
  res.redirect("/");
});

//logout
router.get("/logout", function(req, res, next) {
  req.logout();
  res.redirect("/");
});

router.get("/user/profile", authCheck, function(req, res, next) {
  res.render("profile", { user: req.user });
});

router.post("/payment/payu/payment", paycontroller.payUMoneyPayment);
router.post("/payment/payu/response", paycontroller.payUMoneyPayment);
router.get("/checkout", function(req, res, next) {
  res.render("checkout");
});

module.exports = router;
