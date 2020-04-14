
exports.up = function(knex) {
  return knex.schema.createTable("cars", tbl => {
      tbl.increments('VIN')
      tbl.decimal("make").notNullable().index()
      tbl.string("model").notNullable().index()
      tbl.integer("mileage").notNullable().index()
      tbl.string("transmission").defaultTo(null)
      tbl.string("title").defaultTo(null)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("cars")
};
