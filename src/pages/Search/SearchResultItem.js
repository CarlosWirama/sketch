import React from 'react';
import PropTypes from 'prop-types';
import PokemonInfo from '../../common/components/PokemonInfo';
import { ResultItem } from './SearchResultItem.styled';

export default function SearchResultItem({
  listItem: { name, types, form },
  onClick,
}) {
  return (
    <ResultItem onClick={() => onClick(name, form)}>
      <PokemonInfo
        name={name}
        types={types}
        form={form}
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
    form: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func,
};

SearchResultItem.defaultProps = {
  onClick: () => {},
};
