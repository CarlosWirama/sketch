import React from 'react';
import PropTypes from 'prop-types';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Types, { getTypeColor } from '../../../common/components/Types';
import { TypeBaloon } from '../../../common/components/Types/Types.styled';
import MoveCategoryIcon from '../../../common/components/MoveCategoryIcon';
import { default as LoadingIndicator }
  from '../../../common/components/PokeballLoadingIndicator';
// import StabInfo from './StabInfo';
import {
  Container,
  Move,
  Level,
  Name,
  SubInfo,
  Collapse,
  ExpansionToggle,
  ExpandIconContainer,
  Description,
  DetailGrid,
  DetailLabels,
  DetailValues,
} from './LearnsetItem.styled';

export default function LearnsetItemLayout({
  level,
  moveName,
  type,
  category,
  power,
  accuracy,
  pp,
  stabIndicator,
  description,
  toggleExpanded,
  isExpanded,
}) {
  return (
    <Container>
      <Level>{level}</Level>
      <Move color={getTypeColor(type)} onClick={toggleExpanded} >
        <Name>{moveName}</Name>
        <SubInfo>
          <Types types={[type]} />
          <TypeBaloon color={getCategoryColor(category)}>
            <MoveCategoryIcon category={category} />
            {category}
            {category !== 'Status' && <span>:&nbsp;{encodeDash(power)}</span>}
          </TypeBaloon>
        </SubInfo>
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <Description>
            {description || <LoadingIndicator size={57} background={getTypeColor(type)} />}
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

LearnsetItemLayout.propTypes = {
  level: PropTypes.string.isRequired,
  moveName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  power: PropTypes.string.isRequired,
  accuracy: PropTypes.string.isRequired,
  pp: PropTypes.string.isRequired,
  stabIndicator: PropTypes.string,
  description: PropTypes.string.isRequired,
  toggleExpanded: PropTypes.func.isRequired,
  isExpanded: PropTypes.bool.isRequired,
};

function encodeDash(string) {
  return string === '&mdash;' ? '-' : string;
}

function getCategoryColor(category) {
  switch (category) {
    case 'Physical': return '#ff4400';
    case 'Special': return '#2266cc';
    case 'Status': return '#999999';
    default: return 'transparent';
  }
}
