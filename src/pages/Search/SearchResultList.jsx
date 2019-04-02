import React from 'react';
import PropTypes from 'prop-types';
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

SearchResultList.propTypes = {
  filteredList: PropTypes.array.isRequired,
  onClickItem: PropTypes.func,
};

SearchResultList.defaultProps = {
  onClickItem: () => {},
};
