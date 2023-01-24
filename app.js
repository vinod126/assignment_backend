var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const { body, query } = require("express-validator");
const validator = require("./modules/validators/validator");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
let foodItemsRouter = require("./routes/foodItems");
let menuRouter = require("./routes/menu");
let ordersRouter = require("./routes/orders");
let reviewRouter = require("./routes/review");
let swaggerJsDoc = require("swagger-jsdoc");
let swaggerUI = require("swagger-ui-express");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

const options = {
  definition: {
    info: {
      title: "Food application",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*.js"], // files containing annotations as above
};

let swaggerDocs = swaggerJsDoc(options);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/getFoodItems", foodItemsRouter);
app.use("/menu", menuRouter);
app.use("/orders", ordersRouter);
app.use("/review", reviewRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
  //res.render("error");
});

module.exports = app;
