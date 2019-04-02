import React from 'react';
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

function CloseButton({ history }) {
  return(
    <IconButton onClick={history.goBack} color="inherit" aria-label="Menu">
      <Close />
    </IconButton>
  );
}
