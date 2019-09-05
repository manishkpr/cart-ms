const Logger = require('./Logger');
const CloneDeep = require('lodash/cloneDeep');

module.exports = {
  log: (ctx, error) => {
    const logEntry = {
      headers: ctx.request.headers,
      url: ctx.request.url,
      method: ctx.request.method,
      status: ctx.response.status,
      responseHeaders: ctx.response.header,
    };

    if (ctx.request.body && Object.keys(ctx.request.body).length > 0) {
      logEntry.body = ctx.request.body;
    }
    if (ctx.response.body && Object.keys(ctx.response.body).length > 0) {
      logEntry.response = CloneDeep(ctx.response.body);
    }

    if (error) {
      logEntry.response.error = error;
    }
    Logger.info(ctx.state.requestId, logEntry);
  },
};
