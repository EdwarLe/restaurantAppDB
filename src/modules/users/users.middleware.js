import { AppError, catchAsync } from "../../errors/index.js";
import { UsersService } from "./users.service.js";
import { promisify } from "util";
import jwt from "jsonwebtoken";
import { envs } from "../../config/environments/environments.js";

const userService = new UsersService();

export const validateExistUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await userService.findOneUser(id);

  console.log(!user);
  if (!user) {
    return next(
      new AppError(`User with id: ${id} not found, please insert a correct id`)
    );
  }

  req.user = user;
  next();
});

export const protect = catchAsync(async (req, res, next) => {
  let token;
  const auth = req.headers.authorization;

  if (auth && auth.startsWith("Bearer")) {
    token = auth.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in!, Please log in to get access", 401)
    );
  }

  const decoded = await promisify(jwt.verify)(token, envs.SECRET_JWT_SEED);

  const user = await userService.findOneUser(decoded.id);

  if (!user) {
    return next(
      new AppError("The owner of this token is not longer available", 401)
    );
  }

  req.sessionUser = user;
  next();
});

export const restricTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.sessionUser.role)) {
      return next(
        new AppError("You don´t have permission to perform this action", 403)
      );
    }
    next();
  };
};

export const protectAccount = (req, res, next) => {
    const {user, sessionUser} = req

    if(user.id !== sessionUser.id) {
        return next(new AppError('You do not own this account', 401))
    }
    next()
};
