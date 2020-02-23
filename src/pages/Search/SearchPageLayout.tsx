import React, { ReactChild, ReactChildren } from 'react';
import { Navbar, LayoutContainer } from '../../common/components';
import SearchInput from './SearchInput';

export default function SearchPageLayout({
  searchText,
  onChange,
  searchResultContent,
}: SearchPageLayoutProps) {
  return (
    <LayoutContainer>
      <Navbar>
        Search Pokémon name
        <SearchInput
          searchText={searchText}
          onChange={onChange}
          placeholder="Search by Pokemon..."
        />
      </Navbar>
      {searchResultContent}
    </LayoutContainer>
  );
}

interface SearchPageLayoutProps {
  searchText: string;
  searchResultContent: ReactChild | ReactChildren;
  onChange: (text: string) => void;
}
