import Users from "../../modules/users/users.model.js"
import Restaurants from "../../modules/restaurants/restaurants.model.js";
import Reviews from "../../modules/reviews/reviews.model.js";

export const initModel = () => {
    Users.hasMany(Reviews, {foreignKey: 'user_id', as: 'userHasReviews'})
    Reviews.belongsTo(Users, {foreignKey: 'user_id', as: 'reviewFromUser'})

    Restaurants.hasMany(Reviews, {foreignKey: 'restaurant_id', as: 'restaurantHasReviews'})
    Reviews.belongsTo(Restaurants, {foreignKey: 'restaurant_id', as: 'reviewsToRestaurant'})
}