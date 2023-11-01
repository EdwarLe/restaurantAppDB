import { Router } from "express";
import { router as routeUsers } from "../modules/users/users.routes.js";
import { router as routeRestaurants} from '../modules/restaurants/restaurants.routes.js'
import {router as routeMeals} from '../modules/meals/meals.routes.js'
import {router as routeOrders} from '../modules/orders/order.routes.js'

export const router = Router()

router.use('/users', routeUsers)
router.use('/restaurants', routeRestaurants)
router.use('/meals', routeMeals)
router.use('/orders', routeOrders)
