// constants
const TAX = 'tax';
const DISCOUNT = 'discount';

module.exports = {
  decorate: (cart, cartOps) => {
    if (!cart || cartOps.length === 0) {
      return cart;
    }
    let total = cart.sub_total;
    let cartResult = cart;

    for (let i = 0; i < cartOps.length; i += 1) {
      const type = cartOps[i].type;
      const value = Number(cartOps[i].value);

      switch (type) {
        case DISCOUNT :
          cartResult = { ...cartResult, [type]: value };
          total -= (total * value) / 100;
          break;

        case TAX :
          cartResult = { ...cartResult, [type]: value };
          total += (total * value) / 100;
          break;

        default:
          break;
      }
    }

    total = parseFloat(total).toFixed(2);

    return { ...cartResult, total };
  },
};
