import { DataTypes } from "sequelize";
import sequelize from "../../config/database/database.js";

const Orders = sequelize.define('orders', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        field: 'order_id'
    },

    mealId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'meal_id'
    },

    userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'user_id'
    },

    totalPrice: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'total_price'
    },

    quantity: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },

    status: {
        allowNull: false,
        type: DataTypes.ENUM('active', 'cancelled', 'completed'),
        defaultValue: 'active'
    }
})

export default Orders