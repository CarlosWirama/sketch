import React from 'react';
import styled from 'styled-components';
import {
  SCREEN_MIN_WIDTH,
  FRAME_RIGHT_CALC,
} from '../../constants/pokedexCssCalculation.js';

export default function PokedexFrame() {
  return (
    <Container>
      <LeftFrame>
        <PokeballLogo/>
      </LeftFrame>
      <RightFrame>
        <LedWire/>
        <LargeLED/>
        <SmallLED top="75px" color="red"/>
        <SmallLED top="100px" color="yellow" />
        <SmallLED top="125px" color="green"/>
        <LeftVerticalLine/>
        <RightVerticalLine/>
      </RightFrame>
    </Container>
  );
}

const Container = styled.div`
  display: none;
  @media only screen and (min-width: ${SCREEN_MIN_WIDTH}) {
    display: flex;
    height: 100%;
    position: fixed;
    left: ${FRAME_RIGHT_CALC};
    right: ${FRAME_RIGHT_CALC};
    background-color: #14aaa0;
  }
`;

const FrameTemplate = styled.div`
  background-color: #fc5849;
  border-radius: 16px;
  flex: 1;
  position: relative;
`;

const LeftFrame = styled(FrameTemplate)`
  border-right: 1px solid black;
  display: flex;
`;

const RightFrame = styled(FrameTemplate)``;

const PokeballLogo = styled.div`
  position: relative;
  align-self: center;
  left: 100px;
  width: 200px;
  height: 200px;
  background-color: #c0362d;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:before {
    content: "";
    width: 20px;
    height: 100%;
    background-color: #fc5849;
  }
  &:after {
    content: "";
    position: absolute;
    width: 60px;
    height: 60px;
    background-color: #c0362d;
    border: 20px solid #fc5849;
    border-radius: 50%;
  }
`;

const TemplateLED = styled.div`
  position: absolute;
  height: 12px;
  width: 12px;
  right: 10px;
  border-radius: 50%;
`;

const LargeLED = styled(TemplateLED)`
  background-color: black;
  height: 20px;
  width: 20px;
  top: 8px;
  right: 6px;
`;

const SmallLED = styled(TemplateLED)`
  background-color: ${props => props.color};
  top: ${props => props.top};
`;

const LedWire = styled.div`
  position: absolute;
  top: 8px;
  right: 15px;
  width: 2px;
  height: 140px;
  background-color: black;
`;

const BezelDecorationLine = styled.div`
  position: absolute;
  background-color: #7ff6f3;
  width: 2px;
`;

const LeftVerticalLine = styled(BezelDecorationLine)`
  top: 50%;
  right: 19px;
  height: 100%;
`;
const RightVerticalLine = styled(BezelDecorationLine)`
  bottom: 50%;
  left: 19px;
  height: 100%;
`;
