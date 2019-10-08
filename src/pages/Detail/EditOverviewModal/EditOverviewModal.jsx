import React from 'react';
import PropTypes from 'prop-types';
import { FixedActionButton } from '../DetailPageLayout.styled';
import DoneIcon from '@material-ui/icons/Done';
import { Modal } from './EditOverviewModal.styled';
import { TypeBalloon } from '../../../common/components/Types/Types.styled';
import { getTypeColor } from '../../../common/components/Types';

export default function EditOverviewModal({ savedMoves, onSave }) {
  function constructOnSavedMoveClicked(name) {
    const className = `.${name.replace(' ', '-')}`;
    return () => document.querySelector(className).scrollIntoView({
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
          style={{
            minWidth: '18%',
            paddingHorizontal: 4,
            textTransform: 'capitalize',
          }}
          onClick={constructOnSavedMoveClicked(name)}
        >
          {name}
        </TypeBalloon>
      ))}
      <FixedActionButton onClick={onSave} style={{ top: -28 }} >
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
  onSave: PropTypes.func.isRequired,
};
