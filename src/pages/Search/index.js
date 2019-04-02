import React, { Component } from 'react';
import { filterAutocomplete } from 'common/utilities/filter';
import { getPokemons } from 'api';
import SearchPageLayout from './SearchPageLayout';

export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemonList: [],
      searchText: '',
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onClickItem = this.onClickItem.bind(this);
  }

  componentDidMount() {
    getPokemons()
      .then(r => this.setState({ pokemonList: r }))
      .catch(e => {
        console.error('e', e);
        if(e.message === 'Network request failed') {
          //
        } else console.error('e', e);
      });
  }

  onSubmit(searchText) {
    this.props.history.push(`/pokémon/${searchText}`);
  }

  onClickItem(filteredList, index) {
    const selectedPokemon = filteredList[index];
    const pokemonName = this.getSuggestionValue(selectedPokemon);
    this.props.history.push(`/pokémon/${pokemonName}`);
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
        onChange={searchText => this.setState({ searchText })}
        onSubmit={this.onSubmit}
        onClickItem={index => this.onClickItem(filteredList, index)}
        filteredList={filteredList}
        {...this.props}
      />
    );
  }
}
