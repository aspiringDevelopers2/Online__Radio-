const LinkModel = require("../models/linkModel");
const catchAsync = require("../helpers/catchAsync");
const AppError = require("../helpers/errorObject");
exports.getAllLinks = catchAsync((req, res, next) => {
  const data = LinkModel.find();
  if (!data) {
    return next(new AppError("Could not load the radio links", 400));
  }
  res.statue(200).json({ status: "success", data });
});
