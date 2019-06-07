import React from 'react';
import PropTypes from 'prop-types';
import Types from '../../../common/components/Types';
import { SectionTitle } from '../DetailPageLayout.styled';
import { EffectivenessCategory, Item } from './TypeEffectiveness.styled';

export default function TypeEffectiveness({
  normal,
  weak,
  resistant,
  immune,
}) {
  return (
    <div>
      {weak.length > 0 && (
        <div>
          <SectionTitle>Weak to</SectionTitle>
          <EffectivenessCategory>
            {weak.map(formatEffectiveness)}
          </EffectivenessCategory>
        </div>
      )}
      {resistant.length > 0 && (
        <div>
          <SectionTitle>Resistant to:</SectionTitle>
          <EffectivenessCategory>
            {resistant.map(formatEffectiveness)}
          </EffectivenessCategory>
        </div>
      )}
      {immune.length > 0 && (
        <div>
          <SectionTitle>Immune to:</SectionTitle>
          <EffectivenessCategory>
            {immune.map(formatEffectiveness)}
          </EffectivenessCategory>
        </div>
      )}
    </div>
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
  normal: effectivenessPropType,
  resistant: effectivenessPropType,
  immune: effectivenessPropType,
};

function formatEffectiveness([type, multiplier], key) {
  return (
    <Item key={key}>
      <Types types={[type]} />
      {/* ({multiplier}x) */}
    </Item>
  );
}
