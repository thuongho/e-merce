import React from 'react';
import { connect } from 'react-redux';
import { sectionsSelector } from '../../redux/directory/directory.selector';

import MenuItem from '../menu-item/menu-item.component';

import './directory.styles.scss';

const Directory = ({ sections }) => (
  // destructure instead of map(section) => section.id, etc
  <div className='directory-menu'>
    { sections.map(({ id, ...otherSectionProps }) => (
      <MenuItem key={id} {...otherSectionProps} />
    ))}
  </div>
);

const mapStateToProps = state => ({
  sections: sectionsSelector(state)
});

export default connect(mapStateToProps)(Directory);
