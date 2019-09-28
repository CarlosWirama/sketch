import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import SearchResultItem from './SearchResultItem';

export default function SearchResultList({
  filteredList,
  searchText,
  onClickItem,
  recentlyViewed,
}) {
  return (
    <>
      {searchText ? (
        <ResultOverview>
          {filteredList.length 
            ? <span>Showing <b>{filteredList.length}</b> results </span>
            : <span>No result </span>
          }
          for <b>"{searchText}"</b>
        </ResultOverview>
      ) : recentlyViewed.length ? (
        <RecentlyViewedSection>
          Recenty Viewed
          {recentlyViewed.map((storedName, key) => (
            <SearchResultItem
              key={key}
              onClick={onClickItem}
              listItem={filteredList.find(e => {
                if (storedName.includes('alolan')) {
                  const realName = storedName
                    .slice(storedName.indexOf('_') + 1);
                  return e.isAlolan === true && e.name.toLowerCase() === realName;
                }
                return e.name.toLowerCase() === storedName;
              })}
            />
          ))}
          Pokédex
        </RecentlyViewedSection>
      ) : null}
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

const ResultOverview = styled.div`
  margin-top: 24px;
`;

const RecentlyViewedSection = styled.div`
  margin-top: 24px;
`;
