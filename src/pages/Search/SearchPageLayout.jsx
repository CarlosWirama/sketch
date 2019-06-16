import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, LayoutContainer } from '../../common/components';
import SearchInput from './SearchInput';

export default function SearchPageLayout(props) {
  return (
    <LayoutContainer>
      <Navbar>
        Search Pokémon name
        <SearchInput
          onChange={props.onChange}
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
};
