import React from 'react';
import { SectionTitle } from '../DetailPageLayout.styled';
import { SectionContent, StageCard } from './EvolutionaryLine.styled';

export default function EvolutionaryLine({ stages, onClickStage }) {
  return (
    <>
      <SectionTitle>Evolution</SectionTitle>
      <SectionContent>
        {stages.length > 1
          ? stages.map(({ name, evolutionMethod, type }, key) => (
            <StageCard key={key} onClick={() => onClickStage(name)}>
              {name}<br/>{evolutionMethod}<br/>{type}
            </StageCard>
          ))
          : "Doesn't evolve from, and won't evolve to another pokémon"
        }
      </SectionContent>
    </>
  );
}
