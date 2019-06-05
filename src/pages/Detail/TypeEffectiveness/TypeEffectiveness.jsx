import React from 'react';
import PropTypes from 'prop-types';
import Types from '../../../common/components/Types';
import { Item, Row } from './TypeEffectiveness.styled';

export default function TypeEffectiveness({
  normal,
  weak,
  resistant,
  immune,
}) {
  return (
    <div>
      {weak.length > 0 && (
        <Row>
          <div>Weak to:</div>
          {weak.map(formatEffectiveness)}
        </Row>
      )}
      <br/>
      {resistant.length > 0 && (
        <Row>
          <div>Resistant to:</div>
          {resistant.map(formatEffectiveness)}
        </Row>
      )}
      <br/>
      {immune.length > 0 && (
        <Row>
          <div>Immune to:</div>
          {immune.map(formatEffectiveness)}
        </Row>
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
