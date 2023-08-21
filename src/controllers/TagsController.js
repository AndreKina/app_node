const knex = require("../database/knex")

class TagsController {
  async create(req, res) {
    const { note_id, name } = req.body
    const user_id = req.user.id

    const tag = await knex("movie_tags").insert({ note_id, user_id, name }, [
      "id",
      "note_id",
      "user_id",
    ])

    return res.status(200).json(tag)
  }

  async index(req, res) {
    const user_id = req.user.id

    const tags = await knex("movie_tags").wh1ere({ user_id }).limit(20)

    return res.status(200).json(tags)
  }

  async show(req, res) {
    const { name } = req.body
    const user_id = req.user.id

    const tag = await knex("movie_tags")
      .where({ user_id })
      .andWhereLike("name", `%${name}%`)

    return res.status(200).json(tag)
  }
}

module.exports = TagsController
