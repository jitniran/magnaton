const p1 = [];
function calculatePrice(height, width, quantity, items) {
  //options of attributes
  let tax = 0.18;

  let totalPrice = 0;
  let z = height * width;

  let f = z * p1.quantity;

  items.each(item => {
    totalPrice += f * item[2];
  });

  totalPrice += tax * totalPrice;
  return totalPrice;
}

function product1(buy) {
  let product1 = document.getElementById("product1");
  let inputs = product1.getElementsByTagName("input");
  for (let i = 0; i < inputs.length; i++) {
    let ele = inputs[i];
    if ((ele.type = "text")) {
      height = product1.getElementById("height").value;
      width = product1.getElementById("width").value;
      quantity = product1.getElementById("quanity").value;
    } else if (ele.type == "radio" && ele.checked) {
      option = ele.value.split(",");
      p1.push(option);
    }
  }
  if (buy) {
    calc(height, width, quantity, p1);
  } else {
    buy(height, width, quanity, p1);
  }
}

function buy(height, width, quanity, items) {
  // payu integration
}
