import React from 'react';
import { SectionTitle } from '../DetailPage.styled';
import BaseStatRow from './BaseStatRow';
import { BorderedCard } from '../../../common/components/Card';
import IBaseStats from '../../../common/types/baseStats';
import { getStatColor } from '../helper';

export default function BaseStats({
  attack,
  defense,
  hp,
  spatk,
  spdef,
  speed,
}: IBaseStats) {
  return (
    <>
      <SectionTitle>Base Stats</SectionTitle>
      <BorderedCard>
        <BaseStatRow color={getStatColor('hp')} name="HP" value={hp} />
        <BaseStatRow color={getStatColor('at')} name="Attack" value={attack} />
        <BaseStatRow color={getStatColor('de')} name="Defense" value={defense} />
        <BaseStatRow color={getStatColor('sa')} name="Sp. Atk" value={spatk} />
        <BaseStatRow color={getStatColor('sd')} name="Sp. Def" value={spdef} />
        <BaseStatRow color={getStatColor('sp')} name="Speed" value={speed} />
      </BorderedCard>
    </>
  );
}
