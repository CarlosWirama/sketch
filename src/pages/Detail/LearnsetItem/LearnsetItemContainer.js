import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getMoveDescription } from '../../../api/getMoveDetail';
import LearnsetItemLayout from './LearnsetItemLayout';

export default function LearnsetItemContainer({ list: [
  level,
  moveName,
  type,
  category,
  power,
  accuracy,
  pp,
  _,
  stabIndicator,
] }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [description, setDescription] = useState('');

  function toggleExpanded() {
    if(!isExpanded) {
      getMoveDescription(moveName).then(setDescription);
    }
    setIsExpanded(!isExpanded);
  }

  return (
    <LearnsetItemLayout
      level={level}
      moveName={moveName}
      type={type}
      category={category}
      power={power}
      accuracy={accuracy}
      pp={pp}
      stabIndicator={stabIndicator}
      description={description}
      toggleExpanded={toggleExpanded}
      isExpanded={isExpanded}
    />
  );
}

LearnsetItemContainer.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
};
