var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var orderSchema = new Schema(
  {
    price: Number,
    product: Schema.Types.Mixed,
    txnid: Number,
    status: String,
    user: { type: Schema.Types.ObjectId, ref: "User" }
  },
  {
    timestamps: true
  }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
