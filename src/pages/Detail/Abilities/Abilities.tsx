import React, { useState } from 'react';
import { SectionTitle } from '../DetailPage.styled';
import styled from 'styled-components';
import { Collapse } from '@material-ui/core';
import LoadingIndicator
  from '../../../common/components/PokeballLoadingIndicator';
import { getAbilityDescription } from '../../../api/getAbilityDetail';

interface AbilitiesProps {
  nonHidden: string[];
  hidden?: string;
}

export default function Abilities({ nonHidden, hidden }: AbilitiesProps) {
  const [description, setDescription] = useState('');
  const [activeAbility, setActiveAbility] = useState<string | null>(null);

  function toggleDescription(abilityName: string) {
    if (activeAbility === abilityName) {
      setActiveAbility(null);
      setDescription('');
    } else {
      setActiveAbility(abilityName);
      setDescription('');
      getAbilityDescription(abilityName).then(setDescription);
    }
  }

  return (
    <>
      <SectionTitle>Abilities</SectionTitle>
      <div style={{ display: 'flex' }}>
        {nonHidden.map(ability => (
          <AbilityBox key={ability} onClick={() => toggleDescription(ability)}>
            {ability}
          </AbilityBox>
        ))}
        {hidden && (
          <AbilityBox isHiddenAbility onClick={() => toggleDescription(hidden)}>
            {hidden}
          </AbilityBox>
        )}
      </div>
      <Collapse in={Boolean(activeAbility)} timeout="auto" unmountOnExit>
        {description || <LoadingIndicator size={28} />}
      </Collapse>
    </>
  );
}

const AbilityBox = styled.div<{isHiddenAbility?: boolean}>`
  background: white;
  border-radius: 4px;
  padding: 2px 8px;
  margin-right: 16px;
  ${props => props.isHiddenAbility && `
    opacity: .6;
    background: gray;
    color: white;
  `}
`;
