import React, { Component } from 'react';
import styled from 'styled-components';
import { AppBar } from '@material-ui/core';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      learnset: [],
    };
    // this.onChange = this.onChange.bind(this);
    // this.onKeyDown = this.onKeyDown.bind(this);
  }

  render() {
    return (
      <LayoutContainer>
        <StyledAppBar>
          <HeaderContent>
            PokéPlanner
          </HeaderContent>
        </StyledAppBar>
        <EmptySpace />
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
        Tap to add Pokémon to your party
      </PartyArea>
    </SectionStyle>
  );
}

const HeaderContent = styled.h3`
  text-align: center;
  vertical-align: center;
`;

const StyledAppBar = styled(AppBar)`
  height: 64px;
`;

const SectionStyle = styled.div`
  margin: 24px 0;
`;

const EmptySpace = styled.div`
  height: 64px;
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
