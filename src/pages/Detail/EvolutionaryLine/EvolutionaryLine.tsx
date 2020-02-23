import React from 'react';
import { SectionTitle } from '../DetailPage.styled';
import { SectionContent, StageCard } from './EvolutionaryLine.styled';
import { getTypeColor } from '../../../common/components/Types';
import { getPixelImage } from '../../../api/spriteApi';
import EvolutionStage from '../../../common/types/evolutionStage';

interface EvolutionaryLineProps {
  pokemonName: string;
  stages: EvolutionStage[];
  onClickStage: (pokemonName: string) => void;
}
export default function EvolutionaryLine({ pokemonName, stages, onClickStage }: EvolutionaryLineProps) {
  return (
    <>
      <SectionTitle>Evolution</SectionTitle>
      <SectionContent>
        {stages.map(({ nDex, name, evolutionMethod, types, form }, key) => (
          <StageCard
            key={key}
            onClick={() => name !== pokemonName
              && onClickStage(form ? `${form}_${name}` : name)
            }
            color={getTypeColor(types[0])}
            color2={types[1] && getTypeColor(types[1])}
          >
            <img src={getPixelImage(nDex, form)} />
            <div>{name === pokemonName ? <b>{name}</b> : name}</div>
            <div>{evolutionMethod}</div>
          </StageCard>
        ))}
      </SectionContent>
    </>
  );
}
