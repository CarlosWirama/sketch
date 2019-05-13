import styled from 'styled-components';
import { lighten } from 'polished';
import { default as CollapseMaterialUi } from '@material-ui/core/Collapse';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Card from '../../common/components/Card';

export const MoveSetTab = styled.div`
  margin-top: 16px;
  font-weight: bold;
`;

export const Container = styled.div`
  display: flex;
  position: relative;
  :not(:last-child):before {
    content: " ";
    position: absolute;
    border: 2px solid black;
    bottom: -17px;
    top: 17px;
    left: 14px;
  }
`;

export const Move = styled(Card)`
  flex-direction: column;
  text-align: left;
  && {
    background-image: linear-gradient(
      white -64px,
      ${props => lighten(0.1, props.color)} 32px
    );
    box-shadow: 0 0 8px 10px rgba(182, 237, 255, 0.3);
    border: solid 3px rgba(176, 235, 255, 0.8);
    margin: 12px 0;
    padding: 12px 24px;
    align-items: normal;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Level = styled.div`
  min-width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: black;
  font-size: 16px;
  color: white;
  margin: 16px 8px 0 0;
  z-index: 1;
  justify-content: center;
  display: flex;
  align-items: center;
`;

export const Name = styled.div`
  font-size: 20px;
  flex: 3;
`;

export const Collapse = styled(CollapseMaterialUi)`
  margin-top: 4px;
`;

export const ExpandIcon = styled(ExpandMore)`
  transition: transform 400ms;
  transform: rotate(0deg);
  &:hover {
    transform: rotate(${props => props.isExpanded ? '180deg' : '180deg'});
  }
`;

export const ShowDetails = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 10px;
  margin: 0 8px 5px 0;
`;

export const ExpandIconContainer = styled.div`
  transition: transform 400ms;
  transform: rotate(${props => props.isExpanded ? '180deg' : '0deg'});
  &:hover {
  }
`;
