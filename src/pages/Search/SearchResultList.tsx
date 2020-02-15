import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import SearchResultItem from './SearchResultItem';

export default function SearchResultList({
  filteredList,
  searchText,
  onClickItem,
  // favorite,
  // recentlyViewed,
}) {
  // function findPokemonByName(name) {
  //   return filteredList.find(e => {
  //     if (name.includes('alolan')) {
  //       const realName = name
  //         .slice(name.indexOf('_') + 1);
  //       return e.isAlolan === true && e.name.toLowerCase() === realName;
  //     }
  //     return e.name.toLowerCase() === name;
  //   });
  // }

  return (
    <>
      {searchText ? (
        <Section>
          {filteredList.length 
            ? <span>Showing <b>{filteredList.length}</b> results </span>
            : <span>No result </span>
          }
          for <b>"{searchText}"</b>
        </Section>
      ) : (
        <>
          {/* {filteredList.length && favorite.length !== 0 && (
            <Section>
              Favorite
              {favorite.map((storedName, key) => (
                <SearchResultItem
                  key={key}
                  onClick={onClickItem}
                  listItem={findPokemonByName(storedName)}
                />
              ))}
            </Section>
          )} */}
          {/* {filteredList.length && recentlyViewed.length !== 0 && (
            <Section>
              Recenty Viewed
              {recentlyViewed.map((storedName, key) => (
                <SearchResultItem
                  key={key}
                  onClick={onClickItem}
                  listItem={findPokemonByName(storedName)}
                />
              ))}
              Pokédex
            </Section>
          )} */}
        </>
      )}
      <List>
        {filteredList.map((listItem, index) => (
          <SearchResultItem
            key={index}
            listItem={listItem}
            onClick={onClickItem}
          />
        ))}
      </List>
    </>
  );
}

SearchResultList.propTypes = {
  filteredList: PropTypes.array.isRequired,
  onClickItem: PropTypes.func,
  searchText: PropTypes.string,
  recentlyViewed: PropTypes.arrayOf(PropTypes.string).isRequired,
};

SearchResultList.defaultProps = {
  onClickItem: () => {},
};

const Section = styled.div`
  margin-top: 24px;
`;
