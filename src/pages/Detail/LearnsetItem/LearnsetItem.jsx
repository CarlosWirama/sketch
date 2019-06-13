import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Types, { getTypeColor } from '../../../common/components/Types';
import { TypeBaloon } from '../../../common/components/Types/Types.styled';
import MoveCategoryIcon from '../../../common/components/MoveCategoryIcon';
import ExpandMore from '@material-ui/icons/ExpandMore';
// import StabInfo from './StabInfo';
import {
  Container,
  Move,
  Level,
  Name,
  SubInfo,
  Collapse,
  ExpansionToggle,
  ExpandIconContainer,
  DetailGrid,
  DetailLabels,
  DetailValues,
} from './LearnsetItem.styled';

export default function LearnsetItem({ list: [
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
  function toggleExpanded() {
    setIsExpanded(!isExpanded);
  }
  return (
    <Container>
      <Level>{level}</Level>
      <Move color={getTypeColor(type)} onClick={toggleExpanded} >
        <Name>{moveName}</Name>
        <SubInfo>
          <Types types={[type]} />
          <TypeBaloon color={getCategoryColor(category)}>
            <MoveCategoryIcon category={category} />
            {category}
            {category !== 'Status' && <span>:&nbsp;{encodeDash(power)}</span>}
          </TypeBaloon>
        </SubInfo>
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <DetailGrid>
            <DetailLabels>
              <div>Accuracy</div>
              <div>PP</div>
            </DetailLabels>
            <DetailValues>
              <div>{encodeDash(accuracy)}%</div>
              <div>{pp}</div>
            </DetailValues>
          </DetailGrid>
        </Collapse>
        <ExpansionToggle>
          {isExpanded ? 'hide' : 'show'} details...
          <ExpandIconContainer isExpanded={isExpanded}>
            <ExpandMore/>
          </ExpandIconContainer>
        </ExpansionToggle>
      </Move>
    </Container>
  );
}

LearnsetItem.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
};

function encodeDash(string) {
  return string === '&mdash;' ? '-' : string;
}

function getCategoryColor(category) {
  switch (category) {
    case 'Physical': return '#ff4400';
    case 'Special': return '#2266cc';
    case 'Status': return '#999999';
    default: return 'transparent';
  }
}
