import React from 'react';
import PropTypes from 'prop-types';
import Types from '../../../common/components/Types';
import { SectionTitle } from '../DetailPage.styled';
import { EffectivenessCategory, Item } from './TypeEffectiveness.styled';

export default function TypeEffectiveness({
  immune,
  doubleResistant,
  resistant,
  weak,
  doubleWeak,
}) {
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

const effectivenessPropType = PropTypes.arrayOf(
  PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ])
  )
).isRequired;

TypeEffectiveness.propTypes = {
  weak: effectivenessPropType,
  resistant: effectivenessPropType,
  immune: effectivenessPropType,
};

function formatEffectiveness(type, key) {
  return (
    <Item key={key}>
      <Types types={[type]} />
    </Item>
  );
}
