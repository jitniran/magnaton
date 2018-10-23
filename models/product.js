var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var productSchema = new Schema({
  title: { type: String, required: true },
  size: { height: Number, width: Number },
  price: { type: Number },
  quantity: { type: Number },
  items: {
    order_type: [{ name: String, price: Number }],
    layers: [{ name: String, price: Number }],
    substrate: [{ name: String, price: Number }],
    thickness: [{ name: String, price: Number }],
    copper_thickness: [{ name: String, price: Number }],
    minimum_spacing: [{ name: String, price: Number }],
    minimum_hole_size: [{ name: String, price: Number }],
    solder_mask_color: [{ name: String, price: Number }],
    silk_screen_color: [{ name: String, price: Number }],
    surface_finish: [{ name: String, price: Number }]
  }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
