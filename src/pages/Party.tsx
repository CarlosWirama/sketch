import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Navbar } from '../common/components';
import { LayoutContainer } from '../common/components';
import { getPartyList } from '../api';
import { PartyPokemonOptimized } from '../common/types/partyType';
import { getPixelImageFromName } from '../api/spriteApi';

export default function Party() {
  const [party, setParty] = useState<PartyPokemonOptimized[]>([]);
  useEffect(() => {
    const newParty = getPartyList();
    console.log(newParty);
    setParty(newParty);
  }, [])
  return (
    <PageContainer>
      <Navbar>Sketch</Navbar>
      <ScrollableLayout>
        <SectionStyle>
          <div style={{ fontWeight: 'bold' }}>Party</div>
          <div>Sketch up your party Pokémon</div>
          <PartyArea>
            {party.length ? party.map(({ species }, i) => (
              <img key={i} src={getPixelImageFromName(species)} />
            )) :
              (
                <Link to="/search">Tap to add Pokémon to your party</Link>
              )}
          </PartyArea>
        </SectionStyle>
        {/* <Section
          title="PokéFight"
          desc="Find a Pokémon and see your party's winning chance against enemy party"
        /> */}
      </ScrollableLayout>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  height: 100%;
  flex: 1;
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
  height: 120px;
  margin: 8px 0;
  background: #3333;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
