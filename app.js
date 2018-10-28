var createError = require("http-errors");
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var expressHbs = require("express-handlebars");
var mongoose = require("mongoose");
var indexRouter = require("./routes/index");
const passportSetup = require("./config/passport_setup");
const cookieSession = require("cookie-session");
const session = require("express-session");
// const MongoStore = require("connect-mongo")(session); use mongo store for heavy lifting
const passport = require("passport");

var app = express();

mongoose.connect(
  "mongodb://localhost:27017/pcb",
  { useNewUrlParser: true }
);
// view engine setup
app.engine(
  ".hbs",
  expressHbs({
    defaultLayout: "layout",
    extname: ".hbs",
    helpers: require("./public/javascripts/helpers")
  })
);
app.set("view engine", ".hbs");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use(
//   session({
//     secret: "hfhfjdhfjdfejr",
//     resave: false,
//     saveUninitialized: false,
//     store: new MongoStore({ mongooseConnection: mongoose.connection }),
//     cookie: {
//       maxAge: 24 * 60 * 60 * 1000
//     }
//   })
// );

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ["3463t4brh3r83ru39r"]
  })
);
//initialize session
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
