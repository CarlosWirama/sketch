import React, { Component } from 'react';
import { IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import {
  Navbar,
  LayoutContainer,
} from 'common/components';
import { filterSuggestions } from 'common/utilities/filter';
import SearchInput from './SearchInput';
import { getPokemons } from 'api';

export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchSuggestion: [],
    }
    this.searchInput = {};
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    getPokemons().then(r => this.setState({ searchSuggestion: r }));
  }

  onSubmit(searchText) {
    this.props.history.push(`/pokémon/${searchText}`)
  }

  filterResult(searchText) {
  //   filterSuggestions(
  //     searchText,
  //     this.searchSuggestion,
  //     suggestion => suggestion.name
  //   );
  }

  // getSuggestionValue(suggestion) {
  //   return suggestion.name;
  // }

  render() {
    // const { searchSuggestion } = this.state;
    return (
      <LayoutContainer>
        <Navbar
          left={<CloseButton {...this.props} />}
          middle="Add Pokémon to Party"
        />
        X Pokémon Selected
        <SearchInput
          ref={e => this.searchInput = e}
          onSubmit={this.onSubmit}
          onChange={this.filterResult}
          onClear={this.searchInput.clear}
        />
      </LayoutContainer>
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
