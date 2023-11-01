import { verifyPassword } from "../../config/plugins/encripted-passwords.plugin.js";
import generateJWT from "../../config/plugins/generate-jwt.plugin.js";
import { AppError, catchAsync } from "../../errors/index.js";
import { ordersService } from "../orders/orders.controller.js";
import {
  validateLogin,
  validatePartialUser,
  validateRegister,
} from "./users.schema.js";
import { UsersService } from "./users.service.js";

const userService = new UsersService();

export const signup = catchAsync(async (req, res, next) => {
  const { hasError, errorMessage, registerData } = validateRegister(req.body);

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessage,
    });
  }

  const user = await userService.signup(registerData);

  const token = await generateJWT(user.id);
  return res.status(201).json({
    token,
    user: {
      id: user.userId,
      name: user.name,
      email: user.email,
    },
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { hasError, errorMessage, loginData } = validateLogin(req.body);

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessage,
    });
  }

  const user = await userService.findUserByEmail(loginData.email);

  if (!user) {
    return next(new AppError("This account does not exist", 404));
  }

  const isCorrectPassword = await verifyPassword(
    loginData.password,
    user.password
  );

  if (!isCorrectPassword) {
    return next(new AppError("Incorrect email or password", 401));
  }

  const token = await generateJWT(user.id);
  return res.status(200).json({
    token,
    user: {
      id: user.userId,
      name: user.name,
      email: user.email,
    },
  });
});

export const updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { hasError, errorMessage, registerData } = validatePartialUser(
    req.body
  );

  if (hasError) {
    return res.status(421).json({
      status: "error",
      message: errorMessage,
    });
  }

  const userUpdated = await userService.updateUser(
    user,
    registerData.name,
    registerData.email
  );

  return res.status(201).json(userUpdated);
});

export const deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await userService.deleteUser(user);

  return res.status(201).json(null);
});

export const findOrders = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const orders = await ordersService.findAllOrders(sessionUser.id);

  return res.status(201).json(orders);
});

export const findOneOrder = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { order } = req;

  const orderByUser = await ordersService.findOneOrder(order.id);

  if (order.userId !== sessionUser.id) {
    return next(
      new AppError("Sorry you don´t have permission to perform this action"),
      401
    );
  }

  return res.status(201).json(orderByUser);
});
