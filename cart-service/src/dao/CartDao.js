// Dao
const CartRepository = require('./repositories/CartRepository');
const CartDecorator = require('./CartDecorator');

module.exports = {
  getCart: async (cartId) => {
    const rawCart = await CartRepository.getCart(cartId);

    const { cart, cartOps } = rawCart;
    const decoratedCart = CartDecorator.decorate(cart.cart, cartOps);

    if (!decoratedCart) {
      return {
        cart: {},
      };
    }

    return {
      cart: decoratedCart,
    };
  },
};
