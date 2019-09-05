// Services
const ErrorService = require('../../services/ErrorService').default;

// Config
const Config = require('../../../../config/Cart');

module.exports = {
  checkAdmin: async (ctx, next) => {
    if (!ctx.headers['x-auth-admin'] || ctx.headers['x-auth-admin'] !== Config.App.ADMIN_API_KEY) {
      throw new ErrorService.ForbiddenError();
    }

    await next();
  },
};
