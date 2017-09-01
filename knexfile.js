module.exports = {
  dev: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './dev.db',
    },
    seeds: {
      directory: './seeds/dev',
    },
  },
  int: {
    client: 'postgresql',
    connection: {
      database: 'koa-int',
    },
    seeds: {
      directory: './seeds/int',
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
  prod: {
    client: 'postgresql',
    seeds: {
      directory: './seeds/prod',
    },
    connection: {
      database: 'koa-prod',
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};