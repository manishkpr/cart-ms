const Validator = require('validator');

// Dao
const CartDao = require('../dao/CartDao');

// Services
const ErrorService = require('../services/ErrorService');

module.exports = {
  getCart: () => async (ctx) => {
    const cartId = ctx.params.id;

    if (!Validator.isUUID(cartId)) {
      throw new ErrorService.InvalidUuidError();
    }

    const result = await CartDao.getCart(cartId);

    const { cart } = result;

    ctx.json({ data: cart });
  },
};
