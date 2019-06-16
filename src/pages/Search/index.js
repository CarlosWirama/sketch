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
    this.onSubmit = this.onSubmit.bind(this);
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

  onSubmit(searchText) {
    this.props.history.push(`/pokemon/${searchText}`);
  }

  onClickItem(filteredList, index) {
    const selectedPokemon = filteredList[index];
    const pokemonName = this.getResultItemName(selectedPokemon);
    this.props.history.push(`/pokemon/${pokemonName}`);
  }

  getResultItemName(resultItem) {
    if (resultItem.isAlolan) {
      return `Alolan_${resultItem.name}`;
    }
    return resultItem.name;
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
          onClickItem={index => this.onClickItem(filteredList, index)}
        />
      );
    } else {
      searchResultContent = <EmptyState />;
    }
    return (
      <SearchPageLayout
        onChange={searchText => this.setState({ searchText })}
        onSubmit={this.onSubmit}
        searchResultContent={searchResultContent}
        {...this.props}
      />
    );
  }
}
