import React, { Component } from 'react';
import { IconButton, List } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import {
  Navbar,
  LayoutContainer,
} from 'common/components';
import { filterAutocomplete } from 'common/utilities/filter';
import SearchInput from './SearchInput';
import SearchResultItem from './SearchResultItem';
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

function CloseButton({ history }) {
  return(
    <IconButton onClick={history.goBack} color="inherit" aria-label="Menu">
      <Close />
    </IconButton>
  );
}
