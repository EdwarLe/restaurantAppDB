import { Router } from "express";
import {
  deleteUser,
  findOneOrder,
  findOrders,
  login,
  signup,
  updateUser,
} from "./users.controller.js";
import { protect, protectAccount, validateExistUser } from "./users.middleware.js";
import { validateExistOrder } from "../orders/order.middleware.js";

export const router = Router();

router.post("/signup", signup);
router.post("/login", login);

router.use(protect);

router.get("/orders", findOrders);

router.get('/orders/:id', validateExistOrder, findOneOrder)
router.patch("/:id", validateExistUser, protectAccount,  updateUser);
router.delete("/:id", validateExistUser, protectAccount, deleteUser);
