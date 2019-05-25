import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import SearchResultItem from './SearchResultItem';

export default function SearchResultList(props) {
  return (
    <StyledList>
      {props.filteredList.map((listItem, index) => (
        <SearchResultItem
          listItem={listItem}
          key={index}
          onClick={() => props.onClickItem(index)}
        />
      ))}
    </StyledList>
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
