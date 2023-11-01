import Restaurants from "./restaurants.model.js";


export class RestaurantsService {
    async createRestaurant(data) {
        return await Restaurants.create(data)
    }

    async findAllRestaurants() {
        return await Restaurants.findAll({
            where: {
                status: 'active'
            }
        })
    }

    async findOneRestaurant(id) {
        return await Restaurants.findOne({
            where: {
                id,
                status: 'active'
            }
        })
    }

    async updateRestaurant(restaurant, name, address) {
        return await restaurant.update({
            name,
            address
        })
    }

    async deleteRestaurant(restaurant) {
        return await restaurant.update({status: 'inactive'})
    }
}