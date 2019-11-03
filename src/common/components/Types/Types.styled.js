import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  color: white;
`;

export const TypeBalloon = styled.div`
  color: white;
  min-width: 72px;
  text-align: center;
  text-transform: uppercase;
  background-color: ${props => props.color};
  font-size: 12px;
  font-weight: bold;
  padding: 2px 8px 4px;
  letter-spacing: -0.3px;
  border-radius: 5px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;

  &:not(:first-child) {
    margin-left: 4px;
  }
`;
