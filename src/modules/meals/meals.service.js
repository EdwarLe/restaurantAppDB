import Restaurants from "../restaurants/restaurants.model.js";
import Meals from "./meals.model.js";

export class MealsService {
  async createMeal(data) {
    return await Meals.create(data);
  }

  async findAllMeals() {
    return await Meals.findAll({
      where: {
        status: true,
      },
      include: [
        {
            model: Restaurants,
            as: 'mealsFromRestaurant'
        }
      ]
    });
  }
  async findOneMeal(id) {
    return await Meals.findOne({
      where: {
        id,
        status: true,
      },
      include: [
        {
            model: Restaurants,
            as: 'mealsFromRestaurant'
        }
      ]
    });
  }

  async updateMeal(meal, data) {
    return await meal.update(data)
  }

  async deleteMeal(meal) {
    return await meal.update({status: false})
  }
}
