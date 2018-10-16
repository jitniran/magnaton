var mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017/pcb",
  { useNewUrlParser: true }
);

var Product = require("../models/products");

var product = new Product({
  title: "P1",
  orderType: "Single",
  size: [3, 5],
  layers: 1,
  substrate: "FR1",
  thickness: 1.6,
  copperThickness: 1,
  minimumSpacing: 0.3,
  minimumHole: 0.4,
  solderMask: "Green",
  silkScreen: "White",
  surfaceFinish: "HASL with Lead",
  price: 200,
  quantity: 5
});

product.save(function(err, product) {
  mongoose.disconnect();
});
