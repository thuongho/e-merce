import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import CollectionsOverview from './collections-overview.component';
import WithSpinner from '../with-spinner/with-spinner.component';

import { selectIsCollectionsFetching } from '../../redux/shop/shop.selectors';

const mapStateToProps = createStructuredSelector({
  // key must match props in WithSpinner
  isLoading: selectIsCollectionsFetching
});

// const CollectionsOverviewContainer = connect(mapStateToProps)(WithSpinner(CollectionsOverview));
// compose - curry function from right to left
// pass collectionsOverview into withSpinner
const CollectionsOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;
