import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { MarkingConstant } from './enums';
import { Color } from 'csstype';

import Pokeball from '@material-ui/icons/Android';
import PokeballOutline from '@material-ui/icons/Android';
import Bigstar from '@material-ui/icons/Android';
import BigstarOutline from '@material-ui/icons/Android';
import Circle from '@material-ui/icons/Lens';
import CircleOutline from '@material-ui/icons/RadioButtonUnchecked';
import Triangle from '@material-ui/icons/Android';
import TriangleOutline from '@material-ui/icons/ChangeHistory';
import Star from '@material-ui/icons/Star';
import StarOutline from '@material-ui/icons/StarBorder';
import Heart from '@material-ui/icons/Favorite';
import HeartOutline from '@material-ui/icons/FavoriteBorder';
import Square from '@material-ui/icons/Android';
import SquareOutline from '@material-ui/icons/CheckBoxOutlineBlank';
import Diamond from '@material-ui/icons/Bookmark';
import DiamondOutline from '@material-ui/icons/BookmarkBorder';
import { SvgIconProps } from '@material-ui/core/SvgIcon';

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

export default function Marking() {
  const [marks, setMarks] = useState(defaultMarking);

  function getMarkColor(markValue: MarkingConstant): Color {
    switch (markValue) {
      case MarkingConstant.BLUE_MARK: return 'blue';
      case MarkingConstant.RED_MARK: return 'red';
      default: return 'darkgray-3';
    }
  }

  function onMark(markKey: keyof Marking): void {
    const currMarkValue = marks[markKey];
    const newMarkValue: MarkingConstant = (currMarkValue + 1) % 3;
    setMarks({
      ...marks,
      [markKey]: newMarkValue,
    });
  }

  const markEntries = Object.entries(marks) as Array<
    [keyof Marking, MarkingConstant]
  >;

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row' }}>
        {markEntries.map(([markKey, markValue]) => (
          <MarkIcon
            key={markKey}
            markKey={markKey}
            markValue={markValue}
            onMark={onMark}
            style={{ color: getMarkColor(markValue) }}
          />
        ))}
    </div>
  );
}


function MarkIcon({ markKey, markValue, onMark, ...props }: MarkIconProps) {
  const useBordered = markValue === MarkingConstant.UNMARKED;
  let Icon: React.ComponentType<SvgIconProps>;
  switch (markKey) {
    case 'pokeball': Icon = useBordered ? PokeballOutline : Pokeball; break;
    case 'bigstar': Icon = useBordered ? BigstarOutline : Bigstar; break;
    case 'circle': Icon = useBordered ? CircleOutline : Circle; break;
    case 'triangle': Icon = useBordered ? TriangleOutline : Triangle; break;
    case 'star': Icon = useBordered ? StarOutline : Star; break;
    case 'heart': Icon = useBordered ? HeartOutline : Heart; break;
    case 'square': Icon = useBordered ? SquareOutline : Square; break;
    case 'diamond': Icon = useBordered ? DiamondOutline : Diamond; break;
    default: Icon = useBordered ? PokeballOutline : Pokeball;
  }
  return (
    <IconButton onClick={() => onMark(markKey)} key={markKey}>
      <Icon {...props} />
    </IconButton>
  );
}

interface MarkIconProps {
  markKey: keyof Marking;
  markValue: MarkingConstant;
  onMark: (markKey: keyof Marking) => void;
  style?: any; // can't find any suitable type
}
