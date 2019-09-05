/* eslint-disable no-param-reassign */
/* eslint-disable no-prototype-builtins */
function mask(unmasked) {
  return unmasked.length >= 3 ? `XXXXX${unmasked.substring(unmasked.length - 3, unmasked.length)}` : 'XXXXX';
}

function filterKeys(keys, list, configObj) {
  Object.keys(configObj[keys]).forEach((key) => {
    if (list[keys] && typeof list[keys][key] !== 'object') {
      if (!list[keys].hasOwnProperty(key)) {
        delete configObj[keys][key];
      } else if (list[keys][key]) {
        configObj[keys][key] = mask(configObj[keys][key]);
      }
    }

    if (list[keys] && typeof list[keys][key] === 'object') {
      filterKeys(key, list[keys], configObj[keys]);
    }
  });
}

// WHITELISTED_KEYS (Key : value) key - whitelisted key , value - masked/unmasked
module.exports = {
  WHITELISTED_KEYS_CART: {
    App: {
      'APP_VERSION_1.0': false,
      'APP_VERSION_1.1': false,
      APP_ENV: false,
      APP_PORT: false,
      ADMIN_API_KEY: true,
      LOG_DIR: false,
    },
    DB: {
      PG: {
        HOST: false,
        PORT: false,
        USER: false,
        PASS: true,
        DB: false,
        MIN: false,
        MAX: false,
        IDLE_TIMEOUT_MS: false,
      },
      REDIS: {
        HOST: false,
        PORT: false,
      },
    },
    AWS: {
      CloudFront: {
        DISTRIBUTION_ID: false,
        DOMAIN_NAME: false,
        ALTERNATE_DOMAIN_NAME: false,
      },
    },
    Newrelic: {
      APP_NAME: false,
      LOGGING_LEVEL: false,
      RECORD_SQL: false,
      EXPLAIN_THRESHOLD: false,
      SLOW_SQL: false,
      LICENSE_KEY: true,
    },
  },

  WHITELISTED_KEYS_SEARCH: {
    App: {
      'APP_VERSION_1.0': false,
      APP_ENV: false,
      APP_PORT: false,
      PER_PAGE_LIMIT: false,
      LOG_DIR: false,
      ADMIN_API_KEY: true,
    },
    DB: {
      ES: {
        HOST: false,
        PORT: false,
        INDEX: false,
      },
    },
  },

  filter: (list, configObj) => {
    Object.keys(configObj).forEach((keys) => {
      if (list[keys]) {
        filterKeys(keys, list, configObj);
      } else {
        delete configObj[keys];
      }
    });
    return configObj;
  },
};
