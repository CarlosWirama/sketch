import React, { Component } from 'react';
import { Input } from '@material-ui/core';
import { getPokemonDetail } from './api';

export default class App extends Component {
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
    getPokemonDetail(this.state.searchText);
  }

  onKeyDown(e){
    if(e.keyCode === 13) this.onEnter(e);
  }

  render() {
    return (
      <div>
        <Input
          name='searchText'
          placeholder='Search…'
          style={{backgroundColor: '#ccc'}}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
        />
      </div>
    );
  }
}
