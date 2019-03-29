import React from 'react';

export default function SearchPageLayout(props) {
  return (
    <LayoutContainer>
      <Navbar
        left={<CloseButton {...props} />}
        middle="Add Pokémon to Party"
      />
      <SearchInput
        onSubmit={props.onSubmit}
        onChange={props.onChange}
      />
      <List>
        {props.filteredList.map((listItem, index) => (
          <SearchResultItem listItem={listItem} key={index} />
        ))}
      </List>
    </LayoutContainer>
  );
}
