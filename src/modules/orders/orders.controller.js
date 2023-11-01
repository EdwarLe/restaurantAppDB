import { totalPrice } from "../../common/utils/totalPrice.js"
import { AppError, catchAsync } from "../../errors/index.js"
import { mealsService } from "../meals/meals.controller.js"
import { validateOrder } from "./order.schema.js"
import { OrdersService } from "./orders.service.js"

export const ordersService = new OrdersService()

export const CreateOrder = catchAsync(async(req, res, next) => {

    const {sessionUser} = req

    const {hasError, errorMessage, orderData} = validateOrder(req.body)

    if(hasError) {
        return res.status(421).json({
            status: 'error',
            message: errorMessage
        })
    }

    const meal = await mealsService.findOneMeal(orderData.mealId)

    if(!meal) {
        return next(new AppError(`Meal with id: ${orderData.mealId} was not found`, 401))
    }

    orderData.totalPrice = totalPrice(orderData.quantity, meal.price)


    const order = await ordersService.createOrder({...orderData, userId: sessionUser.id})


    return res.status(201).json(order)
})
export const findAllOrders = catchAsync(async(req, res, next) => {
    const {sessionUser} = req
    const meals = await ordersService.findAllOrders(sessionUser.id)

    // if(!meals) {
    //     return next(new AppError('Sorry you don´t have orders yet'), 401)
    // }

    return res.status(201).json(meals)
})
export const updateOrder = catchAsync(async(req, res, next) => {
    
    const {order} = req
    const {sessionUser} = req

    if(order.userId !== sessionUser.id) {
        return next(new AppError('Sorry you don´t have permission to perform this action'), 401)
      }

    await ordersService.updateOrder(order)

    return res.status(201).json({
        message: 'Order has completed successfully'
    })
})
export const deteleOrder = catchAsync(async(req, res, next) => {
    const {order} = req
    const {sessionUser} = req

    if(order.userId !== sessionUser.id) {
        return next(new AppError('Sorry you don´t have permission to perform this action'), 401)
      }


    await ordersService.deleteOrder(order)

    return res.status(201).json(null)
})