import { envs } from "../config/environments/environments.js";
import Error from "./errors.model.js";
import { AppError } from "./index.js";

const handleJsonWebTokenError = () =>
  new AppError("Invalid token! Please login again", 401);

const handleJWTExpiredError = () =>
  new AppError("Your token has expired! Please login again", 401);

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

const sendErrorProd = async (err, res) => {
  await Error.create({
    status: err.status,
    message: err.message,
    stack: err.stack,
  });

  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.log("Error 💣", err);
    res.status(500).json({
      status: "fail",
      message: "Internal Server Error",
    });
  }
};

export const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "fail";

  if (envs.NODE_ENV === "development") {
    sendErrorDev(err, res);
  }

  if (envs.NODE_ENV === "production") {
    let error = err;

    if (err.name === "TokenExpiredError") error = handleJWTExpiredError();
    if (err.name === "JsonWebTokenError") error = handleJsonWebTokenError();

    sendErrorProd(error, res);
  }
};
