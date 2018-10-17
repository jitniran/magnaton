const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  googleid: { type: Number, required: true },
  shippingAddress: String,
  shippingCity: String,
  billingAddres: String,
  billingCity: String,
  phone: Number,
  email: String
});

const User = mongoose.model("User", userSchema);

module.exports = User;
