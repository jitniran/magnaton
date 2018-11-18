const title = document.getElementById("product").innerHTML;
let calProduct = document.getElementById("calc");
calProduct.addEventListener(
  "click",
  () => {
    productControl(false);
  },
  false
);
let buyProduct = document.getElementById("buy");
buyProduct.addEventListener(
  "click",
  () => {
    productControl(true);
  },
  false
);

function calculatePrice(height, width, quantity, items) {
  //options of attributes
  let tax = 0.18;

  let totalPrice = 0;
  let z = parseInt(height) * parseInt(width);

  let f = z * parseInt(quantity);
  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    if (item[0] == "layers") {
      totalPrice += parseInt(item[2]);
    } else totalPrice += f * parseInt(item[2]);
  }
  totalPrice += tax * totalPrice;
  return totalPrice;
}

function orderProduct(height, width, quantity, items, price) {
  let product = {
    title: title,
    height: height,
    width: width,
    quantity: quantity,
    items: items
  };
  var snackbarContainer = document.querySelector("#toast");
  var data = { message: "Placing order" };
  snackbarContainer.MaterialSnackbar.showSnackbar(data);
  fetch("/orders/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({ product: product, price: price })
  }).then(function(response) {
    window.location.href = "/user/orders";
  });
}

function productControl(buy) {
  let inputs = document.querySelectorAll("input[type=text]");
  let radios = document.querySelectorAll("input[type=radio]");
  let p1 = [];
  let height, width, quantity;
  for (let i = 0; i < inputs.length; i++) {
    let ele = inputs[i];
    if (ele.type == "text") {
      switch (ele.id) {
        case "height":
          height = ele.value;
        case "width":
          width = ele.value;
        case "quantity":
          quantity = ele.value;
        default:
          continue;
      }
    }
  }
  for (let i = 0; i < radios.length; i++) {
    let ele = radios[i];
    if (ele.checked) {
      let val = ele.value.split(",");
      p1.push(val);
    }
  }
  let price = calculatePrice(height, width, quantity, p1);
  priceEle = document.getElementById("price");
  priceEle.innerHTML = "price " + price;
  if (buy) {
    orderProduct(height, width, quantity, p1, price);
  }
}
