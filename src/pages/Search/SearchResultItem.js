import React from 'react';
import PropTypes from 'prop-types';
import {
  StyledListItem,
  PokemonImage,
  Texts,
  Name,
  Types,
  Type,
} from './SearchResultItem.styled.js';

export default function SearchResultItem({
  listItem: { name, types },
  onClick,
}) {
  return (
    <StyledListItem button onClick={onClick}>
      <PokemonImage>ssd</PokemonImage>
      <Texts>
        <Name>{name}</Name>
        <Types>
          {types.map((type, index) => (
            <Type key={index}>{type}</Type>
          ))}
        </Types>
      </Texts>
    </StyledListItem>
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
