import React from 'react';
import styled, { keyframes } from 'styled-components';
import Pokeball from './Pokeball';
import backgroundTile from './backgroundTile';

const shakingAnimation = keyframes`
  0% { transform: rotate(0deg) }
  10% { transform: rotate(22deg) }
  30% { transform: rotate(-22deg) }
  40% { transform: rotate(0deg) }
`;

const ShakingPokeball = styled(Pokeball)`
  margin: ${props => props.size / 4}px auto;
  animation: 1s ${shakingAnimation} ease-in-out infinite;
`;

const Container = styled.div`
  width: 100%;
`;

export default function PokeballLoadingIndicator(props) {
  return(
    <Container>
      <ShakingPokeball {...props} />
    </Container>
  );
}

PokeballLoadingIndicator.defaultProps = {
  size: 128,
  background: backgroundTile,
}
