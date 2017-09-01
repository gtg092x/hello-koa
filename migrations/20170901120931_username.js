export const up =
  knex =>
    knex.schema.alterTable('user', table => {
      table.string('username').unique();
    });

export const down =
  knex =>
    knex.schema.alterTable('user', table => {
      table.dropColumn('username');
    });
