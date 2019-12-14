import React from 'react';
import { SectionTitle } from '../DetailPage.styled';
import BaseStatRow from './BaseStatRow';

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
      <BaseStatRow color="#FF0000" name="hp" value={hp} />
      <BaseStatRow color="#F08030" name="attack" value={attack} />
      <BaseStatRow color="#F8D030" name="defense" value={defense} />
      <BaseStatRow color="#6890F0" name="spatk" value={spatk} />
      <BaseStatRow color="#78C850" name="spdef" value={spdef} />
      <BaseStatRow color="#F85888" name="speed" value={speed} />
    </>
  );
}
