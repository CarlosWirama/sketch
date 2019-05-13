import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import {
  MoveSetTab,
  Container,
  Move,
  Header,
  Level,
  Name,
  Details,
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
  const [
    level,
    moveName,
    type,
    category,
    power,
    acc,
    pp,
    _,
    stabIndicator,
  ] = list;
  return (
    <Container>
      <Level>{level}</Level>
      <Move type={type} onClick={() => setIsExpanded(!isExpanded)}>
        <Header>
          <Name>{moveName}</Name>
          <div>{category}</div>
          {category !== 'Status' && <div>{encodeDash(power)}</div>}
        </Header>
        <Details isExpanded={isExpanded}>
          {/* <div>Type: {type}</div> */}
          <div>Accuracy: {encodeDash(acc)}</div>
          <div>PP: {pp}</div>
        </Details>
      </Move>
    </Container>
  );
}

LearnsetItem.propTypes = {
  list: PropTypes.array.isRequired,
};
