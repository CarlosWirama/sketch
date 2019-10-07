import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getMoveDescription } from '../../../api/getMoveDetail';
import LearnsetItemLayout from './LearnsetItemLayout';

export default function LearnsetItemContainer({
  list: [
    level,
    name,
    type,
    category,
    power,
    accuracy,
    pp,
    _,
    stabIndicator,
  ],
  isEditingActive,
  isMoveSaved,
  toggleSaveMove,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [description, setDescription] = useState('');

  function toggleExpanded() {
    if(!isExpanded) {
      getMoveDescription(name).then(setDescription);
    }
    setIsExpanded(!isExpanded);
  }

  return (
    <LearnsetItemLayout
      level={level}
      name={name}
      type={type}
      category={category}
      power={power}
      accuracy={accuracy}
      pp={pp}
      stabIndicator={stabIndicator}
      description={description}
      toggleExpanded={toggleExpanded}
      isExpanded={isExpanded}
      isEditingActive={isEditingActive}
      toggleSaveMove={toggleSaveMove}
      isMoveSaved={isMoveSaved}
    />
  );
}

LearnsetItemContainer.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  isEditingActive: PropTypes.bool.isRequired,
  isMoveSaved: PropTypes.bool.isRequired,
  toggleSaveMove: PropTypes.func.isRequired,
};
