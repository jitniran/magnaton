function calc(
  size,
  quantity,
  layersOpt,
  substrateOpt,
  thicknessOpt,
  copperOpt,
  spacingOpt,
  holeOpt,
  solderMaskCOpt,
  surfaceFinishOpt,
  state
) {
  //options of attributes
  let deliveryCharge = 0;
  if ((state = "karnataka")) {
    deliveryCharge = 60;
  } else {
    deliveryCharge = 75;
  }
  let tax = 0.18;

  let tax = 0;
  let totalPrice = 0;
  let z = size.height * size.width;

  let f = z * p1.quantity;

  layersPrice = f * price.layers[layersOpt];
  substratePrice = f * price.substrate[substrateOpt];
  thicknessPrice = f * price.thickness[thicknessOpt];
  copperPrice = f * price.copper[copperOpt];
  spacingPrice = f * price.spacing[spacingOpt];
  holePrice = f * price.hole[holeOpt];
  solderMaskCPrice = f * price.solderMaskC[solderMaskCOpt];
  surfaceFinishPrice = f * price.surfaceFinish[surfaceFinishOpt];

  totalPrice =
    layersPrice +
    substratePrice +
    thicknessPrice +
    copperPrice +
    spacingPrice +
    holePrice +
    solderMaskCPrice +
    surfaceFinishPrice +
    deliveryCharge;

  totalPrice += tax * totalPrice;
  return totalPrice;
}

function getSelectedVariables() {
  let product1 = document.getElementById("product1");
  let inputs = product1.getElementsByTagName("input");
  let p1 = [];
  for (let i = 0; i < inputs.length; i++) {
    let ele = inputs[i];
    if ((ele.type = "text")) {
      // text
    } else if (ele.type == "radio" && ele.checked) {
      let attribute,
        option = ele.value.split(",");
      p1.push(attribute, option);
    }
  }
}
