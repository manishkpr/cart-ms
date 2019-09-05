// Libraries
const Router = require('koa-router');

const SystemInfoController = require('../src/controllers/SystemInfoController.js');

// Middlewares
const AuthMiddleware = (process.env.APP_CONTEXT === 'Cart') ?
  require('../../cart-service/src/controllers/middlewares/Auth') : null;

const router = new Router();

// Health Check
router.get('/', async (ctx) => {
  ctx.json({ data: 'Ok!' });
});

/**
 * Version
 */
router.get('/version', SystemInfoController.getVersion);
/**
 * configurations
 */
router.get('/configs', AuthMiddleware.checkAdmin, SystemInfoController.getConfigs);

module.exports = router;
