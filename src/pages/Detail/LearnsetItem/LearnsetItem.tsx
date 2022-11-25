import React, { useState } from 'react';
import { getMoveDescription } from '../../../api/getMoveDetail';

import { TypeIcons, getTypeColor } from '../../../common/components/Types';
import MoveCategoryIcon from '../../../common/components/MoveCategoryIcon';
import { default as LoadingIndicator }
  from '../../../common/components/PokeballLoadingIndicator';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
// import StabInfo from './StabInfo';
import {
  Container,
  Move,
  LevelCircle,
  Header,
  Name,
  IconButton,
  Collapse,
  Description,
  DetailLabels,
  DetailValues,
  Flex,
} from './LearnsetItem.styled';

// types
import Type from '../../../common/constants/Type';
import { MoveItem, RawMove } from '../../../common/types';


export default function LearnsetItem({
  list: [
    level,
    name,
    rawType,
    category,
    power,
    accuracy,
    pp,
    _,
    stabIndicator,
  ],
  isEditingActive,
  isMoveChoosen,
  toggleChoosenMove,
}: {
  list: RawMove;
  isEditingActive: boolean;
  isMoveChoosen: boolean;
  toggleChoosenMove: (move: MoveItem) => void;
}) {
  const type = rawType.toLowerCase() as Type;
  const [isExpanded, setIsExpanded] = useState(false);
  const [description, setDescription] = useState('');

  function toggleExpanded() {
    if(!isExpanded) {
      getMoveDescription(name).then(setDescription);
    }
    setIsExpanded(!isExpanded);
  }

  function onChooseMoveClick(event: any) {
    event.stopPropagation();
    toggleChoosenMove({ name, type });
  }

  const hasVerticalConnector = (level !== '') && !isNaN(Number(level));
  return (
    <Container
      className={name.replace(' ', '-')}
      hasVerticalConnector={hasVerticalConnector}
    >
      {level && <LevelCircle>{level}</LevelCircle>}
      <Move color={getTypeColor(type)} onClick={toggleExpanded} >
        <Header>
          <Flex>
            <img src={TypeIcons[type]} alt={type} width={20} height={20} />
            <Name>{name}</Name>
          </Flex>
          <Flex>
            <MoveCategoryIcon category={category} />
            {category !== 'Status' && <span>{encodeDash(power)}</span>}
            {isEditingActive && (
              <IconButton onClick={onChooseMoveClick}>
                {isMoveChoosen ? <StarIcon /> : <StarBorderIcon />}
              </IconButton>
            )}
          </Flex>
        </Header>
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <Description>
            {description || (
              <LoadingIndicator size={57} background={getTypeColor(type)} color="white"/>
            )}
          </Description>
          <Flex>
            <DetailLabels>
              <div>Type</div>
              <div>Category</div>
              <div>Accuracy</div>
              <div>PP</div>
            </DetailLabels>
            <DetailValues>
              <div>{type}</div>
              <div>{category}</div>
              <div>{encodeDash(accuracy)}%</div>
              <div>{pp}</div>
            </DetailValues>
          </Flex>
        </Collapse>
      </Move>
    </Container>
  );
}

function encodeDash(string: string) {
  return string === '&mdash;' ? '-' : string;
}
