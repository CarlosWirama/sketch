import React from 'react';
import { SectionTitle } from '../DetailPage.styled';
import styled from 'styled-components';
import { BorderedCard } from '../../../common/components/Card';

interface BreedingInfoProps {
  genderRatio: number;
  eggGroups: string[];
}

export default function BreedingInfo({ genderRatio, eggGroups }: BreedingInfoProps) {
  return (
    <>
      <SectionTitle>Breeding Info</SectionTitle>
      <BorderedCard>
        <Grid>
          <div>Gender Ratio</div>
          <GenderRatio ratio={genderRatio} />
          <div>Egg Group</div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {eggGroups.map(group => <span key={group}>{group}</span>)}
          </div>
        </Grid>
      </BorderedCard>
    </>
  );
}

function GenderRatio({ ratio }: { ratio: number }) {
  let maleRatioInteger: number | 'all' = Math.round(1 / (1 - ratio) - 1);
  let femaleRatioInteger: number | 'all' = Math.round(1 / ratio - 1);
  let isGenderless = false;
  if (ratio < 0) isGenderless = true;
  else if (maleRatioInteger === Infinity) maleRatioInteger = 'all';
  else if (femaleRatioInteger === Infinity) femaleRatioInteger = 'all';
  else if (maleRatioInteger > 1) femaleRatioInteger = 1;
  else if (femaleRatioInteger > 1) maleRatioInteger = 1;

  return (
    <GenderRatioContainer>
      {isGenderless ? 'Genderless' : (
        <GenderRatioBar ratio={ratio}>
          {maleRatioInteger !== 0 && (
            <RatioText>{maleRatioInteger} male</RatioText>
          )}
          {femaleRatioInteger !== 0 && (
            <RatioText>{femaleRatioInteger} female</RatioText>
          )}
        </GenderRatioBar>
      )}
    </GenderRatioContainer>
  );
}

const GenderRatioBar = styled.div<{ ratio: number }>`
  background-color: #FF77DDCC;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  &:after {
    content: "";
    position: absolute;
    width: ${props => props.ratio * 100}%;
    height: 100%;
    background-color: #00FC;
  }
`;

const GenderRatioContainer = styled.div`
  position: relative;
  border-radius: 4px;
  overflow: hidden;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: auto auto;
`;

const RatioText = styled.div`
  z-index: 1;
  margin: auto;
`;
