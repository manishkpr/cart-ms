const CloneDeep = require('lodash/cloneDeep');
const Merge = require('lodash/merge');

const defaultConfig = {
  'APP_VERSION_1.0': 'v1.0',
  APP_ENV: 'local',
  APP_PORT: '6482',
  ADMIN_API_KEY: 'w4VoTrll744I7WermiGaeCyJt3IH8DpB',
  LOG_DIR: 'logs-cart',
};

module.exports = {
  DEFAULT: CloneDeep(defaultConfig),
  UNIT_TEST: Merge(CloneDeep(defaultConfig), {
    APP_ENV: 'unit_test',
    LOG_FILE: 'cart-app.local.log',
  }),
  INT_TEST: Merge(CloneDeep(defaultConfig), {
    APP_ENV: 'integration_test',
    LOG_FILE: 'cart-app.local.log',
  }),
  LOCAL: Merge(CloneDeep(defaultConfig), {
    APP_ENV: 'local',
    LOG_FILE: 'cart-app.local.log',
  }),
  NIGHTLY: Merge(CloneDeep(defaultConfig), {
    APP_PORT: '6201',
    APP_ENV: 'nightly',
    LOG_FILE: 'cart-app.nightly.log',
    LOG_DIR: '/var/log/cart',
  }),
  PRE_PRODUCTION: Merge(CloneDeep(defaultConfig), {
    APP_PORT: '6201',
    APP_ENV: 'pre_production',
    ADMIN_API_KEY: '2CbxjY6xrYnxqFPvjHN468drQIfGeucX',
    LOG_FILE: 'cart-app.pre-prod.log',
    LOG_DIR: '/var/log/cart',
  }),
  PRODUCTION: Merge(CloneDeep(defaultConfig), {
    APP_PORT: '6201',
    APP_ENV: 'production',
    ADMIN_API_KEY: 'vfmDeMgdzmEVyzW5AjENYlRSQ2E1BWkg',
    LOG_FILE: 'cart-app.prod.log',
    LOG_DIR: '/var/log/cart',
  }),
};
