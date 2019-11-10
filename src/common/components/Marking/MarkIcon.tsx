import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { Marking } from './types';
import { MarkingConstant } from './enums';
import { SvgIconProps } from '@material-ui/core/SvgIcon';

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

interface MarkIconProps {
  markKey: keyof Marking;
  markValue: MarkingConstant;
  onMark: (markKey: keyof Marking) => void;
  style?: any; // can't find any suitable type
}

export default function MarkIcon({
    markKey,
    markValue,
    onMark,
    ...props
}: MarkIconProps) {
  const useBordered = markValue === MarkingConstant.UNMARKED;
  let Icon: React.ComponentType<SvgIconProps>;
  switch (markKey) {
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
    <IconButton onClick={() => onMark(markKey)}>
      <Icon {...props} />
    </IconButton>
  );
}
