import React, { Component } from 'react';
import { Input } from '@material-ui/core';
import { Close, Search } from '@material-ui/icons';
import {
  Navbar,
  ClickArea,
  LayoutContainer,
} from 'common/components';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onChange(e) {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  }
  
  onEnter() {
    const pokemon = this.state.searchText;
    this.props.history.push(`/pokémon/${pokemon}`)
  }

  onKeyDown(e){
    if(e.keyCode === 13) this.onEnter(e);
  }

  render() {
    return (
      <LayoutContainer>
        <Navbar
          left={<CloseButton {...this.props} />}
          middle="Add Pokémon to Party"
        />
        <Input
          name='searchText'
          placeholder='Search…'
          style={{backgroundColor: '#ccc'}}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
        />
      </LayoutContainer>
    );
  }
}

function CloseButton({ history }) {
  return(
    <ClickArea onClick={history.goBack}>
      <Close />
    </ClickArea>
  );
}
