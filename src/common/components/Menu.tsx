import React, { useState } from 'react';
import MaterialUiMenu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { pixel } from '../../common/theme';

export default function Menu() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleOpen = (event: any): void => setAnchorEl(event.currentTarget);
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
        <div>
          menu content here
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <MenuItem
            onClick={handleClose}
            style={{
              flex: 1,
              backgroundColor: '#ff000088',
            }}
          >
            choice 1
          </MenuItem>
          <MenuItem
            onClick={handleClose}
            style={{
              flex: 1,
              backgroundColor: 'lightgreen',
            }}
          >
            choice 2
          </MenuItem>
        </div>
      </MaterialUiMenu>
    </>
  );
}
