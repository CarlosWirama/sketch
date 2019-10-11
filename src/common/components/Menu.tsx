import React, { useState } from 'react';
import MaterialUiMenu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { pixel } from '../../common/theme';
import { MarkingConstant } from './Marking';
import { Color } from 'csstype';

interface MenuProps {
  markings: MarkingConstant[];
  onMark: (markingIndex: number) => void;
}

export default function Menu({ markings, onMark }: MenuProps) {
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const handleOpen = (event: any): void => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const markingIcons = [ // TODO later change this strings into icons
    'pokeball',
    'bigstar',
    'circle',
    'triangle',
    'star',
    'heart',
    'square',
    'diamond',
  ];
  function getMarkingColor(marking: MarkingConstant): Color {
    switch (MarkingConstant[marking]) {
      // case MarkingConstant.BLUE_MARK: return 'blue';
      case 'BLUE_MARK': return 'blue';
      case 'RED_MARK': return 'red';
      default: return 'lightgray';
    }
  }
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
          {markings.map((marking, key) => (
            <IconButton onClick={() => onMark(key)} key={key}>
              {(MarkingConstant[marking] === 'UNMARKED')
                ? <StarBorderIcon />
                : <StarIcon style={{ color: getMarkingColor(marking) }}/>
              }
            </IconButton>
          ))}
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
