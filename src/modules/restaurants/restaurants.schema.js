import z from "zod";
import { extractValidationData } from "../../common/utils/extractErrorData.js";

const createRestaurantSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name is too short" })
    .max(120, { message: "Name is too long" }),
  address: z
    .string()
    .min(4, { message: "Address is too short" })
    .max(150, { message: "Address is too long" }),
  rating: z.number().max(10).positive(),
});

export const validateCreateRestaurant = (data) => {
  const result = createRestaurantSchema.safeParse(data);

  const {
    hasError,
    errorMessage,
    data: restaurantData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessage,
    restaurantData,
  };
};

export const validatePartialRestaurant = (data) => {
  const result = createRestaurantSchema.partial().safeParse(data);

  const {
    hasError,
    errorMessage,
    data: restaurantData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessage,
    restaurantData,
  };
};
