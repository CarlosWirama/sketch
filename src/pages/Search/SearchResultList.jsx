import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import SearchResultItem from './SearchResultItem';

export default function SearchResultList({
  filteredList,
  searchText,
  onClickItem,
}) {
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    (async () => {
      const storedRaw = await localStorage.getItem('recentlyViewed');
      storedRaw && setRecentlyViewed(storedRaw.split(','));
    })();
  }, []);
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
              listItem={filteredList.find(e =>
                e.name.toLowerCase() === storedName.toLowerCase()
              )}
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
