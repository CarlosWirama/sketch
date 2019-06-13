import styled from 'styled-components';
import { lighten, darken } from 'polished';
import { default as CollapseMaterialUi } from '@material-ui/core/Collapse';
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

export const Move = styled(Card)`
  flex-direction: column;
  text-align: left;
  width: 100%;
  cursor: pointer;
  && {
    background-image: linear-gradient(
      white -64px,
      ${props => lighten(0.1, props.color)} 32px
    );
    box-shadow: 0 0 8px 10px rgba(182, 237, 255, 0.3);
    border: solid 3px ${props => darken(0.1, props.color)};
    margin-bottom: 24px;
    padding: 12px 24px;
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

export const Name = styled.div`
  font-size: 20px;
  flex: 3;
  padding-bottom: 8px;
`;

export const SubInfo = styled.div`
  display: flex;
  /* justify-content: space-between; */
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
