import React from 'react';
import { Category } from '../../types/move';
import {
  PhysicalContainer,
  PhysicalStarVerticalHorizontal,
  PhysicalStarDiagonal,
  Special,
  Status,
} from './MoveCategoryIcon.styled';

interface MoveCategoryIconProps {
  category: Category;
}

export default function MoveCategoryIcon({
  category,
  ...props
}: MoveCategoryIconProps) {
  switch (category) {
    case 'Physical': return <Physical {...props} />;
    case 'Special': return <Special {...props} />;
    case 'Status': return <Status {...props} />;
    default: return null;
  }
}

function Physical(props: any) {
  return (
    <PhysicalContainer {...props}>
      <PhysicalStarVerticalHorizontal />
      <PhysicalStarDiagonal />
    </PhysicalContainer>
  );
}
