const knex = require("../database/knex")

class NotesController {
  async create(req, res) {
    const { title, description, rating } = req.body
    const user_id = req.user.id

    const note = await knex("movie_notes").insert(
      { title, description, rating, user_id },
      ["id", "title", "description", "rating"]
    )

    return res.status(200).json(note)
  }

  async index(req, res) {
    const user_id = req.user.id

    const notes = await knex("movie_notes").where({ user_id }).limit(20)
    return res.status(200).json(notes)
  }

  async show(req, res) {
    const { title } = req.body
    const user_id = req.user.id

    const notes = await knex("movie_notes")
      .where({ user_id })
      .andWhereLike("title", `%${title}%`)

    return res.status(200).json(notes)
  }
}

module.exports = NotesController
