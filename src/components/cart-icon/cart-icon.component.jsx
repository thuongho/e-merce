import React from 'react';
import { createStructuredSelector } from 'reselect';

import { connect } from 'react-redux';
import { toggleCartHidden } from '../../redux/cart/cart.action';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

import {
  CartIconContainer,
  ItemCountContainer,
  ShoppingIconContainer
} from './cart-icon.styles';

// functional component that renders a div
// toggleCartHidden is now accessable cuz mapDispatchToProps has it as a method and it is passed into connect as a prop
const CartIcon = ({ toggleCartHidden, itemCount }) => (
  <CartIconContainer onClick={toggleCartHidden}>
    <ShoppingIconContainer></ShoppingIconContainer>
    <ItemCountContainer>{itemCount}</ItemCountContainer>
  </CartIconContainer>
);

const mapDispatchToProps = dispatch => ({
  // function that triggers the dispatch of toggleCartHidden
  toggleCartHidden: () => dispatch(toggleCartHidden())
});

// const mapStateToProps = ({ cart: { cartItems } }) => ({
//   itemCount: cartItems.reduce((totalItems, cartItem) => (totalItems + cartItem.quantity), 0)
// });
const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemsCount
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
