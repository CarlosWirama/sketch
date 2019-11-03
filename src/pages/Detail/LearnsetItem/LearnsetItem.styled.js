import styled from 'styled-components';
import { lighten, darken } from 'polished';
import {
  Collapse as CollapseMaterialUi,
  IconButton as IconButtonMaterialUi,
} from '@material-ui/core';
import Card from '../../../common/components/Card';

export const Container = styled.div`
  display: flex;
  position: relative;
  :not(:last-child):before {
    content: " ";
    position: absolute;
    border: 2px solid ${props => props.theme.color.black};
    bottom: -17px;
    top: 17px;
    left: 14px;
  }
`;
// ${props => lighten(0.1, props.color)} 32px
export const Move = styled(Card)`
  flex-direction: column;
  text-align: left;
  width: 100%;
  cursor: pointer;
  color: white;
  && {
    background-image: linear-gradient(
      white -64px,
      ${props => props.color} 32px
    );
    box-shadow: 0 0 8px 10px rgba(182, 237, 255, 0.3);
    border: 2px solid rgba(0, 0, 0, 0.2);
    margin-bottom: 24px;
    padding: 12px 16px;
    align-items: normal;
  }
`;

export const Level = styled.div`
  min-width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${props => props.theme.color.black};
  font-size: 16px;
  color: white;
  margin-right: 8px;
  z-index: 1;
  justify-content: center;
  display: flex;
  align-items: center;
`;

export const Headline = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Name = styled.div`
  font-size: 20px;
  flex: 3;
  padding-bottom: 8px;
`;

export const IconButton = styled(IconButtonMaterialUi)`
  top: 0;
  right: 0;
  && {
    position: absolute;
  }
`;

export const SubInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const Collapse = styled(CollapseMaterialUi)`
  margin-top: 4px;
  font-size: 14px;
`;

export const ExpansionToggle = styled.div`
  display: flex;
  align-items: center;
  font-size: 10px;
  margin-right: 8px;
`;

export const ExpandIconContainer = styled.div`
  transition: transform 400ms;
  transform: rotate(${props => props.isExpanded ? 180 : 0}deg);
`;

export const Description = styled.div`
  margin: 16px 0;
`;

export const DetailGrid = styled.div`
  display: flex;
`;

export const DetailLabels = styled.div`
  font-weight: bold;
`;

export const DetailValues = styled.div`
  margin-left: 8px;
`;
