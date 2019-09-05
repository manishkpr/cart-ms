const CloneDeep = require('lodash/cloneDeep');

// Utilities
const version = require('../../../utilities/Version');
const ConfigUtils = require('../../../utilities/ConfigUtils');

module.exports = {
  getVersion: async (ctx) => {
    const info = await version.getVersion();

    ctx.json({ data: info });
  },

  getConfigs: async (ctx) => {
    const info = {};
    let configs;
    let whiteListedKeys;

    if (process.env.APP_CONTEXT === 'Cart') {
      // eslint-disable-next-line
      configs = require('../../../config/Cart');
      whiteListedKeys = ConfigUtils.WHITELISTED_KEYS_CART;
    }

    info.configs = ConfigUtils.filter(whiteListedKeys, CloneDeep(configs));

    ctx.json({ data: info });
  },
};
