import React from 'react';
import { Route } from 'react-router-dom';

import CollectionPreview from '../../components/collection-preview/collection-preview.component';

import './collection.styles.scss';

const CollectionPage = ({ match }) => {
  console.log('match', match.params.collectionId);
  return (
  <div className='category'>
    <h2>COLLECTION PAGE</h2>
  </div>
)};

export default CollectionPage;
