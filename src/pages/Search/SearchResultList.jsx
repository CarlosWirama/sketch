import React from 'react';
import { List } from '@material-ui/core';
import SearchResultItem from './SearchResultItem';

export default function SearchResultList(props) {
  return (
    <List>
      {props.filteredList.map((listItem, index) => (
        <SearchResultItem
          listItem={listItem}
          key={index}
          onClick={() => props.onClickItem(index)}
        />
      ))}
    </List>
  );
}
