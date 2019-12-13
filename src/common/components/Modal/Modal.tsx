import React, { SyntheticEvent, ReactNode } from 'react';
import { Modal as MaterialUIModal, Backdrop, Fade } from '@material-ui/core';
import styled from 'styled-components';

interface ModalProps {
  isVisible: boolean;
  onClose?: (event: SyntheticEvent<{}, Event>) => void;
  children: ReactNode;
}

export default function Modal({ isVisible, onClose, children }: ModalProps) {
  return (
    <MaterialUIModal
      open={isVisible}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 300 }}
    >
      <Fade in={isVisible}>
        <ModalBackground>
          {children}
        </ModalBackground>
      </Fade>
    </MaterialUIModal>
  );
}

const ModalBackground = styled.div`
  background-color: white;
  border-radius: 8px;
  align-items: center;
  text-align: center;
`;