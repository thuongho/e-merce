import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.action';
import {
  CartDropdownContainer,
  CartItemContainer,
  EmptyMessageContainer
} from './cart-dropdown.styles';

const CartDropDownComponent = ({ cartItems, history, dispatch }) => (
  <CartDropdownContainer>
    <CartItemContainer>
      {
        cartItems.length ? (
          cartItems.map(
            cartItem => (
              <CartItem key={cartItem.id} item={cartItem} />
            )
          )
        ) : (
          <EmptyMessageContainer>Cart is empty</EmptyMessageContainer>
        )
      }
    </CartItemContainer>
    <CustomButton
      onClick={() => {
        history.push('/checkout');
        dispatch(toggleCartHidden());
      }}>
      GO TO CHECKOUT
    </CustomButton>
  </CartDropdownContainer>
);

// const mapStateToProps = ({ cart: { cartItems } }) => ({
//   cartItems
// });
// make sure cart-dropdown doesn't rerender everytime a state item is updated that is not related to cartItems
const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
});

const CartDropDown = compose(
  connect(mapStateToProps),
  withRouter
)(CartDropDownComponent);

// connect pass in dispatch if we don't provide a second arg
export default CartDropDown;
