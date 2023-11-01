import { AppError, catchAsync } from "../../errors/index.js";
import { RestaurantsService } from "../restaurants/restaurants.service.js";
import { ReviewsService } from "./reviews.service.js";

const reviewsService = new ReviewsService();
const restaurantsService = new RestaurantsService();

export const validateExistReview = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const review = await reviewsService.findOneReview(id);

  if (!review) {
    return next(new AppError(`Review with id: ${id}, was not found`));
  }

  req.review = review;
  next();
});

export const validateRestaurantToReview = catchAsync(async (req, res, next) => {
  const { restaurantId } = req.params;

  const restaurant = await restaurantsService.findOneRestaurant(restaurantId);

  if (!restaurant) {
    return next(
      new AppError(`Restaurant with id: ${restaurantId}, was not found`)
    );
  }

  req.restaurant = restaurant;
  next();
});
