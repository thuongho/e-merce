import React from 'react';
import './collection-item.styles.scss';

// we need to display stuff but we don't need state
const CollectionItem = ({name, imageUrl, price}) => (
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
  </div>
);

export default CollectionItem;
