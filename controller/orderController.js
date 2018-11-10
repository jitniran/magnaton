const Order = require("../models/order");
const crypto = require("crypto");
exports.newOrder = function(req, res) {
  let order = new Order();
  order.txnid = crypto.randomBytes(25).toString("hex");
  order.price = req.body.price;
  order.product = req.body.product;
  order.userId = req.user.googleid;
  order.status = "Payment Pending";
  order.save();
  res.send({ order: order });
};

exports.allOrders = function(req, res) {
  let id = req.user.googleid;
  Order.find({ userId: id })
    .lean()
    .exec(function(err, docs) {
      res.render("orders", { orders: docs });
    });
};

exports.checkout = function(req, res) {
  let id = req.query.id;
  Order.findById({ _id: id })
    .lean()
    .exec(function(err, doc) {
      res.render("checkout", { order: doc });
    });
};
