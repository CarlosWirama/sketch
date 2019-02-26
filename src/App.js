import React, { Component } from 'react';
import { Input } from '@material-ui/core';
import { getPokemonDetail } from './api';

export default class App extends Component {
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
        <ul>
            <li>
              level, move, type, category, power, acc, pp, -, stab ''' / ''
            </li>
          { this.state.learnset.map(({list}, i) =>
            <li key={i}>
              {list}
            </li>
          )}
        </ul>
      </div>
    );
  }
}
