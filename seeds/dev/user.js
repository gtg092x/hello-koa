import uuid from 'uuid/v4';
const USER = 'user';

export const seed = async knex => {
  await knex(USER).del();
  return knex(USER).insert([
    {id: uuid(), username: 'gtg092x', password: 'drake7', email: 'gtg092x@gmail.com'},
  ]);
};
