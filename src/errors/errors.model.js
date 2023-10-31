import { DataTypes } from "sequelize";
import sequelize from "../config/database/database.js";

const Error = sequelize.define('errors', {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },

    status: {
        allowNull: false,
        type: DataTypes.STRING(10)
    },

    message: {
        allowNull: false,
        type: DataTypes.TEXT
    },

    stack: {
        allowNull: false,
        type: DataTypes.TEXT
    }
})

export default Error