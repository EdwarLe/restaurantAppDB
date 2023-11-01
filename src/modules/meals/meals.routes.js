import { Router } from "express";
import {
  createMeal,
  deleteMeal,
  findAllMeals,
  findOneMeal,
  updateMeal,
} from "./meals.controller.js";
import { validateExistRestaurant } from "../restaurants/resturants.middleware.js";
import { validateExistMeal } from "./meals.middleware.js";
import { protect, restricTo } from "../users/users.middleware.js";

export const router = Router();

router.get("/", findAllMeals);

router.route("/:id").get(validateExistMeal, findOneMeal);

router.use(protect);

router.post("/:id", restricTo("admin"), validateExistRestaurant, createMeal);
router
  .route("/:id")
  .patch(restricTo("admin"), validateExistMeal, updateMeal)
  .delete(restricTo("admin"), validateExistMeal, deleteMeal);
