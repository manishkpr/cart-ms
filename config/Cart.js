const Env = process.env.NODE_ENV;

const AppCart = require('./app/Cart');

const DBCart = require('./db/Cart');

const RouteVersionsCart = require('./versioning/routeVersions/Cart');

const ErrorMessages = require('./shared/errorMessages');

module.exports = {
  App: AppCart[Env] || AppCart.DEFAULT,
  DB: DBCart[Env] || DBCart.DEFAULT,
  RouteVersions: RouteVersionsCart,
  ErrorMessages,
};
