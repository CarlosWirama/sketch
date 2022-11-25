import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import MuiTabs from '@material-ui/core/Tabs';
import { default as MuiTab, TabProps as MuiTabProps } from '@material-ui/core/Tab';
import styled from 'styled-components';

import LearnsetByMethod from './LearnsetByMethod';

// image src
import RareCandy from '../../assets/images/icons/rare_candy.png';
import Tm from '../../assets/images/icons/tm.png';
import Egg from '../../assets/images/icons/pokemon_egg.png';
import Tamer from '../../assets/images/icons/tamer_sprite.png';
import Everstone from '../../assets/images/icons/everstone.png';

// types
import { MoveItem, PokemonDetail } from '../../common/types';

export default function MovesTab({
  learnset: {
    leveling,
    tm,
    breeding,
    tutoring,
    prior,
  },
  ...props
}: {
  learnset: PokemonDetail['moves'];
  choosenMoves: MoveItem[];
  setChoosenMoves: React.Dispatch<React.SetStateAction<MoveItem[]>>;
  isEditingActive: boolean;
}) {
  const [method, setMethod] = useState<LearnsetMethod>(LearnsetMethod.Leveling);
  const methodLabel = getMethodLabel(method);
  
  return (
    <div style={{ display: 'flex', flexFlow: 'column', height: '100%' }}>
      <Tabs
        value={method}
        onChange={(_, value) => setMethod(value)}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="secondary"
        aria-label="Move Method"
      >
        <Tab
          imgSrc={RareCandy} alt='leveling' />

        {tm && tm.length && (
          <Tab imgSrc={Tm} alt='tm' />
        )}

        {breeding && breeding.length && (
          <Tab imgSrc={Egg} alt='breeding' />
        )}

        {tutoring && tutoring.length && (
          <Tab imgSrc={Tamer} alt='tutoring' />
        )}

        {prior && prior.length && (
          <Tab imgSrc={Everstone} alt='prior evolution' />
        )}
      </Tabs>
      
      <div style={{ padding: '2px 0 4px' }}>
        Moves by {methodLabel}
      </div>
      <div style={{ height: '100%', overflowY: 'scroll' }}>
        <SwipeableViews
          index={method}
          onChangeIndex={setMethod}
          disabled
          animateHeight
        >
          <LearnsetByMethod moves={leveling} {...props} />
          <LearnsetByMethod moves={tm} {...props} />
          <LearnsetByMethod moves={breeding} {...props} />
          <LearnsetByMethod moves={tutoring} {...props} />
          <LearnsetByMethod moves={prior} {...props} />
        </SwipeableViews>
      </div>
    </div>
  );
}

function getMethodLabel(method: LearnsetMethod) {
  switch (method) {
    case LearnsetMethod.Leveling: return 'Leveling';
    case LearnsetMethod.Tm: return 'TM/TR';
    case LearnsetMethod.Breeding: return 'Breeding';
    case LearnsetMethod.Tutoring: return 'Tutoring';
    case LearnsetMethod.PriorEvolution: return 'Prior Evolution';
  }
}

interface TabProps extends MuiTabProps {
  imgSrc: string;
  alt: string
}

function Tab({ imgSrc, alt, ...props }: TabProps) {
  return (
    <MuiTab
      label={(
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={imgSrc} alt={alt} />
        </div>
      )}
      {...props}
    />
  );
}

const Tabs = styled(MuiTabs)`
  max-width: fit-content;

  & button {
    min-width: auto;
  }
`

enum LearnsetMethod {
  Leveling,
  Tm,
  Breeding,
  Tutoring,
  PriorEvolution,
}
