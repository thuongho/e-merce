import CartActionTypes from './cart.types';

// no need to pass payload (optional) cuz cart.reducer is not using payload
export const toggleCartHidden = () => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN
});

export const addItem = item => ({
  type: CartActionTypes.ADD_ITEM,
  payload: item
});

export const clearItem = item => ({
  type: CartActionTypes.CLEAR_CART_ITEM,
  payload: item
});
