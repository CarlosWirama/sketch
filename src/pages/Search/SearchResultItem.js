import React from 'react';
import PropTypes from 'prop-types';
import PokemonInfo from '../../common/components/PokemonInfo';
import {
  ResultItem,
} from './SearchResultItem.styled.js';

export default function SearchResultItem({
  listItem: { name, types, isAlolan },
  onClick,
}) {
  return (
    <ResultItem onClick={() => onClick(name, isAlolan)}>
      <PokemonInfo
        name={name}
        types={types}
        isAlolan={isAlolan}
        titleColor="white"
      />
    </ResultItem>
  );
}

SearchResultItem.propTypes = {
  listItem: PropTypes.shape({
    name: PropTypes.string.isRequired,
    types: PropTypes.arrayOf(
      PropTypes.string.isRequired
    ).isRequired,
    isAlolan: PropTypes.bool,
  }).isRequired,
  onClick: PropTypes.func,
};

SearchResultItem.defaultProps = {
  onClick: () => {},
};
