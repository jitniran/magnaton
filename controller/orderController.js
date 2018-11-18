const Order = require("../models/order");
const crypto = require("crypto");
exports.newOrder = function(req, res) {
  let order = new Order();
  order.txnid = crypto.randomBytes(25).toString("hex");
  order.price = req.body.price;
  order.product = req.body.product;
  order.userId = req.user.googleid;
  //status 1: order created 2: file uploaded 3: paid 4: delivered
  order.status = 1;
  order.save();
  res.send({ order: order });
};
exports.update = function(req, res) {
  let txnid = req.query.id;
  console.log("in update");
  Order.findOne({ txnid: txnid }, function(err, order) {
    order.status = 3;
    order.save(function(err) {});
    console.log("update");
    res.render("orderStatus", { user: req.user, order: order });
  });
};
exports.allOrders = function(req, res) {
  let id = req.user.googleid;
  Order.find({ userId: id })
    .lean()
    .exec(function(err, docs) {
      res.render("orders", { user: req.user, orders: docs });
    });
};

exports.checkout = function(req, res) {
  let id = req.query.id;
  if (id) {
    res.render("checkout", { user: req.user, orderId: id });
  } else {
    res.send("Error");
  }
};
