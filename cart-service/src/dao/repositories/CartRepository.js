// Utilities
const PG = require('../../utilities/Postgres');

// Service
const ErrorService = require('../../services/ErrorService');

module.exports = {
  getCart: async (cartId, options = { returnSQL: false }) => {
    const sqlCart = PG('cart')
      .select(
        PG.raw(`json_build_object(
        'cart_id', cart.id,
        'items', json_agg(
                     json_build_object(
                      'product_id', products.id,
                      'name', products.name,
                      'qty', cart_items.quantity,
                      'price', products.price
                    )
                  ),
        'sub_total', SUM(products.price)) as cart`))
      .leftJoin('cart_items', 'cart_items.cart_id', 'cart.id')
      .leftJoin('products', 'products.id', 'cart_items.product_id')
      .whereRaw(`cart_id = '${cartId}'`)
      .groupByRaw('cart.id, cart.user_id ');

    const sqlCartOps = PG('cart_ops');

    if (options.returnSQL) {
      return sqlCart.toString();
    }

    try {
      const resultCart = await sqlCart;
      const resultCartOps = await sqlCartOps;
      const result = { cart: resultCart[0], cartOps: resultCartOps };
      return result;
    } catch (error) {
      throw new ErrorService.PgError(error);
    }
  },
};
