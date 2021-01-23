import React from 'react';
import { SectionTitle } from '../DetailPage.styled';
import BaseStatRow from './BaseStatRow';
import { BorderedCard } from '../../../common/components/Card';

interface BaseStatsProps {
  attack: number;
  defense: number;
  hp: number;
  spatk: number;
  spdef: number;
  speed: number;
}

export default function BaseStats({
  attack,
  defense,
  hp,
  spatk,
  spdef,
  speed,
}: BaseStatsProps) {
  return (
    <>
      <SectionTitle>Base Stats</SectionTitle>
      <BorderedCard style={{}}>
        <BaseStatRow color="#FF0000" name="HP" value={hp} />
        <BaseStatRow color="#F08030" name="Attack" value={attack} />
        <BaseStatRow color="#F8D030" name="Defense" value={defense} />
        <BaseStatRow color="#6890F0" name="Sp. Atk" value={spatk} />
        <BaseStatRow color="#78C850" name="Sp. Def" value={spdef} />
        <BaseStatRow color="#F85888" name="Speed" value={speed} />
      </BorderedCard>
    </>
  );
}
