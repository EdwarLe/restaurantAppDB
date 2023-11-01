import generateJWT from "../../config/plugins/generate-jwt.plugin.js"
import { catchAsync } from "../../errors/index.js"
import { validateCreateRestaurant } from "./restaurants.schema.js"
import { RestaurantsService } from "./restaurants.service.js"

const restaurantsService = new RestaurantsService()


export const findAllRestaurants = catchAsync(async(req, res, next) => {
    const restaurants = await restaurantsService.findAllRestaurants()

    return res.status(201).json(restaurants)
})
export const createRestaurant = catchAsync(async(req, res, next) => {
    const {hasError, errorMessage, restaurantData} = validateCreateRestaurant(req.body)

    if(hasError) {
        return res.status(421).json({
            status: 'error',
            message: errorMessage
        })
    }

    const restaurant = await restaurantsService.createRestaurant(restaurantData)

    const token = await generateJWT(restaurantData.id)

    return res.status(201).json({
        token,
        restaurant
    })
})
export const findOneRestaurant = catchAsync(async(req, res, next) => {
    
    const {restaurant} = req

    const token = await generateJWT(restaurant.id)

    return res.status(201).json({
        token,
        restaurant
    })
})
export const updateRestaurant = catchAsync(async(req, res, next) => {
    const {restaurant} = req

    const {hasError, errorMessage, restaurantData} = validateCreateRestaurant(req.body)

    if(hasError) {
        return res.status(421).json({
            status: 'error',
            message: errorMessage
        })
    }

    const resturantUpdated = await restaurantsService.updateRestaurant(restaurant, restaurantData.name, restaurantData.address)

    return res.status(201).json(resturantUpdated)
})
export const deleteRestaurant = catchAsync(async(req, res, next) => {
    const {restaurant} = req

    await restaurantsService.deleteRestaurant(restaurant)

    return res.status(204).json(null)
})