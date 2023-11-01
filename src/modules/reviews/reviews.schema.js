import z from "zod";
import { extractValidationData } from "../../common/utils/extractErrorData.js";

const reviewSchema = z.object({
  comment: z.string().min(4).max(500),
  rating: z.number().max(10).positive(),
});

export const validateReview = (data) => {
  const result = reviewSchema.safeParse(data);

  const {
    hasError,
    errorMessage,
    data: reviewData,
  } = extractValidationData(result);

  return { hasError, errorMessage, reviewData };
};
