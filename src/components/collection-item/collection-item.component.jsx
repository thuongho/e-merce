import React from 'react';
import { connect } from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';
import { addItem } from '../../redux/cart/cart.action';

import './collection-item.styles.scss';

// we need to display stuff but we don't need state
// change () to {} cuz we're executing multiple items in this expression
const CollectionItem = ({ item, addItem }) => {
  const { name, price, imageUrl } = item;
  return (
    <div className='collection-item'>
      <div
        className='image'
        style={{
          backgroundImage: `url(${imageUrl})`
        }}></div>
      <div className='collection-footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </div>
      <CustomButton className='custom-button' inverted onClick={() => addItem(item)}>Add to cart</CustomButton>
    </div>
  );
};

const mapDispatchToState = dispatch => ({
  addItem: item => dispatch(addItem(item))
});

export default connect(null, mapDispatchToState)(CollectionItem);
