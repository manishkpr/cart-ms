const CloneDeep = require('lodash/cloneDeep');
const Merge = require('lodash/merge');

const defaultConfig = {
  PG: {
    HOST: '192.168.99.100',
    PORT: '5432',
    USER: 'cart',
    PASS: 'cart123!',
    DB: 'db_cart',
    MIN: 1,
    MAX: 2,
    IDLE_TIMEOUT_MS: '1000',
    MIGRATION: 'knex_migrations',
    SSL : false
  },
};

module.exports = {
  DEFAULT: CloneDeep(defaultConfig),
  UNIT_TEST: CloneDeep(defaultConfig),
  INT_TEST: CloneDeep(defaultConfig),
  LOCAL: Merge(CloneDeep(defaultConfig), {
    PG: {
      HOST: process.env.DATABASE_HOST,
      PORT: process.env.DATABASE_PORT,
      USER: process.env.DATABASE_USER,
      PASS: process.env.DATABASE_PASS,
      DB: process.env.DATABASE_DB,
    },
  }),
  NIGHTLY: Merge(CloneDeep(defaultConfig), {
    PG: {
      HOST: 'ec2-54-227-251-33.compute-1.amazonaws.com',
      USER: 'waxvfimpmfaoas',
      DB: 'd9lkjurcbl8vfl',
      PASS: '6192090956e2575e9d7f37036a22277914c80a327ec3a7ddfa61c5cccf56d66e',
      MIN: 1,
      MAX: 20,
      IDLE_TIMEOUT_MS: '10000',
      SSL : true
    },
  }),
};
