const jwt = require("jsonwebtoken");
const config = require("../config");
const ApiError = require("../api-error");

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return next(new ApiError(403, "No token provided"));
  }

  jwt.verify(token, config.auth.jwtSecret, (err, decoded) => {
    if (err) {
      return next(new ApiError(401, "Unauthorized: invalid or expired token"));
    }
    req.userId = decoded.id;
    req.username = decoded.username;
    next();
  });
};