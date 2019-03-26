import React, { Component } from 'react';
import { getPokemonDetail } from 'api';
import Learnset from './Learnset';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      learnset: [],
    };
  }

  componentDidMount() {
    getPokemonDetail(this.props.match.params.pokemon)
      .then(learnset => this.setState({ learnset }));
  }

  render() {
    return (
      <div>
        <Learnset learnset={this.state.learnset} />
      </div>
    );
  }
}
