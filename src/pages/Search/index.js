import React, { Component } from 'react';
import { filterAutocomplete } from 'common/utilities/filter';
import { getPokemons } from 'api';
import SearchPageLayout from './SearchPageLayout';

export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemonList: [],
      filteredList: [],
      searchText: '',
    }
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    getPokemons().then(r => this.setState({ pokemonList: r }));
  }

  onSubmit(searchText) {
    this.props.history.push(`/pokémon/${searchText}`)
  }

  getSuggestionValue(suggestion) {
    return suggestion.name;
  }

  render() {
    const { pokemonList, searchText } = this.state;
    const filteredList = filterAutocomplete(
      pokemonList,
      searchText,
      true,
      this.getSuggestionValue
    );
    return (
      <SearchPageLayout
        onSubmit={this.onSubmit}
        onChange={searchText => this.setState({ searchText })}
        filteredList={filteredList}
        {...this.props}
      />
    );
  }
}
