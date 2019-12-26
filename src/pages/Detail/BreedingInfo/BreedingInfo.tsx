import React from 'react';
import { SectionTitle } from '../DetailPage.styled';
import styled from 'styled-components';

interface BreedingInfoProps {
  genderRatio: number;
  eggGroups: string[];
}

export default function BreedingInfo({ genderRatio, eggGroups }: BreedingInfoProps) {
  return (
    <>
      <SectionTitle>Breeding Info</SectionTitle>
      <Grid>
        <div>Gender Ratio</div>
        <GenderRatio ratio={genderRatio} />
        <div>Egg Group</div>
        <Grid>
          {eggGroups.map(group => <span key={group}>{group}</span>)}
        </Grid>
      </Grid>
    </>
  );
}

function GenderRatio({ ratio }: { ratio: number }) {
  return (
    <GenderRatioContainer>
        <GenderRatioBar ratio={ratio} />
    </GenderRatioContainer>
  );
}

const GenderRatioBar = styled.div<{ratio: number}>`
  background-color: #FF77DD;
  width: 100%;
  height: 100%;
  &:before {
    content: "";
    position: absolute;
    width: ${props => props.ratio * 100}%;
    height: 100%;
    background-color: blue;
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
