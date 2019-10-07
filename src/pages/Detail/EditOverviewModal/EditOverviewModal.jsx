import React from 'react';
import PropTypes from 'prop-types';
import { FixedActionButton } from '../DetailPageLayout.styled';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import { Modal } from './EditOverviewModal.styled';
import { TypeBalloon } from '../../../common/components/Types/Types.styled';
import { getTypeColor } from '../../../common/components/Types';

export default function EditOverviewModal({
  name,
  isAlolan,
  closeModal,
}) {
  function onClickDone() {
    console.log(name, isAlolan);
    closeModal();
  }

  const savedMoves = [
    {
      name: 'Vine Whip',
      type: 'grass',
    },
    {
      name: 'High Jump Kick',
      type: 'fighting',
    },
    {
      name: 'Dig',
      type: 'ground',
    },
    {
      name: 'Extreme Speed',
      type: 'normal',
    },
  ];

  return (
    <Modal>
      {savedMoves.map((move, index) =>
        <TypeBalloon
          key={index}
          color={getTypeColor(move.type)}
          style={{ minWidth: '18%' }}
        >
          {move.name}
        </TypeBalloon>
      )}
      <FixedActionButton
        onClick={closeModal}
        style={{ bottom: 56, right: 88 }}
      >
        <CloseIcon />
      </FixedActionButton>
      <FixedActionButton
        onClick={onClickDone}
        style={{ bottom: 56 }}
      >
        <DoneIcon />
      </FixedActionButton>
    </Modal>
  );
}

EditOverviewModal.propTypes = {
  name: PropTypes.string.isRequired,
  isAlolan: PropTypes.bool,
};
