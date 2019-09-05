// Libraries
const Router = require('koa-router');

// VersionManager
const VersionManager = require('../../../utilities/VersionManager');

// VersionMapping
const routeDefinitions = require('../../../config/versioning/routeDefinitions/Cart');
const routeVersions = require('../../../config/versioning/routeVersions/Cart');

const router = new Router();

VersionManager.initializeRoutes(routeDefinitions, routeVersions, router);

module.exports = router;
