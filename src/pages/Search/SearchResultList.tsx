import React from 'react';
import styled from 'styled-components';
import List from '@material-ui/core/List';
import SearchResultItem from './SearchResultItem';
import Form from '../../common/constants/Form';
import Type from '../../common/constants/Type';

interface SearchResultListProps {
  filteredList: {
    name: string;
    types: [Type] | [Type, Type];
    form: Form;
  }[];
  onClickItem: (name: string, form: Form) => void;
  searchText: string;
  recentlyViewed: string[];
};

export default function SearchResultList({
  filteredList,
  searchText,
  onClickItem,
  recentlyViewed,
  // favorite,
}: SearchResultListProps) {
  function findPokemonByName(name: string) {
    return filteredList.find(e => {
      // if (name.includes('alolan')) {
      //   const realName = name
      //     .slice(name.indexOf('_') + 1);
      //   return e.isAlolan === true && e.name.toLowerCase() === realName;
      // }
      return e.name.toLowerCase() === name;
    });
  }

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
          {filteredList.length && recentlyViewed.length !== 0 && (
            <Section>
              Recenty Viewed
              {recentlyViewed.map((storedName, key) => {
                const recentItem = findPokemonByName(storedName);
                return recentItem && (
                  <SearchResultItem
                    key={key}
                    onClick={onClickItem}
                    listItem={recentItem}
                  />
                );
              })}
              Pokédex
            </Section>
          )}
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

const Section = styled.div`margin-top: 24px;`;
