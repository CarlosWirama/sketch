import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Types, { getTypeColor } from '../../common/components/Types';
import ExpandMore from '@material-ui/icons/ExpandMore';
import {
  MoveSetTab,
  Container,
  Move,
  Header,
  Level,
  Name,
  Collapse,
  // ExpandIcon,
  ShowDetails,
  ExpandIconContainer,
} from './Learnset.styled';

export default function Learnset({ learnset }) {
  return (
    <Fragment>
      <MoveSetTab>Moves by leveling up</MoveSetTab>
        { learnset.map(({ list }, i) =>
          <LearnsetItem key={i} list={list} />
        )}
    </Fragment>
  );
}

Learnset.propTypes = {
  learnset: PropTypes.arrayOf(
    PropTypes.shape({
      list: PropTypes.array.isRequired,
    }).isRequired
  ).isRequired,
};

function LearnsetItem({ list }) {
  function encodeDash(string) {
    return string === '&mdash;' ? '-' : string;
  }
  function indicateStab(stabIndicator) {
    switch (stabIndicator) {
      case `''`: return 2; // get STAB after evolution
      case `'''`: return 1; // get STAB
      default: return 0;
    }
  }
  const [isExpanded, setIsExpanded] = useState(false);
  function toggleExpanded() {
    setIsExpanded(!isExpanded);
  }
  const [
    level,
    moveName,
    type,
    category,
    power,
    accuracy,
    pp,
    _,
    stabIndicator,
  ] = list;
  return (
    <Container>
      <Level>{level}</Level>
      <Move
        color={getTypeColor(type)}
        onClick={toggleExpanded}
      >
        <Header>
          <Name>{moveName}</Name>
          <div>{category}</div>
          {category !== 'Status' && <div>&nbsp;{encodeDash(power)}</div>}
        </Header>
        <Types types={[type]} />
        <ShowDetails>
          {isExpanded ? 'hide' : 'show'} details...
          <ExpandIconContainer isExpanded={isExpanded}>
            <ExpandMore/>
          </ExpandIconContainer>
        </ShowDetails>
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <div>
            <div>Power: {encodeDash(power)}</div>
            <div>Accuracy: {encodeDash(accuracy)}%</div>
            <div>PP: {pp}</div>
            <div>Type: {type}</div>
            <div>Category: {category}</div>
          </div>
        </Collapse>
      </Move>
    </Container>
  );
}

LearnsetItem.propTypes = {
  list: PropTypes.array.isRequired,
};
