import React, { Component } from 'react';
import { Input } from '@material-ui/core';
import { getPokemonDetail } from '../api';
import Learnset from './Learnset';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      learnset: [],
    };
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onChange(e) {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  }
  
  async onEnter() {
    const learnset = await getPokemonDetail(this.state.searchText);
    console.log(learnset)
    this.setState({ learnset });
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
        <Learnset learnset={this.state.learnset} />
      </div>
    );
  }
}

function LearnsetItem({list}) {
  function encodeDash(string) {
    return string === '&mdash;' ? '-' : string;
  }
  const isStab = list[8] === `'''`;
  return (
    <div style={{display: 'flex'}}>
      <div style={{flex: 1}}>{list[0]}</div>
      <div style={{flex: 3}}>{list[1]}</div>
      <div style={{flex: 2}}>{list[2]}</div>
      <div style={{flex: 2}}>{list[3]}</div>
      <div style={{flex: 1}}>{encodeDash(list[4])}</div>
      <div style={{flex: 1}}>{encodeDash(list[5])}</div>
      <div style={{flex: 1}}>{list[6]}</div>
    </div>
  );
}