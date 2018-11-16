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
        console.log(json);
      });
  },
  catchException: function(BOLT) {
    // the code you use to handle the integration errors goes here
  }
};

function launchPayu() {
  fetch("/payment/payu/payment", {
    method: "POST" // *GET, POST, PUT, DELETE, etc.
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      console.log(myJson);
      bolt.launch(myJson, Handler);
    });
}
