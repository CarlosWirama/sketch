import React from 'react';
import { SectionTitle } from '../DetailPage.styled';
import styled from 'styled-components';

interface AbilitiesProps {
  nonHidden: string[];
  hidden?: string;
}

export default function Abilities({ nonHidden, hidden }: AbilitiesProps) {
  return (
    <>
      <SectionTitle>Abilities</SectionTitle>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {nonHidden.map(ability => (
          <AbilityBox key={ability}>{ability}</AbilityBox>
        ))}
        {hidden && (
          <AbilityBox style={{
            opacity: .6,
            background: 'gray',
            color: 'white',
          }}>
            {hidden}
          </AbilityBox>
        )}
      </div>
    </>
  );
}

const AbilityBox = styled.div`
    background: white;
    border-radius: 4px;
    padding: 2px 8px;
`;
