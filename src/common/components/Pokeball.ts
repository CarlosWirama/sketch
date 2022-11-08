import styled from 'styled-components';

export default styled.div<{
  size: number;
  color?: string;
  background?: string;
}>`
  position: relative;
  width: ${props => .5 * props.size}px;
  height: ${props => .5 * props.size}px;
  border: ${props => `
    ${.25 * props.size}px solid ${props.color || 'gray'}
  `};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:before {
    content: "";
    position: absolute;
    width: 200%;
    height: 20%;
    background: ${props => props.background || 'white'};
    background-position: 0vh 0vw;
    background-size: 100vh 100vh;
  }
  &:after {
    content: "";
    position: absolute;
    width: 60%;
    height: 60%;
    background-color: ${props => props.color || 'gray'};
    border-radius: 50%;
  }
`;
