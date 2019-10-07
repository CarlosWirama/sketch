import React from 'react';
import PropTypes from 'prop-types';
import { FixedActionButton } from '../DetailPageLayout.styled';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import { Modal } from './EditOverviewModal.styled';
import { TypeBalloon } from '../../../common/components/Types/Types.styled';
import { getTypeColor } from '../../../common/components/Types';

export default function EditOverviewModal({ savedMoves, onCancel, onSave }) {
  function constructOnSavedMoveClicked(name) {
    return () => document.querySelector(`.${name}`).scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }

  return (
    <Modal>
      {savedMoves.map(({ name, type }, index) => (
        <TypeBalloon
          key={index}
          color={getTypeColor(type)}
          style={{ minWidth: '18%' }}
          onClick={constructOnSavedMoveClicked(name)}
        >
          {name}
        </TypeBalloon>
      ))}
      <FixedActionButton
        onClick={onCancel}
        style={{ bottom: 56, right: 88 }}
      >
        <CloseIcon />
      </FixedActionButton>
      <FixedActionButton
        onClick={onSave}
        style={{ bottom: 56 }}
      >
        <DoneIcon />
      </FixedActionButton>
    </Modal>
  );
}

EditOverviewModal.propTypes = {
  savedMoves: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};
