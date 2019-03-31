import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from '@material-ui/core';

export default function SearchResultItem({
  listItem: { kantoDex, name, types },
  onClick,
}) {
  return (
    <ListItem button onClick={onClick}>
      {kantoDex} {name} {types}
    </ListItem>
  );
}

SearchResultItem.propTypes = {
  listItem: PropTypes.shape({
    kantoDex: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    types: PropTypes.arrayOf(
      PropTypes.string.isRequired
      ).isRequired,
    }).isRequired,
  onClick: PropTypes.func,
};

SearchResultItem.defaultProps = {
  onClick: () => {},
};
