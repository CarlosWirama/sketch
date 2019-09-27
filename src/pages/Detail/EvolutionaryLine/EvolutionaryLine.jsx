import React from 'react';
import { SectionTitle } from '../DetailPageLayout.styled';
import { SectionContent, StageCard, PixelImage } from './EvolutionaryLine.styled';
import { getTypeColor } from '../../../common/components/Types';

export default function EvolutionaryLine({ pokemonName, stages, onClickStage }) {
  return (
    <>
      <SectionTitle>Evolution</SectionTitle>
      <SectionContent>
        {stages.length > 1
          ? stages.map(({ name, evolutionMethod, types, isAlolan }, key) => (
            <StageCard
              key={key}
              onClick={() => name !== pokemonName
                && onClickStage((isAlolan ? 'Alolan_' : '') + name)
              }
              color={getTypeColor(types[0])}
              color2={types[1] && getTypeColor(types[1])}
            >
              <PixelImage pokemonName={name} isAlolan />
              <div>{name === pokemonName ? <b>{name}</b> : name}</div>
              <div>{evolutionMethod}</div>
            </StageCard>
          ))
          : "Doesn't evolve from, and won't evolve to another pokémon"
        }
      </SectionContent>
    </>
  );
}
