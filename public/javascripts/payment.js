var RequestData = {
  key: "rjQUPktU",
  txnid: "123456789",
  hash: "defdfaadgerhetiwerer",
  amount: "1",
  firstname: "Jaysinh",
  email: "dummyemail@dummy.com",
  phone: "6111111111",
  productinfo: "Bag",
  surl: "https://sucess-url.in",
  furl: "https://fail-url.in"
};

var Handler = {
  responseHandler: function(BOLT) {
    // your payment response Code goes here, BOLT is the response object
  },
  catchException: function(BOLT) {
    // the code you use to handle the integration errors goes here
  }
};

function launchPayu() {
  bolt.launch();
}
