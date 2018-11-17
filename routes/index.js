var express = require("express");
var router = express.Router();
var passport = require("passport");
// var multipart = require("connect-multiparty");
// var multipartMiddleware = multipart();
var paycontroller = require("../controller/payController");
var orderController = require("../controller/orderController");
const Product = require("../models/product");
const User = require("../models/user");

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
router.post("/payment/payu/response", paycontroller.payUMoneyPaymentResponse);

router.post("/orders/new", orderController.newOrder);
router.get("/user/orders", orderController.allOrders);
router.post("/user/update", authCheck, function(req, res, next) {
  console.log(req.body);
  User.findOne({ googleid: req.user.googleid }).then(user => {
    user.name = req.body.name;
    user.email = req.body.email;
    user.phone = req.body.phone;
    user.shippingAddress = req.body.shippingAddress;
    user.shippingCity = req.body.shippingCity;
    user.shippingState = req.body.shippingState;
    user.shippingPin = req.body.shippingPin;

    user.billingAddress = req.body.billingAddress;
    user.billingCity = req.body.billingCity;
    user.billingState = req.body.billingState;
    user.billingPin = req.body.billingPin;

    user.updated = true;

    user.save();
    res.send("success");
  });
});
router.get("/checkout", orderController.checkout);
router.get("/order/update", orderController.update);

//pages

router.get("/help", function(req, res, next) {
  res.render("help", { user: req.user });
});

router.get("/privacy", function(req, res, next) {
  res.render("help", { user: req.user });
});

router.get("/faq", function(req, res, next) {
  res.render("help", { user: req.user });
});

module.exports = router;
