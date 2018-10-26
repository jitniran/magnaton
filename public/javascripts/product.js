const product1 = document.getElementById("PCB1");

const calProduct1 = document
  .getElementById("calc")
  .addEventListener("click", product1Control(false));
const buyProduct1 = document
  .getElementById("buy")
  .addEventListener("click", product1Control(true));

function calculatePrice(height, width, quantity, items) {
  //options of attributes
  console.log(height, width, quantity);
  let tax = 0.18;

  let totalPrice = 0;
  let z = parseInt(height) * parseInt(width);

  let f = z * parseInt(quantity);

  items.every(item => {
    console.log(item);
    totalPrice += f * parseInt(item[2]);
  });
  console.log(totalPrice);
  totalPrice += tax * totalPrice;
  return totalPrice;
}

function buyProduct(title, height, width, quanity, items, price) {
  let formData = new FormData();

  formData.append("title", title);
  formData.append("height", height);
  formData.append("width", width);
  formData.append("quantity", quanity);
  formData.append("price", price);
  formData.append("items", items);

  fetch("/orders/new", {
    method: "POST",
    body: formData
  }).then(function(response) {});
}

function product1Control(buy) {
  let inputs = product1.getElementsByTagName("input");
  let p1 = [];
  let height, width, quanity;
  for (let i = 0; i < inputs.length; i++) {
    let ele = inputs[i];
    if ((ele.type = "text")) {
      switch (ele.id) {
        case "height":
          height = ele.value;
        case "width":
          width = ele.value;
        case "quantiy":
          quantity = ele.value;
        default:
          continue;
      }
    } else if (ele.type === "radio" && ele.checked) {
      console.log("hello " + ele.value);
      option = ele.value.split(",");
      console.log(option);
      p1.push(option);
    }
  }
  let price = calculatePrice(height, width, quantity, p1);
  priceEle = document.getElementById("price");
  priceEle.innerHTML = "price " + price;
  // if (buy) {
  //   buyProduct(height, width, quanity, p1, price);
  // }
}
