import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Navbar } from '../common/components';
import { LayoutContainer } from '../common/components';

export default function Party() {
  return (
    <PageContainer>
      <Navbar>PokéParty</Navbar>
      <ScrollableLayout>
        <Section title="PokéPlanner" desc="Select and plan your party Pokémon" />
        <Section
          title="PokéFight"
          desc="Find a Pokémon and see your party's winning chance against enemy party"
        />
      </ScrollableLayout>
    </PageContainer>
  );
}

interface SectionProps {
  title: string;
  desc: string;
}

function Section({title, desc}: SectionProps) {
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

const PageContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const ScrollableLayout = styled(LayoutContainer)`
  flex: 1;
  overflow: scroll;
`;

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
