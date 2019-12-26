import React, { useState } from 'react';
import { SectionTitle } from '../DetailPage.styled';
import { Collapse } from '@material-ui/core';
import LoadingIndicator
  from '../../../common/components/PokeballLoadingIndicator';
import { getAbilityDescription } from '../../../api/getAbilityDetail';
import { Description, AbilityBox } from './Abilities.styled';

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
      getAbilityDescription(abilityName).then(result => {
        const description = (abilityName === hidden)
          ? `(Hidden Ability) ${result}` : result;
        setDescription(description);
      }).catch(e => setDescription(`Error: ${e.message}`));
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
        <Description>
          {description || <LoadingIndicator size={28} />}
        </Description>
      </Collapse>
    </>
  );
}
