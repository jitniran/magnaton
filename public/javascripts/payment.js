var Handler = {
  responseHandler: function(BOLT) {
    // your payment response Code goes here, BOLT is the response object
    fetch("payment/payu/response", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(BOLT.response)
    })
      .then(function(a) {
        return a.json();
      })
      .then(function(json) {
        console.log(json.status);
        if (json.status === "success") {
          window.location.href = "/order/update/?id=" + json.id;
        }
      });
  },
  catchException: function(BOLT) {
    // the code you use to handle the integration errors goes here
  }
};

function launchPayu(id) {
  fetch("/payment/payu/payment", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      Accept: "application/json",

      "Content-Type": "application/json"
    },

    body: JSON.stringify({ id: id })
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      console.log(myJson);
      bolt.launch(myJson, Handler);
    });
}
