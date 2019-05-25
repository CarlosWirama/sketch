import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LearnsetItem from './LearnsetItem';

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

const MoveSetTab = styled.div`
  margin-top: 16px;
  font-weight: bold;
`;
