import React from 'react';
import Types from '../../../common/components/Types';
import { SectionTitle } from '../DetailPage.styled';
import { EffectivenessCategory } from './TypeEffectiveness.styled';
import Type from '../../../common/constants/Type';
import Effectiveness from '../../../common/types/effectiveness';

export default function TypeEffectiveness({
  immune,
  doubleResistant,
  resistant,
  weak,
  doubleWeak,
}: Effectiveness) {
  return (
    <>
      {weak.length > 0 && (
        <div>
          <SectionTitle>Weak to</SectionTitle>
          <EffectivenessCategory>
            {doubleWeak.map(formatEffectiveness)}
            {weak.map(formatEffectiveness)}
          </EffectivenessCategory>
        </div>
      )}
      {resistant.length > 0 && (
        <div>
          <SectionTitle>Resistant to</SectionTitle>
          <EffectivenessCategory>
            {doubleResistant.map(formatEffectiveness)}
            {resistant.map(formatEffectiveness)}
          </EffectivenessCategory>
        </div>
      )}
      {immune.length > 0 && (
        <div>
          <SectionTitle>Immune to</SectionTitle>
          <EffectivenessCategory>
            {immune.map(formatEffectiveness)}
          </EffectivenessCategory>
        </div>
      )}
    </>
  );
}

function formatEffectiveness(type: Type, key: number) {
  return <Types types={[type]} key={key}/>;
}
