/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
  return knex.schema.createTable("movie_notes", (table) => {
    table.increments("id")
    table.text("title")
    table.text("description")

    table.integer("rating").checkBetween([1, 5])

    table
      .integer("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  knex.schema.dropTable("movie_notes")
}
