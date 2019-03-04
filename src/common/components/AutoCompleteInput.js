import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import { InputBase } from '@material-ui/core';

export default class AutoCompleteInput extends Component {
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
      <Autosuggest>
        <InputBase
          {...this.props}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
        />
      </Autosuggest>
    );
  }
}
