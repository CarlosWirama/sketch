import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import {
  Navbar,
  LayoutContainer,
} from 'common/components';
import SearchInput from './SearchInput';

export default function SearchPageLayout(props) {
  return (
    <LayoutContainer>
      <Navbar
        left={<CloseButton {...props} />}
        middle="Add Pokémon to Party"
      />
      <SearchInput
        onChange={props.onChange}
        onSubmit={props.onSubmit}
      />
      {props.searchResultContent}
    </LayoutContainer>
  );
}

SearchPageLayout.propTypes = {
  searchResultContent: PropTypes.node.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

function CloseButton({ history }) {
  return(
    <IconButton onClick={history.goBack} color="inherit" aria-label="Menu">
      <Close />
    </IconButton>
  );
}
