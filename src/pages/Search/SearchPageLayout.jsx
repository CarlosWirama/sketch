import React from 'react';
import { List, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import {
  Navbar,
  LayoutContainer,
} from 'common/components';
import SearchInput from './SearchInput';
import SearchResultItem from './SearchResultItem';

export default function SearchPageLayout(props) {
  return (
    <LayoutContainer>
      <Navbar
        left={<CloseButton {...props} />}
        middle="Add Pokémon to Party"
      />
      <SearchInput
        onSubmit={props.onSubmit}
        onChange={props.onChange}
      />
      <List>
        {props.filteredList.map((listItem, index) => (
          <SearchResultItem
            listItem={listItem}
            key={index}
            onClick={() => props.onClickItem(index)}
          />
        ))}
      </List>
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
