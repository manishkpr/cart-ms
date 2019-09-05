const _ = require('lodash');

// Controllers
const CartController = require('../../../cart-service/src/controllers/CartController');

// Middlewares
// const AuthMiddleware = require('../../../cart-service/src/controllers/middlewares/Auth');

const cartRoutes = {
  getCart: {
    url: '/cart/:id',
    method: 'get',
    versions: {
      'v1.0': CartController.getCart(),
    },
    Auth: null,
  },
};

module.exports = _.assign({}, cartRoutes);
