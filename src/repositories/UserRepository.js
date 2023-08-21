const knex = require("../database/knex")

class UserRepository {
  async findByEmail(email) {
    const [user] = await knex("user").where({ email })

    return user
  }
}

module.exports = UserRepository
