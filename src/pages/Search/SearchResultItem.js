import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ListItem } from '@material-ui/core';

export default function SearchResultItem({
  listItem: { name, types },
  onClick,
}) {
  return (
    <StyledListItem button onClick={onClick}>
      <PokemonImage>ssd</PokemonImage>
      <Texts>
        <Name>{name}</Name>
        <Types>{types}</Types>
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

const StyledListItem = styled(ListItem)`
  color: white;
  font-size: 20px;
  && {
    background-color: rgba(32, 129, 255, 0.3);
    border-radius: 10px 28px;
    margin: 24px 0;
    padding: 4px 8px;
    box-shadow: 0 0 8px 10px rgba(182, 237, 255, 0.3);
    border: solid 3px rgba(176, 235, 255, 0.8);
  }
  &&:before {
    content: " ";
    position: absolute;
    top: -6px;
    left: -6px;
    right: -6px;
    bottom: -6px;
    border: 3px solid rgba(32, 129, 255, 0.3);
    border-radius: 10px 30px;
  }
`;

const PokemonImage = styled.div`
  width: 72px;
  height: 72px;
`;

const Texts = styled.div`
`;

const Name = styled.div`
  color: white;
`;

const Types = styled.div`
  color: white;
`;
