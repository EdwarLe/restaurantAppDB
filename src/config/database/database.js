import { Sequelize } from "sequelize";
import { envs } from "../environments/environments.js";

const sequelize = new Sequelize(envs.DB_URI, {
  logging: false,
});

export const authenticate = async() => {
    try {
        await sequelize.authenticate()
        console.log("Connection established successfully 👌")
    } catch (error) {
        throw new Error('Error al autenticar', error)
    }
}

export const syncUp = async() => {
    try {
        await sequelize.sync()
        console.log("Connection synced succesfully ✌️")
    } catch (error) {
        throw new Error('Error al sincronizar', error)
    }
}

export default sequelize