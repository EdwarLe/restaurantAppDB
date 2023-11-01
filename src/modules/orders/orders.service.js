import Meals from "../meals/meals.model.js";
import Restaurants from "../restaurants/restaurants.model.js";
import Orders from "./orders.model.js";

export class OrdersService {
  async findOneOrder(id) {
    return await Orders.findOne({
      where: {
        id,
        status: "active",
      },
      include: [
        {
          model: Meals,
          as: "orderFromMeal",
          include: [
            {
              model: Restaurants,
              as: "mealsFromRestaurant",
            },
          ],
        },
      ],
    });
  }

  async createOrder(data) {
    return await Orders.create(data);
  }

  async findAllOrders(userId) {
    return await Orders.findAll({
      where: {
        userId,
        status: "active",
      },
      include: [
        {
          model: Meals,
          as: "orderFromMeal",
          include: [
            {
              model: Restaurants,
              as: "mealsFromRestaurant",
            },
          ],
        },
      ],
    });
  }

  async updateOrder(order) {
    return await order.update({ status: "completed" });
  }

  async deleteOrder(order) {
    return await order.update({ status: "cancelled" });
  }
}
