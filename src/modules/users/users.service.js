import Users from "./users.model.js";

export class UsersService {
  async signup(data) {
    return await Users.create(data);
  }

  async findOneUser(id) {
    return await Users.findOne({
      where: {
        id,
        status: true,
      },
    });
  }

  async findUserByEmail(email) {
    return await Users.findOne({
      where: {
        email,
        status: true,
      },
    });
  }

  async updateUser(user, name, email) {
    return await user.update({
      name: name,
      email: email,
    });
  }

  async deleteUser(user) {
    return await user.update({ status: false });
  }
}
