import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Types, { getTypeColor } from '../../common/components/Types';
import ExpandMore from '@material-ui/icons/ExpandMore';
import {
  Container,
  Move,
  Header,
  Level,
  Name,
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
        <Header>
          <Name stabIndicator={stabIndicator}>{moveName}</Name>
          <div>{category}</div>
          {category !== 'Status' && <div>&nbsp;{encodeDash(power)}</div>}
        </Header>
        <Types types={[type]} />
        <ExpansionToggle>
          {isExpanded ? 'hide' : 'show'} details...
          <ExpandIconContainer isExpanded={isExpanded}>
            <ExpandMore/>
          </ExpandIconContainer>
        </ExpansionToggle>
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <DetailGrid>
            <DetailLabels>
              <div>Power</div>
              <div>Accuracy</div>
              <div>PP</div>
              <div>Type</div>
              <div>Category</div>
            </DetailLabels>
            <DetailValues>
              <div>{encodeDash(power)}</div>
              <div>{encodeDash(accuracy)}%</div>
              <div>{pp}</div>
              <div>{type}</div>
              <div>{category}</div>
            </DetailValues>
          </DetailGrid>
        </Collapse>
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
