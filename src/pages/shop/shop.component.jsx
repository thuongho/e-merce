import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
// import { updateCollections } from '../../redux/shop/shop.actions';
import { fetchCollectionsAsync } from '../../redux/shop/shop.actions';
import { selectIsCollectionsFetching, selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  // state = {
  //   loading: true
  // };

  // unsubscribeFromSnapshot = null;

  // componentDidMount() {
    /************* PATTERNS ***********/
    // const { updateCollections } = this.props;
    // const collectionsRef = firestore.collection('collections');
    // Observer Pattern - live update stream
    // this.unsubscribeFromSnapshot = collectionsRef.onSnapshot(async snapShot => {
    //   const collectionsMap = convertCollectionsSnapshotToMap(snapShot);
    //   updateCollections(collectionsMap);
    //   this.setState({ loading: false });
    // });

    // Native fetch
    // fetch(
    //   'https://firestore.googleapis.com/v1/projects/emerce-db/databases/(default)/documents/collections'
    // )
    // .then(response => response.json())
    // .then(collections => console.log('collections', collections))

    // Promise pattern - not live update
    // collectionsRef.get().then(snapShot => {
    //   const collectionsMap = convertCollectionsSnapshotToMap(snapShot);
    //   updateCollections(collectionsMap);
    //   this.setState({ loading: false });
    // });
    /************* PATTERNS END ***********/
  // }
  componentDidMount() {
    const { fetchCollections } = this.props;
    fetchCollections();
  }
  
  render() {
    const { match, isCollectionsFetching, isCollectionsLoaded } = this.props;

    return (
      <div className='shop-page'>
        <Route
          exact
          path={`${match.path}`}
          render={(props) => <CollectionsOverviewWithSpinner
          isLoading={isCollectionsFetching} {...props} />}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={(props) => <CollectionPageWithSpinner
          isLoading={!isCollectionsLoaded} {...props} />}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isCollectionsFetching: selectIsCollectionsFetching,
  isCollectionsLoaded: selectIsCollectionsLoaded
});

const mapDispatchToProps = dispatch => ({
  fetchCollections: () => dispatch(fetchCollectionsAsync())
});

// const mapDispatchToProps = dispatch => ({
//   updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
// });

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
