import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from './EditOverviewModal.styled';
import { TypeBalloon } from '../../../common/components/Types/Types.styled';
import { getTypeColor } from '../../../common/components/Types';

export default function EditOverviewModal({ choosenMoves }) {
  function constructOnChooseMoveClicked(name) {
    const className = `.${name.replace(' ', '-')}`;
    return () => document.querySelector(className).scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }

  return (
    <Modal>
      {choosenMoves.map(({ name, type }, index) => (
        <TypeBalloon
          key={index}
          color={getTypeColor(type)}
          style={{
            minWidth: '18%',
            paddingHorizontal: 4,
            textTransform: 'capitalize',
          }}
          onClick={constructOnChooseMoveClicked(name)}
        >
          {name}
        </TypeBalloon>
      ))}
    </Modal>
  );
}

EditOverviewModal.propTypes = {
  choosenMoves: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired,
};
