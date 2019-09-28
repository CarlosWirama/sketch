import React, { Component } from 'react';
import { filterAutocomplete } from '../../common/utilities/filter';
import { getPokemons } from '../../api';
import PokeballLoadingIndicator from '../../common/components/PokeballLoadingIndicator';
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
    };
    this.onClickItem = this.onClickItem.bind(this);
  }

  componentDidMount() {
    getPokemons()
      .then(r => this.setState({ pokemonList: r }))
      .catch(e => {
        if (e.message === 'Network request failed') {
          // do nothing, Error message will be rendered
        } else console.error(e);
      })
      .finally(() => this.setState({ isLoading: false }));
  }

  onClickItem(name, isAlolan) {
    const pokemonName = addAlolanPrefix(name, isAlolan);
    this.props.history.push(`/pokemon/${pokemonName}`);
  }

  getResultItemName(resultItem) {
    return addAlolanPrefix(resultItem.name, resultItem.isAlolan);
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

function addAlolanPrefix(name, isAlolan) {
  return isAlolan ? `Alolan_${name}` : name;
}
