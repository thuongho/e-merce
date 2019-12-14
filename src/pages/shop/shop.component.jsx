import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

// import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
// import { updateCollections } from '../../redux/shop/shop.actions';
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../collection/collection.container';

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
    const { fetchCollectionsStart } = this.props;
    fetchCollectionsStart();
  }
  
  render() {
    const { match } = this.props;

    return (
      <div className='shop-page'>
        <Route
          exact
          path={`${match.path}`}
          component={CollectionsOverviewContainer}
        />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPageContainer}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

// const mapDispatchToProps = dispatch => ({
//   updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
// });

export default connect(null, mapDispatchToProps)(ShopPage);
