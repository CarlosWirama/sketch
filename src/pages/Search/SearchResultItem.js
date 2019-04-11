import React from 'react';
import PropTypes from 'prop-types';
import PokemonInfo from '../../common/components/PokemonInfo';
import {
  ResultItem,
} from './SearchResultItem.styled.js';

export default function SearchResultItem({
  listItem: { name, types },
  onClick,
}) {
  return (
    <ResultItem onClick={onClick}>
      <PokemonInfo name={name} types={types} />
    </ResultItem>
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
