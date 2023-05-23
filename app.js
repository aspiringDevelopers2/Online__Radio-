const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoute");
const endPoint = require("./helpers/endpoints");
const errorHandler = require("./helpers/errorhandler");
const AppError = require("./helpers/errorObject");
dotenv.config({ path: "./config.env" });

const app = express();
app.use(cookieParser());
app.use(express.json({ limit: "100kb" }));
console.log(endPoint.user);
app.use(endPoint.user, userRoute);

app.use("*", function (req, res, next) {
  next(new AppError("This route does not exist", 404));
});
app.use(errorHandler);
module.exports = app;
