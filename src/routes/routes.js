import { Router } from "express";
import { router as routeUsers } from "../modules/users/users.routes.js";
import { router as routeRestaurants} from '../modules/restaurants/restaurants.routes.js'

export const router = Router()

router.use('/users', routeUsers)
router.use('/restaurants', routeRestaurants)
