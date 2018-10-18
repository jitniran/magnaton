const price = {
  // {1: 850, 2: 1600}
  layers: [850, 1600],
  // {FR4: 0,FR1: -1.2,ALUMINIUM: 2},
  substrate: [0, -1.2, 2],
  // {1.6: 0, 2: 2, 1.2: -1},
  thickness: [0, 2 - 1],
  //{1: 0,2: 2}
  copper: [0, 2],
  // {0.3: 0, 0.4: 0, 0.5: 0},
  spacing: [0, 0, 0],
  //{0.3: 0,0.4: 0,0.5: 0}
  hole: [0, 0, 0],
  //{green: 0,white: 0},
  solderMaskC: [0, 0],
  //{ white: 0, black: 0 },
  silkscreenC: [0, 0],
  // {HASL: 0,none: 0}
  surfaceFinish: [0, 0]
};

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
