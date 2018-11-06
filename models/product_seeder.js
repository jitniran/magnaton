var mongoose = require("mongoose");
const keys = require("../config/keys");

let url = "mongodb://ds145043.mlab.com:45043/pcb";
mongoose.connect(
  // "mongodb://localhost:27017/pcb",
  url,
  {
    auth: {
      user: keys.db.user,
      password: keys.db.password
    },
    useNewUrlParser: true
  }
);

var Product = require("../models/product");

const product = new Product({
  title: "Proto PCB",
  items: {
    order_type: [
      {
        name: "Single",
        price: 0
      },
      {
        name: "Panel",
        price: 0
      }
    ],
    layers: [
      {
        name: "1",
        price: 850
      },
      {
        name: "2",
        price: 1600
      }
    ],
    substrate: [
      {
        name: "FR4",
        price: 0
      },
      {
        name: "FR1",
        price: -1.2
      },
      {
        name: "ALUMINIUM",
        price: 2
      }
    ],
    thickness: [
      {
        name: "1.6",
        price: 0
      },
      {
        name: "2",
        price: 2
      },
      {
        name: "1.2",
        price: -1
      }
    ],
    copper_thickness: [
      {
        name: "1oz",
        price: 0
      },
      {
        name: "2oz",
        price: 2
      }
    ],
    minimum_spacing: [
      {
        name: "0.3",
        price: 0
      },
      {
        name: "0.4",
        price: 0
      },
      {
        name: "0.5",
        price: 0
      }
    ],
    minimum_hole_size: [
      {
        name: "0.3",
        price: 0
      },
      {
        name: "0.4",
        price: 0
      },
      {
        name: "0.5",
        price: 0
      }
    ],
    solder_mask_color: [
      {
        name: "green",
        price: 0
      },
      {
        name: "white",
        price: 0
      }
    ],
    silk_screen_color: [
      {
        name: "white",
        price: 0
      },
      {
        name: "black",
        price: 0
      }
    ],
    surface_finish: [
      {
        name: "HASL with lead",
        price: 0
      },
      {
        name: "none",
        price: 0
      }
    ]
  }
});

product.save(function(err, product) {});

const product2 = new Product({
  title: "Standard PCB",
  items: {
    order_type: [
      {
        name: "Single",
        price: 0
      },
      {
        name: "Panel",
        price: 0
      }
    ],
    layers: [
      {
        name: "1",
        price: 850
      },
      {
        name: "2",
        price: 1600
      }
    ],
    substrate: [
      {
        name: "FR4",
        price: 0
      },
      {
        name: "FR1",
        price: -1.2
      },
      {
        name: "ALUMINIUM",
        price: 2
      }
    ],
    thickness: [
      {
        name: "1.6",
        price: 0
      },
      {
        name: "2",
        price: 2
      },
      {
        name: "1.2",
        price: -1
      }
    ],
    copper_thickness: [
      {
        name: "1oz",
        price: 0
      },
      {
        name: "2oz",
        price: 2
      }
    ],
    minimum_spacing: [
      {
        name: "0.3",
        price: 0
      },
      {
        name: "0.4",
        price: 0
      },
      {
        name: "0.5",
        price: 0
      }
    ],
    minimum_hole_size: [
      {
        name: "0.3",
        price: 0
      },
      {
        name: "0.4",
        price: 0
      },
      {
        name: "0.5",
        price: 0
      }
    ]
  }
});

product2.save(function(err, product) {
  mongoose.disconnect();
});
