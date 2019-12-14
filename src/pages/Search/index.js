import React, { Component } from 'react';
import { filterAutocomplete } from '../../common/utilities/filter';
import { getPokemons, getFavorite, getRecentlyViewed } from '../../api';
import PokeballLoadingIndicator
  from '../../common/components/PokeballLoadingIndicator';
import SearchPageLayout from './SearchPageLayout';
import SearchResultList from './SearchResultList';
import EmptyState from './EmptyState';

export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemonList: [],
      searchText: '',
      isLoading: true,
      recentlyViewed: [],
      favorite: [],
    };
    this.onClickItem = this.onClickItem.bind(this);
  }

  componentDidMount() {
    getPokemons(this.props.match.params.generation)
      .then(r => this.setState({ pokemonList: r }))
      .catch(e => {
        if (e.message === 'Network request failed') {
          // do nothing, Error message will be rendered
        } else console.error(e);
      })
      .finally(() => this.setState({ isLoading: false }));
    getFavorite().then(r => this.setState({ favorite: r }));
    getRecentlyViewed().then(r => this.setState({ recentlyViewed: r }));
  }

  onClickItem(name, form) {
    const pokemonName = addFormPrefix(name, form);
    this.props.history.push(`/pokemon/${pokemonName}`);
  }

  getResultItemName(resultItem) {
    return addFormPrefix(resultItem.name, resultItem.form);
  }

  render() {
    const { pokemonList, searchText, isLoading } = this.state;
    const filteredList = filterAutocomplete(
      pokemonList,
      searchText,
      true,
      this.getResultItemName
    );
    let searchResultContent;
    if (isLoading) {
      searchResultContent = <PokeballLoadingIndicator/>;
    } else if (pokemonList.length) {
      searchResultContent = (
        <SearchResultList
          filteredList={filteredList}
          searchText={searchText}
          onClickItem={this.onClickItem}
          favorite={this.state.favorite}
          recentlyViewed={this.state.recentlyViewed}
        />
      );
    } else {
      searchResultContent = <EmptyState />;
    }
    return (
      <SearchPageLayout
        searchText={searchText}
        onChange={searchText => this.setState({ searchText })}
        searchResultContent={searchResultContent}
        {...this.props}
      />
    );
  }
}

function addFormPrefix(name, form) {
  return form ? `${form}_${name}` : name;
}
