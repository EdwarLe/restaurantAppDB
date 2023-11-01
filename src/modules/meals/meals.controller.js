import { catchAsync } from "../../errors/index.js"
import { validateExistMeal } from "./meals.middleware.js"
import {  validateMeal } from "./meals.schema.js"
import { MealsService } from "./meals.service.js"

export const mealsService = new MealsService()

export const findAllMeals = catchAsync(async(req, res,next) =>  {
    const meals = await mealsService.findAllMeals()

    return res.status(201).json(meals)
})
export const createMeal = catchAsync(async(req, res,next) => {
    const {restaurant} = req
    const {hasError, errorMessage, mealData} = validateMeal(req.body)

    if(hasError) {
        return res.status(421).json({
            status: 'error',
            message: errorMessage
        })
    }

    const meal = await mealsService.createMeal({name: mealData.name, price: mealData.price , restaurantId: restaurant.id})

    return res.status(201).json(meal)
})
export const findOneMeal = catchAsync(async(req, res,next) => {
    const {meal} = req

    return res.status(201).json(meal)

})
export const updateMeal = catchAsync(async(req, res,next) => {
    const {meal} = req
    const {hasError, errorMessage, mealData} = validateMeal(req.body)

    if(hasError) {
        return res.status(421).json({
            status: 'error',
            message: errorMessage
        })
    }

    const mealUpdated = await mealsService.updateMeal(meal, mealData)

    return res.status(201).json(mealUpdated)
})
export const deleteMeal = catchAsync(async(req, res,next) => {
    const {meal} = req

    await mealsService.deleteMeal(meal)

    return res.status(201).json(null)
})