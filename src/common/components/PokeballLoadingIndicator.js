import React from 'react';
import styled, { keyframes } from 'styled-components';
import Pokeball from './Pokeball';
import backgroundTile from './backgroundTile';

const shakingAnimation = keyframes`
  0% { transform: rotate(0deg) }
  15% { transform: rotate(22deg) }
  35% { transform: rotate(-22deg) }
  50% { transform: rotate(0deg) }
`;

const ShakingPokeball = styled(Pokeball).attrs({
  size: 100,
  background: backgroundTile,
})`
  margin: 32px auto;
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
