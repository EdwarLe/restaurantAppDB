import Users from "../../modules/users/users.model.js"
import Restaurants from "../../modules/restaurants/restaurants.model.js";
import Reviews from "../../modules/reviews/reviews.model.js";
import Orders from "../../modules/orders/orders.model.js";
import Meals from "../../modules/meals/meals.model.js";

export const initModel = () => {
    Users.hasMany(Reviews, {foreignKey: 'user_id', as: 'userHasReviews'})
    Reviews.belongsTo(Users, {foreignKey: 'user_id', as: 'reviewFromUser'})

    Users.hasMany(Orders, {foreignKey: 'user_id', as: 'userHasOrders'})
    Orders.belongsTo(Users, {foreignKey: 'user_id', as: 'orderFromUser'})

    Restaurants.hasMany(Reviews, {foreignKey: 'restaurant_id', as: 'restaurantHasReviews'})
    Reviews.belongsTo(Restaurants, {foreignKey: 'restaurant_id', as: 'reviewsToRestaurant'})

    Restaurants.hasMany(Meals, {foreignKey: 'restaurant_id', as: 'restaurantHasMeals'})
    Meals.belongsTo(Restaurants, {foreignKey: 'restaurant_id', as: 'mealsFromRestaurant'})

    Meals.hasOne(Orders, {foreignKey: 'meal_id', as: 'mealsHasOrder'})
    Orders.belongsTo(Meals, {foreignKey: 'meal_id', as: 'orderFromMeal'})
}