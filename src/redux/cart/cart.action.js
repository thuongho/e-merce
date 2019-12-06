import CartActionTypes from './cart.types';

// no need to pass payload (optional) cuz cart.reducer is not using payload
export const toggleCartHidden = () => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN
});
