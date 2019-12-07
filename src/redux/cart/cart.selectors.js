import { createSelector } from 'reselect';

// input selector
const selectCart = state => state.cart;

// by using createSelect to get the cartItems, cartItems is now a memoize item
export const selectCartItems = createSelector(
  // collection of input selectors
  [selectCart],
  // function return value out of selector
  (cart) => cart.cartItems
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems =>
    cartItems.reduce((totalItems, cartItem) => (totalItems + cartItem.quantity), 0)
);

export const selectCartHidden = createSelector(
  [selectCart],
  (cart) => cart.hidden
);
