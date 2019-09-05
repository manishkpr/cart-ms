const Knex = require('knex');

// Configuration
const Config = require('../../../config/Cart');

const options = {
  client: 'pg',
  connection: {
    host: Config.DB.PG.HOST,
    port: Config.DB.PG.PORT,
    user: Config.DB.PG.USER,
    password: Config.DB.PG.PASS,
    database: Config.DB.PG.DB,
    idleTimeoutMillis: Config.DB.PG.IDLE_TIMEOUT_MS || 5000,
    ssl: Config.DB.PG.SSL
  },
  pool: { min: Config.DB.PG.MIN || 1, max: Config.DB.PG.MAX || 50 },
  migrations: {
    tableName: Config.DB.PG.DB_MIGRATION,
  },
};

const client = Knex(options);

module.exports = client;
