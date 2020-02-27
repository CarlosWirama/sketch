import React, { ReactChild, ReactChildren } from 'react';
import { Navbar, LayoutContainer } from '../../common/components';
import SearchInput from './SearchInput';

interface SearchPageLayoutProps {
  searchText: string;
  searchResultContent: ReactChild | ReactChildren;
  onChange: (text: string) => void;
}

export default function SearchPageLayout({
  searchText,
  onChange,
  searchResultContent,
}: SearchPageLayoutProps) {
  return (
    <>
      <Navbar>
        Search Pokémon name
        <SearchInput
          searchText={searchText}
          onChange={onChange}
          placeholder="Search by Pokemon..."
        />
      </Navbar>
      <LayoutContainer>
        {searchResultContent}
      </LayoutContainer>
    </>
  );
}
