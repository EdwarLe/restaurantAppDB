import { Router } from "express";
import {
  CreateOrder,
  deteleOrder,
  findAllOrders,
  updateOrder,
} from "./orders.controller.js";
import { protect } from "../users/users.middleware.js";
import { validateExistOrder } from "./order.middleware.js";

export const router = Router();

router.use(protect);

router.post("/", CreateOrder);

router.get("/me", findAllOrders);

router.route("/:id")
.patch(validateExistOrder, updateOrder)
.delete(validateExistOrder, deteleOrder);
