class ApiError extends Error {
  constructor(statusCode, message) {
    super(0);
    this.statusCode = statusCode;
    this.message = message;
  }
}
module.exports = ApiError;
