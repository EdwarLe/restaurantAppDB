import { Router } from "express";
import {
  createRestaurant,
  deleteRestaurant,
  findAllRestaurants,
  findOneRestaurant,
  updateRestaurant,
} from "./restaurants.controller.js";
import { validateExistRestaurant } from "./resturants.middleware.js";
import { protect, restricTo } from "../users/users.middleware.js";
import {
  createReviewToRestaurant,
  deleteReview,
  updateReview,
} from "../reviews/reviews.controller.js";
import {
  validateExistReview,
  validateRestaurantToReview,
} from "../reviews/reviews.middleware.js";

export const router = Router();

router.route("/").get(findAllRestaurants);
router.route("/:id").get(validateExistRestaurant, findOneRestaurant);

router.use(protect);

router.route("/").post(restricTo("admin"), createRestaurant);

router
  .route("/:id")
  .patch(restricTo("admin"), validateExistRestaurant, updateRestaurant)
  .delete(restricTo("admin"), validateExistRestaurant, deleteRestaurant);

router.post("/reviews/:id", createReviewToRestaurant);

router
  .route("/reviews/:restaurantId/:id")
  .patch(validateRestaurantToReview, validateExistReview, updateReview)
  .delete(validateRestaurantToReview, validateExistReview, deleteReview);
