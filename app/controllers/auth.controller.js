const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const MongoDB = require("../utils/mongodb.util");
const UserService = require("../services/user.service");
const ApiError = require("../api-error");
const config = require("../config");

exports.register = async (req, res, next) => {
  if (!req.body?.username || !req.body?.password) {
    return next(new ApiError(400, "Username and password can not be empty"));
  }

  try {
    const userService = new UserService(MongoDB.client);
    const existing = await userService.findByUsername(req.body.username);

    if (existing) {
      return next(new ApiError(400, "Username already exists"));
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    const user = await userService.create({
      username: req.body.username,
      password: hashedPassword,
    });

    return res.send({
      message: "User registered successfully",
      username: user.username,
    });
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while registering the user"),
    );
  }
};

exports.login = async (req, res, next) => {
  if (!req.body?.username || !req.body?.password) {
    return next(new ApiError(400, "Username and password can not be empty"));
  }

  try {
    const userService = new UserService(MongoDB.client);
    const user = await userService.findByUsername(req.body.username);

    if (!user) {
      return next(new ApiError(404, "User not found"));
    }

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      return next(new ApiError(401, "Invalid password"));
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      config.auth.jwtSecret,
      { expiresIn: config.auth.jwtExpiration },
    );

    return res.send({
      id: user._id,
      username: user.username,
      accessToken: token,
    });
  } catch (error) {
    return next(new ApiError(500, "An error occurred while logging in"));
  }
};