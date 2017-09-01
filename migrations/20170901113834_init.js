export const up =
    knex =>
      knex.schema.createTable('user', table => {
        table.uuid('id').notNullable().primary();
        table.string('firstName');
        table.string('lastName');
        table.string('email');
        table.string('password');
      });

export const down =
    knex =>
      knex.schema.dropTableIfExists('user');
