exports.up = (knex) => {
  return knex.schema.createTable("users", (table) => {
    table.increments("id", { primaryKey: true })
    table.text("name")
    table.text("email")
    table.text("password")
    table.text("avatar")

    table.timestamp("created_at").defaultTo(knex.fn.now())
    table.timestamp("updated_at").defaultTo(knex.fn.now())
  })
}

exports.down = function (knex) {
  knex.schema.dropTable("users")
}
