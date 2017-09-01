module.exports = {
  dev: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './dev.db',
    },
  },
  int: {
    client: 'postgresql',
    connection: {
      database: 'koa-int',
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
  prod: {
    client: 'postgresql',
    connection: {
      database: 'koa-prod',
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};