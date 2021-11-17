import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Navbar } from '../common/components';

export default function Party() {
  return (
    <PageContainer>
      <Navbar>Sketch</Navbar>
      <ScrollableLayout>
        <Section title="Sketch" desc="Select and plan your party Pokémon" />
        <Section
          title="PokéFight"
          desc="Find a Pokémon and see your party's winning chance against enemy party"
        />
      </LayoutContainer>
    );
  }
}

interface SectionProps {
  title: string;
  desc: string;
}

function Section({ title, desc }: SectionProps) {
  return (
    <SectionStyle>
      <div style={{ fontWeight: 'bold' }}>{title}</div>
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
