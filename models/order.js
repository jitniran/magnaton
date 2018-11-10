var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var orderSchema = new Schema(
  {
    price: Number,
    product: Schema.Types.Mixed,
    txnid: String,
    status: String,
    userId: Number,
    uploaded: Boolean,
    paid: Boolean
  },
  {
    timestamps: true
  }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
