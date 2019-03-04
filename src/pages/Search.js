import React, { Component } from 'react';
import { Paper, IconButton } from '@material-ui/core';
import { Close, Search } from '@material-ui/icons';
import {
  Navbar,
  LayoutContainer,
  AutoCompleteInput,
} from 'common/components';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  onSubmit() {
    const pokemon = this.state.searchText;
    this.props.history.push(`/pokémon/${pokemon}`)
  }

  render() {
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
            name='searchText'
            placeholder='Search…'
            style={{flex: 1}}
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
