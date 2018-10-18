const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  name: String,
  googleid: { type: Number, required: true },
  shippingAddress: String,
  shippingCity: String,
  shippingState: String,
  shippingPin: Number,
  billingAddress: String,
  billingCity: String,
  billingState: String,
  billingPin: Number,
  phone: Number,
  email: String,
  updated: Boolean
});

const User = mongoose.model("User", userSchema);

module.exports = User;
