const { hash } = require("bcrypt")
const knex = require("../database/knex")

const AppError = require("../utils/AppError")

class UserController {
  async create(req, res) {
    const { name, email, password, avatar } = req.body

    const [isEmailInUse] = await knex("users").where({ email })

    if (isEmailInUse) {
      throw new AppError("Este email já está em uso!!")
    }

    const hashPassword = await hash(password, 8)

    const user = await knex("users").insert(
      { name, email, password: hashPassword, avatar },
      ["id", "name", "email", "avatar"]
    )

    return res.status(200).json(user)
  }
}

module.exports = UserController
