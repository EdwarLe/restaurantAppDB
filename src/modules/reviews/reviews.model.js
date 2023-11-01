import { DataTypes } from 'sequelize';
import sequelize  from "../../config/database/database.js"

const Reviews = sequelize.define('reviews', {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id'
  },

  comment: {
    type: DataTypes.TEXT,
    allowNull: false
  },

  restaurantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'restaurant_id'
  },

  rating: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  status: {
    type: DataTypes.ENUM("active", "deleted"),
    allowNull: false,
    defaultValue: "active"
  }
});

export default Reviews;