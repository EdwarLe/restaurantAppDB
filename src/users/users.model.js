import { DataTypes } from "sequelize"
import sequelize from "../config/database/database.js"

const Users = sequelize.define('users',{
    userId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        field: 'user_id',
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    role: {
        type: DataTypes.ENUM('normal', 'admin'),
        allowNull: false,
        defaultValue: 'normal'
    }

})

export default Users