var express = require("express");
var router = express.Router();
var passport = require("passport");
var multipart = require("connect-multiparty");
var multipartMiddleware = multipart();
var paycontroller = require("../controller/payController");
var orderController = require("../controller/orderController");
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
    user: req.user,
    layout: "layout_index"
  });
});

// GET product2 page
router.get("/product1", function(req, res, next) {
  Product.findOne({ title: "Proto PCB" }).then(product => {
    res.render("product", {
      product: product,
      user: req.user
    });
  });
});

// GET product2 page
router.get("/product2", function(req, res, next) {
  Product.findOne({ title: "Standard PCB" }).then(product => {
    res.render("product", {
      product: product,
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

router.post("/orders/new", orderController.newOrder);

router.get("/checkout", function(req, res, next) {
  res.render("checkout");
});

//pages

router.get("/instant_quote", function(req, res, next) {
  res.render("instant_quote", { user: req.user });
});

router.get("/aboutpcb", function(req, res, next) {});

router.get("/homeautomation", function(req, res, next) {});

router.get("/contact", function(req, res, next) {});
module.exports = router;
