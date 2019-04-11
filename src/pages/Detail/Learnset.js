import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  MoveSetTab,
  Container,
  Move,
  Header,
  Level,
  Name,
  Type,
  Category,
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
      <Move type={type}>
        <Header>
          <Name>{moveName}</Name>
          <Type>{type}</Type>
          <Category>{category}</Category>
        </Header>
        <Header>
          <div>Power: {encodeDash(power)}</div>
          <div>Accuracy: {encodeDash(acc)}</div>
          <div>PP: {pp}</div>
        </Header>
      </Move>
    </Container>
  );
}

LearnsetItem.propTypes = {
  list: PropTypes.array.isRequired,
};
