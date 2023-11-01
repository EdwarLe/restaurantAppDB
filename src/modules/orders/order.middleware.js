import { AppError, catchAsync } from "../../errors/index.js";
import { OrdersService } from "./orders.service.js";


const ordersService = new OrdersService()

export const validateExistOrder = catchAsync(async(req, res, next) => {
    const {id} = req.params

    const order = await ordersService.findOneOrder(id)

    if(!order) {
        return next(new AppError(`Order with id ${id}, was not found`, 401))
    }

    req.order = order
    next()
})