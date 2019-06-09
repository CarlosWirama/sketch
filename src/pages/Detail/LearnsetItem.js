import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Types, { getTypeColor } from '../../common/components/Types';
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
          <div>
            &nbsp;&nbsp;{category}
            {category !== 'Status' && <span>:&nbsp;{encodeDash(power)}</span>}
          </div>
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
