export const up =
    knex =>
      knex.schema.createTable('User', table => {
        table.uuid('id').primary();
        table.string('firstName');
        table.string('lastName');
        table.string('email');
        table.string('password');
      });

export const down =
    knex =>
      knex.schema.dropTableIfExists('User');
