import { AppError, catchAsync } from "../../errors/index.js";
import { validateReview } from "./reviews.schema.js";
import { ReviewsService } from "./reviews.service.js";

const reviewsService = new ReviewsService();

export const createReviewToRestaurant = catchAsync(async (req, res, next) => {
  const { hasError, errorMessage, reviewData } = validateReview(req.body);

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessage,
    });
  }

  const { comment, rating } = reviewData;
  const { id } = req.params;
  const { sessionUser } = req;

  const review = await reviewsService.createReview({
    comment,
    rating,
    restaurantId: id,
    userId: sessionUser.id,
  });

  return res.status(201).json(review);
});

export const updateReview = catchAsync(async (req, res, next) => {
  const { review } = req;
  const { restaurant } = req;
  const { sessionUser } = req;

  if (sessionUser.id !== review.userId) {
    return next(
      new AppError("You don´t have permission to make this changes", 401)
    );
  }

  const { hasError, errorMessage, reviewData } = validateReview(req.body);
  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessage,
    });
  }

  if (review.restaurant_id !== restaurant.id) {
    return next(
      new AppError(
        "Restaurant and comment not match, please try again with the correct id´s",
        401
      )
    );
  }

  const reviewUpdated = await reviewsService.updateReview(review, reviewData);

  return res.status(201).json(reviewUpdated);
});

export const deleteReview = catchAsync(async (req, res, next) => {
  const { review } = req;
  const { restaurant } = req;
  const { sessionUser } = req;

  if (sessionUser.id !== review.userId) {
    return next(
      new AppError("You don´t have permission to make this changes", 401)
    );
  }

  if (review.restaurant_id !== restaurant.id) {
    return next(
      new AppError(
        "Restaurant and review not match, please try again with the correct id´s",
        401
      )
    );
  }

  await reviewsService.deleteReview(review);

  return res.status(200).json(null);
});
