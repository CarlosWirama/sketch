import React, { useState, useEffect } from 'react';
import { filterAutocomplete } from '../../common/utilities/filter';
import { getPokemons, getFavorite, getRecentlyViewed } from '../../api';
import PokeballLoadingIndicator
  from '../../common/components/PokeballLoadingIndicator';
import SearchPageLayout from './SearchPageLayout';
import SearchResultList from './SearchResultList';
import EmptyState from './EmptyState';
import Form from '../../common/constants/Form';
import { useHistory, useParams } from 'react-router-dom';

export default function SearchPage() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  // const [favorite, setFavorite] = useState<string[]>([]);
  const { push } = useHistory();
  const { generation } = useParams();
  useEffect(() => {
    getPokemons(generation)
      .then(r => setPokemonList(r as any))
      .catch(e => {
        if (e.message === 'Network request failed') {
          // do nothing, Error message will be rendered
        } else console.error(e);
      })
      .finally(() => setIsLoading(false));
    // getFavorite().then(setFavorite);
    getRecentlyViewed().then(setRecentlyViewed);
  }, []);

  function onClickItem(name: string, form: Form) {
    const pokemonName = addFormPrefix(name, form);
    push(`/pokemon/${pokemonName}`);
  }

  function getResultItemName(resultItem: any) {
    return addFormPrefix(resultItem.name, resultItem.form);
  }

  const filteredList = filterAutocomplete(pokemonList, searchText, true, getResultItemName);
  let searchResultContent;
  if (isLoading) {
    searchResultContent = <PokeballLoadingIndicator/>;
  } else if (pokemonList.length) {
    searchResultContent = (
      <SearchResultList
        filteredList={filteredList}
        searchText={searchText}
        onClickItem={onClickItem}
        // favorite={favorite}
        recentlyViewed={recentlyViewed}
      />
    );
  } else {
    searchResultContent = <EmptyState />;
  }
  return (
    <SearchPageLayout
      searchText={searchText}
      onChange={setSearchText}
      searchResultContent={searchResultContent}
    />
  );
}

function addFormPrefix(name: string, form: Form) {
  return form ? `${form}_${name}` : name;
}
