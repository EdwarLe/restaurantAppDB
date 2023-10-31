import Users  from "./users.model.js";


export class UsersService {
    async signup(data) {
        return await Users.create(data)
    }

    async findUserByEmail(email) {
        return await Users.findOne({
            where:{
                email,
                status: true
            }
        })
    }
}