import React, { useState } from 'react';
import Types from '../../../common/components/Types';
import { SectionTitle } from '../DetailPage.styled';
import Tab from '../../../common/components/Tab';
import { EffectivenessCategory, TypeListContainer } from './TypeEffectiveness.styled';
import Type from '../../../common/constants/Type';
import Effectiveness from '../../../common/types/effectiveness';

export default function TypeEffectiveness({
  immune,
  doubleResistant,
  resistant,
  weak,
  doubleWeak,
}: Effectiveness) {
  const [tab, setTab] = useState(TAB.Weak);
  function showWeak() { setTab(TAB.Weak) }
  function showResist() { setTab(TAB.Resist) }
  function showImmune() { setTab(TAB.Immune) }
  return (
    <>
      <SectionTitle>Type Effectiveness</SectionTitle>
      <div style={{ display: 'flex' }}>
        {weak.length > 0 && (
          <EffectivenessCategory active={tab === TAB.Weak} onClick={showWeak}>
            <Tab>Weak</Tab>
            <TypeListContainer>
              {doubleWeak.map(formatEffectiveness(tab === TAB.Weak))}
              {weak.map(formatEffectiveness(tab === TAB.Weak))}
            </TypeListContainer>
          </EffectivenessCategory>
        )}
        {resistant.length > 0 && (
          <EffectivenessCategory active={tab === TAB.Resist} onClick={showResist}>
            <Tab>Resist</Tab>
            <TypeListContainer>
              {doubleResistant.map(formatEffectiveness(tab === TAB.Resist))}
              {resistant.map(formatEffectiveness(tab === TAB.Resist))}
            </TypeListContainer>
          </EffectivenessCategory>
        )}
        {immune.length > 0 && (
          <EffectivenessCategory active={tab === TAB.Immune} onClick={showImmune}>
            <Tab>Immune</Tab>
            <TypeListContainer>
              {immune.map(formatEffectiveness(tab === TAB.Immune))}
            </TypeListContainer>
          </EffectivenessCategory>
        )}
      </div>
    </>
  );
}

function formatEffectiveness(isTabActive: boolean) {
  return function (type: Type, key: number) {
    return <Types types={[type]} key={key} hideText={!isTabActive}/>;
  }
}

enum TAB { Weak, Resist, Immune }
