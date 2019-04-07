import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { Navbar, LayoutContainer } from '../../common/components';
import SearchInput from './SearchInput';

export default function SearchPageLayout(props) {
  return (
    <LayoutContainer>
      <Navbar>
        Pokémove Finder
        <SearchInput
          onChange={props.onChange}
          onSubmit={props.onSubmit}
          placeholder="Search by Pokemon..."
        />
      </Navbar>
      {props.searchResultContent}
    </LayoutContainer>
  );
}

SearchPageLayout.propTypes = {
  searchResultContent: PropTypes.node.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
