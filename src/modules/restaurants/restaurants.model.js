import { DataTypes } from "sequelize";
import sequelize from "../../config/database/database.js";

const Restaurants = sequelize.define("restaurants", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    field: "restaurant_id",
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  status: {
    type: DataTypes.ENUM("active", "inactive"),
    allowNull: false,
    defaultValue: "active",
  },
});

export default Restaurants;
