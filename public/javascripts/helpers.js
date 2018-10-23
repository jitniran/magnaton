module.exports = {
  stringHelper: function(a) {
    a = a.split("_");

    return a.join(" ").toUpperCase();
  }
};
