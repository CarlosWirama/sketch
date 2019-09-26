import React from 'react';
import { SectionTitle } from '../DetailPageLayout.styled';
import { SectionContent, StageCard } from './EvolutionaryLine.styled';
import { getTypeColor } from '../../../common/components/Types';

export default function EvolutionaryLine({ stages, onClickStage }) {
  return (
    <>
      <SectionTitle>Evolution</SectionTitle>
      <SectionContent>
        {stages.length > 1
          ? stages.map(({ name, evolutionMethod, types }, key) => (
            <StageCard
              key={key}
              onClick={() => onClickStage(name)}
              color={getTypeColor(types[0])}
              color2={types[1] && getTypeColor(types[1])}
            >
              {name}<br/>{evolutionMethod}
            </StageCard>
          ))
          : "Doesn't evolve from, and won't evolve to another pokémon"
        }
      </SectionContent>
    </>
  );
}
