const Order = require("../models/order");
const crypto = require("crypto");
exports.newOrder = function(req, res) {
  let order = new order();
  order.txnid = crypto.randomBytes(25).toString("hex");
  order.price = req.price;
  order.product = req.product;
  order.user = req.user;
  order.status = "Payment Pending";
  order.save();
  res.render("checkout", { order: order });
};

