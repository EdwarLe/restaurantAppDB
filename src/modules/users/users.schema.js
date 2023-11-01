import z from "zod";
import { extractValidationData } from "../../common/utils/extractErrorData.js";

const resgisterSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name is too short" })
    .max(120, { message: "Name is too long" }),
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(8, { message: "Password is too short" })
    .max(20, { message: "Password is too long" }),
});

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(8, { message: "Password is to short" })
    .max(20, { message: "Password is too long" }),
});

export const validateRegister = (data) => {
  const result = resgisterSchema.safeParse(data);

  const {
    hasError,
    errorMessage,
    data: registerData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessage,
    registerData,
  };
};

export const validatePartialUser = (data) => {
  const result = resgisterSchema.partial().safeParse(data);

  const {
    hasError,
    errorMessage,
    data: registerData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessage,
    registerData,
  };
};

export const validateLogin = (data) => {
  const result = loginSchema.safeParse(data);

  const {
    hasError,
    errorMessage,
    data: loginData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessage,
    loginData,
  };
};
