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
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  onSubmit(searchText) {
    this.props.history.push(`/pokémon/${searchText}`)
  }

  render() {
    const collection = [
      {name: 'asd'},
      {name: 'aaaaa'},
      {name: 'gsaaaa'},
      {name: 'aa'},
    ];
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
            collection={collection}
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
