import React, { SyntheticEvent } from 'react';
import { Modal as MaterialUIModal, Backdrop, Fade } from '@material-ui/core';

interface ModalProps {
  isVisible: boolean;
  onClose?: (event: SyntheticEvent<{}, Event>) => void;
}

export default function Modal({ isVisible, onClose }: ModalProps) {
  return (
    <MaterialUIModal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isVisible}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={isVisible}>
        <div>
          <h2 id="transition-modal-title">Transition modal</h2>
          <p id="transition-modal-description">react-transition-group animates me.</p>
        </div>
      </Fade>
    </MaterialUIModal>
  );
}
