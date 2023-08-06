const { compare } = require("bcrypt")

const knex = require("../database/knex")

const AppError = require("../utils/AppError")

const authUser = async (req, res, next) => {
  const { email, password } = req.body

  const [dbUser] = await knex("users").where({ email })

  if (!dbUser) {
    throw new AppError("Usuário não encontrado!")
  }

  const hashedPassword = dbUser.password

  const isPasswordCorrect = await compare(password, hashedPassword)

  if (!isPasswordCorrect) {
    throw new AppError("Senha ou usuário incorreto!!")
  }

  req.userId = dbUser.id
  next()
}

module.exports = authUser
