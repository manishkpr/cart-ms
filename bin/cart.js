require('dotenv').config();

process.env.APP_CONTEXT = 'Cart';

// Routes
const routes = require('../cart-service/src/routes/routes');
const commonRoutes = require('../common/routes/CommonRoutes');

// Libraries
const Koa = require('koa');
const KoaBody = require('koa-body');
const Uuid = require('uuid');
const Etag = require('etag');

// Configurations
const Config = require('../config/Cart');

// Utilties
const ApiError = require('../utilities/ApiError');

const app = new Koa();
const genericErrorMsg = Config.ErrorMessages.GENERIC_ERROR_MSG;

// For dynamically changing the environment during TestSpec Execution.
const isProduction = () => Config.App.APP_ENV === 'production';
const isNotAdmin = ctx => ctx.headers['x-auth-admin'] !== Config.App.ADMIN_API_KEY;

// middleware
app.use(KoaBody());

// CORS setting middleware
app.use(async (ctx, next) => {
  if (ctx.method === 'OPTIONS') {
    if (!ctx.get('Access-Control-Request-Method')) {
      // this not preflight request, ignore it
      await next();
    }

    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Credentials', 'true');
    ctx.set('Access-Control-Allow-Methods', 'GET');
    ctx.set('Access-Control-Allow-Headers', 'content-type');
    ctx.status = 204;
  } else {
    // Simple Cross-Origin Request, Actual Request, and Redirects
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Credentials', 'true');
    ctx.set('Vary', 'Origin');
    await next();
  }
});

// JSON helper
app.use(async (ctx, next) => {
  ctx.json = (body, code) => {
    let httpCode = code;

    ctx.body = body || { data: [] };
    ctx.body.meta = {
      requestId: ctx.state.requestId,
      timestamp: +new Date(),
    };

    if (ctx.body && ctx.body.data) {
      const eTag = Etag(JSON.stringify(ctx.body.data));

      const requestETag = ctx.req.headers['if-none-match'];
      if (requestETag === eTag) {
        httpCode = 304;
      } else {
        // Set ETag
        ctx.set('ETag', eTag);
      }
    }

    ctx.type = 'application/json;charset=utf-8';
    ctx.status = httpCode || 200;

  };

  await next();
});

// if not application/json
app.use(async (ctx, next) => {
  const allowedMethods = ['PUT', 'PATCH', 'POST', 'DELETE'];

  if (allowedMethods.indexOf(ctx.request.method) > -1 && ctx.request.headers['content-type'] && ctx.request.headers['content-type'].toLowerCase().indexOf('application/json') === -1) {
    throw new ApiError('Content-Type must be application/json', 406, 0);
  }

  await next();
});

// Error & Logging
app.use(async (ctx, next) => {
  ctx.state.requestId = Uuid.v4();

  try {
    await next();
  } catch (err) {
    const clientError = {
      ...err,
      message: isProduction() && isNotAdmin(ctx) ? genericErrorMsg : err.message,
      trace: isProduction() ? null : err.stack,
    };

    ctx.status = err.status || err.statusCode || 500;
    ctx.body = {
      error: clientError,
      meta: {
        requestId: ctx.state.requestId,
        now: +new Date(),
      },
    };

  }
});

app.use(routes.routes());
app.use(commonRoutes.routes());

// listen
app.listen(Number(Config.App.APP_PORT), () => {
  console.log(`Cart Service started on port ${Config.App.APP_PORT}`);
});
