import { AppError, catchAsync } from "../../errors/index.js";
import { RestaurantsService } from "./restaurants.service.js";

const restaurantsService = new RestaurantsService()

export const validateExistRestaurant = catchAsync(async(req, res, next) => {
    const {id} = req.params

    const restaurant = await restaurantsService.findOneRestaurant(id)

    if(!restaurant) {
        return next(new AppError(`Restaurant with id: ${id} not found, please insert a correct id`))
    }

    req.restaurant = restaurant
    next()
})