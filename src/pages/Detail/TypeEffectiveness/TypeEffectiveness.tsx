import React, { useState } from 'react';
import Types from '../../../common/components/Types';
import { SectionTitle } from '../DetailPage.styled';
import Tab from '../../../common/components/Tab';
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
  const [tab, setTab] = useState(TAB.Weakness);
  function showWeakness() { setTab(TAB.Weakness) }
  function showResistant() { setTab(TAB.Resistant) }
  function showImmune() { setTab(TAB.Immune) }
  return (
    <>
      <SectionTitle>Type Effectiveness</SectionTitle>
      <div style={{ display: 'flex' }}>
        {weak.length > 0 && <Tab onClick={showWeakness}>Weakness</Tab>}
        {resistant.length > 0 && <Tab onClick={showResistant}>Resistant</Tab>}
        {immune.length > 0 && <Tab onClick={showImmune}>Immune</Tab>}
      </div>
      <EffectivenessCategory>
        {tab === TAB.Weakness && (
          <>
            {doubleWeak.map(formatEffectiveness)}
            {weak.map(formatEffectiveness)}
          </>
        )}
        {tab === TAB.Resistant && (
          <>
            {doubleResistant.map(formatEffectiveness)}
            {resistant.map(formatEffectiveness)}
          </>
        )}
        {tab === TAB.Immune && immune.map(formatEffectiveness)}
      </EffectivenessCategory>
    </>
  );
}

function formatEffectiveness(type: Type, key: number) {
  return <Types types={[type]} key={key}/>;
}

enum TAB { Weakness, Resistant, Immune }
