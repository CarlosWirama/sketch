import React, { Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import SearchResultItem from './SearchResultItem';

export default function SearchResultList(props) {
  return (
    <Fragment>
      {props.searchText && (
        <ResultOverview>
          {props.filteredList.length 
            ? <span>Showing <b>{props.filteredList.length}</b> results </span>
            : <span>No result </span>
          }
          for <b>"{props.searchText}"</b>
        </ResultOverview>
      )}
      <StyledList>
        {props.filteredList.map((listItem, index) => (
          <SearchResultItem
            listItem={listItem}
            key={index}
            onClick={() => props.onClickItem(index)}
          />
        ))}
      </StyledList>
    </Fragment>
  );
}

SearchResultList.propTypes = {
  filteredList: PropTypes.array.isRequired,
  onClickItem: PropTypes.func,
};

SearchResultList.defaultProps = {
  onClickItem: () => {},
};

const StyledList = styled(List)`
  && {
    margin-top: 8px;
  }
`;

const ResultOverview = styled.div`
  margin-top: 24px;
`;
