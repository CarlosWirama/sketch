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
        <SmallLED top="60px" color="red"/>
        <SmallLED top="80px" color="yellow" />
        <SmallLED top="100px" color="green"/>
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

const LedWire = styled.div`
  position: absolute;
  top: 8px;
  right: 15px;
  width: 2px;
  height: 110px;
  background-color: black;
  box-shadow: inset 1px 1px 2px gray;
`;

const TemplateLED = styled.div`
  position: absolute;
  height: 12px;
  width: 12px;
  right: 10px;
  border-radius: 50%;
  /*background: radial-gradient(circle at 50% 120%, #323232, #0a0a0a 80%, #000000 100%);*/
  box-shadow: 1px 1px 2px black;
  &:before { /* bottom light */
    content: "";
    position: absolute;
    background: radial-gradient(circle at 50% 120%, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0) 70%);
    border-radius: 50%;
    bottom: 2.5%;
    left: 5%;
    opacity: 0.6;
    height: 100%;
    width: 90%;
    filter: blur(1px);
    z-index: 2;
  }
  &:after { /* shine */
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 5%;
    left: 10%;
    border-radius: 50%;
    background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8) 14%, rgba(255, 255, 255, 0) 24%);
    transform: translateX(-32%) translateY(-32%) skewX(-20deg);
    filter: blur(1px);
  }
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

const BezelDecorationLine = styled.div`
  position: absolute;
  background-color: #7ff6f3;
  width: 2px;
  height: 100%;
  &:after {
    content: "";
    position: absolute;
    background-color: #7ff6f3;
    width: 2px;
    height: 16px;
    transform: rotate(-45deg);
  }
`;

const LeftVerticalLine = styled(BezelDecorationLine)`
  bottom: 50%;
  left: 15px;
  &:after {
    left: 6px;
    bottom: -13px;
  }
`;
const RightVerticalLine = styled(BezelDecorationLine)`
  top: 50%;
  right: 20px;
  &:after {
    top: -13px;
    left: -6px;
  }
`;
