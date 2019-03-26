import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Navbar } from 'common/components';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // searchText: '',
      // learnset: [],
    };
    // this.onChange = this.onChange.bind(this);
    // this.onKeyDown = this.onKeyDown.bind(this);
  }

  render() {
    return (
      <LayoutContainer>
        <Navbar middle="PokéPlanner" />
        <Section title="PokéPlanner" desc="Select and plan your party Pokémon" />
        <Section
          title="PokéFight"
          desc="Find a Pokémon and see your party's winning chance against enemy party"
        />
      </LayoutContainer>
    );
  }
}

function Section({title, desc}) {
  return (
    <SectionStyle>
      <div style={{fontWeight: 'bold'}}>{title}</div>
      <div>{desc}</div>
      <PartyArea>
        <Link to="/search">Tap to add Pokémon to your party</Link>
      </PartyArea>
    </SectionStyle>
  );
}

const SectionStyle = styled.div`
  margin: 24px 0;
`;

const PartyArea = styled.div`
  height: 160px;
  margin: 8px 0;
  background: lightgrey;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LayoutContainer = styled.div`
  margin: 0 16px;
`;
