const jsSHA = require("jssha");
const keys = require("../config/keys");
const Order = require("../models/order");

exports.payUMoneyPayment = function(req, res) {
  // if (
  //   !req.body.txnid ||
  //   !req.body.amount ||
  //   !req.body.productinfo ||
  //   !req.body.firstname ||
  //   !req.body.email
  // ) {
  //   res.send("Mandatory fields missing");
  // } else {
  let id = req.body.id;
  let user = req.user;
  console.log(id);
  Order.findById({ _id: id })
    .lean()
    .exec(function(err, order) {
      var pd = {
        key: keys.payumoney.key,
        txnid: order.txnid,
        hash: "",
        amount: order.price,
        firstname: user.name,
        email: user.email,
        phone: user.phone,
        productinfo: "PCB",
        surl: "http://localhost:3000/user/orders",
        furl: "https://localhost:3000/user/orders"
      };
      var hashString =
        keys.payumoney.key + // Merchant Key
        "|" +
        pd.txnid +
        "|" +
        pd.amount +
        "|" +
        pd.productinfo +
        "|" +
        pd.firstname +
        "|" +
        pd.email +
        "|" +
        "||||||||||" +
        keys.payumoney.salt; // Your salt value
      var sha = new jsSHA("SHA-512", "TEXT");

      sha.update(hashString);

      pd.hash = sha.getHash("HEX");
      res.json(pd);
    });
};

exports.payUMoneyPaymentResponse = function(req, res) {
  var pd = req.body;

  //Generate new Hash

  var hashString =
    keys.payumoney.salt +
    "|" +
    pd.status +
    "||||||||||" +
    "|" +
    pd.email +
    "|" +
    pd.firstname +
    "|" +
    pd.productinfo +
    "|" +
    pd.amount +
    "|" +
    pd.txnid +
    "|" +
    keys.payumoney.key;

  var sha = new jsSHA("SHA-512", "TEXT");

  sha.update(hashString);

  var hash = sha.getHash("HEX");

  // Verify the new hash with the hash value in response
  console.log(pd);
  if (hash == pd.hash) {
    let order = Order.findone({ txnid: pd.txnid });
    order.status = 3;
    order.save();
    console.log("im here " + pd.status);
    res.send({ status: pd.status });
  } else {
    res.send({ status: "Error occured" });
  }
};
