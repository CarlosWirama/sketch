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

interface Marking {
  pokeball: MarkingConstant;
  bigstar: MarkingConstant;
  circle: MarkingConstant;
  triangle: MarkingConstant;
  star: MarkingConstant;
  heart: MarkingConstant;
  square: MarkingConstant;
  diamond: MarkingConstant;
}

const defaultMarking: Marking = {
  pokeball: MarkingConstant.UNMARKED,
  bigstar: MarkingConstant.UNMARKED,
  circle: MarkingConstant.UNMARKED,
  triangle: MarkingConstant.UNMARKED,
  star: MarkingConstant.UNMARKED,
  heart: MarkingConstant.UNMARKED,
  square: MarkingConstant.UNMARKED,
  diamond: MarkingConstant.UNMARKED,
};

export default function Menu() {
  const [marks, setMarks] = useState(defaultMarking);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleOpen = (event: any): void => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const markingIcons = { // TODO later change this strings into icons
    pokeball: '',
    bigstar: '',
    circle: '',
    triangle: '',
    star: '',
    heart: '',
    square: '',
    diamond: '',
  };
  function getMarkColor(markValue: MarkingConstant): Color {
    switch (MarkingConstant[markValue]) {
      // case MarkingConstant.BLUE_MARK: return 'blue';
      case 'BLUE_MARK': return 'blue';
      case 'RED_MARK': return 'red';
      default: return 'lightgray';
    }
  }

  function onMark(markName: keyof Marking): void {
    const currMarkValue = marks[markName];
    const newMarkValue: MarkingConstant = (currMarkValue + 1) % 3;
    setMarks({
      ...marks,
      [markName]: newMarkValue,
    });
  }

  const markEntries = Object.entries(marks) as Array<
    [keyof Marking, MarkingConstant]
  >;

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
          {markEntries.map(([markKey, markValue]) => (
            <IconButton onClick={() => onMark(markKey)} key={markKey}>
              {(markValue === MarkingConstant.UNMARKED)
                ? <StarBorderIcon />
                : <StarIcon style={{ color: getMarkColor(markValue) }}/>
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
