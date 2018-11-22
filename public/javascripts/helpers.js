module.exports = {
  stringHelper: function(a) {
    a = a.split("_");

    return a.join(" ").toUpperCase();
  },
  if_eq: function(a, b, opts) {
    if (a == b) return opts.fn(this);
    else return opts.inverse(this);
  }
};
