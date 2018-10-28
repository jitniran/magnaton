const Order = require("../models/order");
const crypto = require("crypto");
exports.newOrder = function(req, res) {
  let order = new Order();
  order.txnid = crypto.randomBytes(25).toString("hex");
  order.price = req.body.price;
  order.product = req.body.product;
  order.user = req.user;
  order.status = "Payment Pending";
  order.save();
  res.send({ order: order });
};
