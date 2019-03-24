import React, { Component } from 'react';
import { Paper, IconButton } from '@material-ui/core';
import { Close, Search } from '@material-ui/icons';
import {
  Navbar,
  LayoutContainer,
  AutoCompleteInput,
} from 'common/components';
import { getPokemons } from 'api';

export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchSuggestion: [],
    }
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    getPokemons().then(r => this.setState({ searchSuggestion: r }));
  }

  onSubmit(searchText) {
    this.props.history.push(`/pokémon/${searchText}`)
  }

  render() {
    const { searchSuggestion } = this.state;
    return (
      <LayoutContainer>
        <Navbar
          left={<CloseButton {...this.props} />}
          middle="Add Pokémon to Party"
        />
        X Pokémon Selected
        <Paper style={{display: 'flex'}}>
          <IconButton aria-label="Search">
            <Search />
          </IconButton>
          <AutoCompleteInput
            placeholder='Search…'
            style={{flex: 1}}
            suggestions={searchSuggestion}
            onSubmit={this.onSubmit}
          />
        </Paper>
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
