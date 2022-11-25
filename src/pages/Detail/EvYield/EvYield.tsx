import React from 'react';
import styled from 'styled-components';

import { SectionTitle } from '../DetailPage.styled';
import { BorderedCard } from '../../../common/components/Card';
import { PokemonDetail } from '../../../common/types';
import { getStatName, getStatColor } from '../helper';
import { Color } from 'csstype';

interface EvYieldProps {
  yields: PokemonDetail['evYield'];
}

export default function EvYield({ yields }: EvYieldProps) {
  return (
    <>
      <SectionTitle>EV Yield</SectionTitle>
      <Container>
        {yields.map(({stat, value}) => (
          <Yield color={getStatColor(stat)}>+{value} {getStatName(stat)}</Yield>
        ))}
      </Container>
    </>
  );
}

const Container = styled(BorderedCard)`
  display: flex;
  column-gap: 8px;
`

const Yield = styled.div<{ color: Color }>`
  background-color: ${props => props.color};
  border-radius: 16px;
  padding: 4px 12px;
  font-size: 12px;
  width: fit-content;
`;
