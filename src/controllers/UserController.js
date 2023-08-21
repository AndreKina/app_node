const { hash } = require("bcrypt")
const knex = require("../database/knex")

const AppError = require("../utils/AppError")

// calls service class and uses it execute method
// Controller does not need to know architecture or business rules => Needs only to control communication interface

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

  async update(req, res) {
    const { name, email, password, old_password } = req.body
    const user_id = req.user.id

    const database = await sqliteConnection()
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [
      user_id,
    ])

    if (!user) {
      throw new AppError("Usuário não encontrado")
    }

    const userWithUpdatedEmail = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    )

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("Este email já está em uso")
    }

    user.name = name ?? user.name
    user.email = email ?? user.email

    if (password && !old_password) {
      throw new AppError(
        "Você precisa informar a senha antiga para alterar a senha nova"
      )
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password)

      if (!checkOldPassword) {
        throw new AppError("A senha antiga não confere")
      }

      user.password = await hash(password, 8)
    }

    await database.run(
      `UPDATE users SET
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME('now')
      WHERE id = ?`,
      [user.name, user.email, user.password, user_id]
    )

    return res.json()
  }
}

module.exports = UserController
