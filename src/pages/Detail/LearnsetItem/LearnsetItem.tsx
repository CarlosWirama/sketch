import React, { useState } from 'react';
import { getMoveDescription } from '../../../api/getMoveDetail';
import { MoveItem } from '../../../common/types/partyType';

import ExpandMore from '@material-ui/icons/ExpandMore';
import Types, { getTypeColor } from '../../../common/components/Types';
import { TypeBalloon } from '../../../common/components/Types/Types.styled';
import MoveCategoryIcon from '../../../common/components/MoveCategoryIcon';
import { default as LoadingIndicator }
  from '../../../common/components/PokeballLoadingIndicator';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
// import StabInfo from './StabInfo';
import {
  Container,
  Move,
  Level,
  Headline,
  Name,
  IconButton,
  SubInfo,
  Collapse,
  ExpansionToggle,
  ExpandIconContainer,
  Description,
  DetailGrid,
  DetailLabels,
  DetailValues,
} from './LearnsetItem.styled';
import Type from '../../../common/constants/Type';
import { Category } from '../../../common/types/move';

export default function LearnsetItem({
  list: [
    level,
    name,
    type,
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
  list: [string, string, Type, Category, string, string, string, string?, string?];
  isEditingActive: boolean;
  isMoveChoosen: boolean;
  toggleChoosenMove: (move: MoveItem) => void;
}) {
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
      {level && <Level>{level}</Level>}
      <Move color={getTypeColor(type)} onClick={toggleExpanded} >
        <Headline>
          <Name>{name}</Name>
          {isEditingActive && (
            <IconButton onClick={onChooseMoveClick}>
              {isMoveChoosen ? <StarIcon /> : <StarBorderIcon />}
            </IconButton>
          )}
        </Headline>
        <SubInfo>
          <Types types={[type]} />
          <TypeBalloon color={getCategoryColor(category)}>
            <MoveCategoryIcon category={category} />
            {category}
            {category !== 'Status' && <span>:&nbsp;{encodeDash(power)}</span>}
          </TypeBalloon>
        </SubInfo>
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <Description>
            {description || (
              <LoadingIndicator size={57} background={getTypeColor(type)} color="white"/>
            )}
          </Description>
          <DetailGrid>
            <DetailLabels>
              <div>Accuracy</div>
              <div>PP</div>
            </DetailLabels>
            <DetailValues>
              <div>{encodeDash(accuracy)}%</div>
              <div>{pp}</div>
            </DetailValues>
          </DetailGrid>
        </Collapse>
        <ExpansionToggle>
          {isExpanded ? 'hide' : 'show'} details...
          <ExpandIconContainer isExpanded={isExpanded}>
            <ExpandMore/>
          </ExpandIconContainer>
        </ExpansionToggle>
      </Move>
    </Container>
  );
}

function encodeDash(string: string) {
  return string === '&mdash;' ? '-' : string;
}

function getCategoryColor(category: 'Physical' | 'Special' | 'Status') {
  switch (category) {
    case 'Physical': return '#ff4400';
    case 'Special': return '#2266cc';
    case 'Status': return '#999999';
    default: return 'transparent';
  }
}
