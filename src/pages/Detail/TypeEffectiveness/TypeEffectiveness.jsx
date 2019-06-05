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
      <div>Weak to:</div>
      <Row>{weak.map(formatEffectiveness)}</Row><br/>
      <div>Resistant to:</div>
      <Row>{resistant.map(formatEffectiveness)}</Row><br/>
      <div>Immune to:</div>
      <Row>{immune.map(formatEffectiveness)}</Row>
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
      ({multiplier}x)
    </Item>
  );
}
