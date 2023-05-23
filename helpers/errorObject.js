class AppError extends Error {
  constructor(message, statusCode) {
    // To tell us the error that we made mistake by ourselves while creating the server
    this.isOperational = true;
    super(message);
    this.statusCode = statusCode;
    this.status = `${this.statusCode}`.startsWith("4") ? "fail" : "error";
  }
}
module.exports = AppError;
