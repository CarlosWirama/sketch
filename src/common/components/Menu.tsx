import React, { useState } from 'react';
import MaterialUiMenu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import styled from 'styled-components';
import { pixel } from '../../common/theme';

export default function Menu() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleOpen = (event: MouseEvent<HTMLElement, MouseEvent>): void => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleOpen}
      >
        <AddIcon />
      </IconButton>
      <MaterialUiMenu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            backgroundColor: 'lightyellow',
            borderRadius: pixel.borderRadius,
          },
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <MenuItem onClick={handleClose}>
            choice 1
          </MenuItem>
          <MenuItem onClick={handleClose}>
            choice 2
          </MenuItem>
          <MenuItem onClick={handleClose}>
            choice 2
          </MenuItem>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <MenuItem onClick={handleClose}>
            choice 1
          </MenuItem>
          <MenuItem onClick={handleClose}>
            choice 2
          </MenuItem>
        </div>
      </MaterialUiMenu>
    </>
  );
}

const Box = styled.div<{ isVisible: boolean }>`
  background-color: yellow;
  border-radius: ${pixel.borderRadius}px;
`;
