const errorHandler = (err, req, res, next) => {
  console.log(err.code);
  const error = err;
  if (error.code == "11000") {
    error.message = "This name already exist please try using another name";
  }
  console.log(error.message);
  res.status(404).json({
    status: "fail",
    statusCode: "404",
    error: {
      message: error.message,
      statusCode: err.statusCode,
      status: err.status,
      err,
    },
  });
};
module.exports = errorHandler;
