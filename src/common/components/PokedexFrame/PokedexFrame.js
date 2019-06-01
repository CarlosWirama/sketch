import React from 'react';
import {
  Container,
  LeftFrame,
  LeftFrameLines,
  BigCircleBorder,
  PokeballLogo,
  Recess,
  RightFrame,
  LedWire,
  LargeLED,
  SmallLED,
  LeftVerticalLine,
  RightVerticalLine,
} from './PokedexFrame.styled';

export default function PokedexFrame() {
  return (
    <Container>
      <LeftFrame>
        <LeftFrameLines/>
        <BigCircleBorder>
          <PokeballLogo/>
        </BigCircleBorder>
        <Recess />
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
