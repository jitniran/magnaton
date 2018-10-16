var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var productSchema = new Schema({
  title: { type: String, required: true },
  orderType: { type: String },
  size: { type: [Number] },
  layers: { type: Number },
  substrate: { type: String },
  thickness: { type: Number },
  copperThickness: { type: Number },
  minimumSpacing: { type: Number },
  minimumHole: { type: Number },
  solderMask: { type: String },
  silkScreen: { type: String },
  surfaceFinish: { type: String },
  price: { type: Number },
  quantity: { type: Number }
});

module.exports = mongoose.model("Product", productSchema);
