import React, { useState } from 'react';
import Collapse from '@material-ui/core/Collapse';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';

import LearnsetItem from './LearnsetItem';
import { SectionTitle } from './DetailPage.styled';

//  types
import { Learnset as TLearnset, MoveItem, RawMove } from '../../common/types';

interface LearnsetProps {
  learnset: TLearnset;
  choosenMoves: MoveItem[];
  setChoosenMoves: React.Dispatch<React.SetStateAction<MoveItem[]>>;
  isEditingActive: boolean;
}

export default function Learnset ({
  learnset: {
    leveling,
    tm,
    breeding,
    tutoring,
    prior,
  },
  ...props
}: LearnsetProps) {
  const [expanded, setExpanded] = useState<string>('leveling');
  return (
    <div style={{ height: '100%', display: 'flex', flexFlow:'column' }}>
      <LearnsetByMethod
        methodTitle='Moves by leveling up'
        moves={leveling}
        isExpanded={expanded === 'leveling'}
        onExpanded={() => setExpanded('leveling')}
        {...props}
      />
      {tm && tm.length > 0 && (
        <LearnsetByMethod
          methodTitle='Moves by TM/TR'
          moves={tm}
          isExpanded={expanded === 'tmtr'}
          onExpanded={() => setExpanded('tmtr')}
          {...props}
        />
      )}
      {breeding && breeding.length > 0 && (
        <LearnsetByMethod
          methodTitle='Moves by breeding'
          moves={breeding}
          isExpanded={expanded === 'breeding'}
          onExpanded={() => setExpanded('breeding')}
          {...props}
        />
      )}
      {tutoring && tutoring.length > 0 && (
        <LearnsetByMethod
          methodTitle='Moves by tutoring'
          moves={tutoring}
          isExpanded={expanded === 'tutoring'}
          onExpanded={() => setExpanded('tutoring')}
          {...props}
        />
      )}
      {prior && prior.length > 0 && (
        <LearnsetByMethod
          methodTitle='Moves by prior evolution'
          moves={prior}
          isExpanded={expanded === 'priorevo'}
          onExpanded={() => setExpanded('priorevo')}
          {...props}
        />
      )}
    </div>
  );
}

interface LearnsetByMethodProps extends Omit<LearnsetProps, 'learnset'> {
  methodTitle: string;
  moves: RawMove[];
  isExpanded: boolean;
  onExpanded: () => void;
  setChoosenMoves: React.Dispatch<React.SetStateAction<MoveItem[]>>;
  isEditingActive: boolean;
}

function LearnsetByMethod ({
  methodTitle,
  moves,
  isExpanded,
  onExpanded,
  choosenMoves,
  setChoosenMoves,
  isEditingActive,
}: LearnsetByMethodProps) {
  function toggleChoosenMove(move: MoveItem) {
    const newChoosenMoves = choosenMoves
      .filter(({ name }) => name !== move.name);
    if (newChoosenMoves.length === choosenMoves.length) {
      newChoosenMoves.unshift(move);
    }
    setChoosenMoves(newChoosenMoves.slice(0, 4)); // get the latest 4;
  }
  return (
    <>
      <SectionTitle onClick={onExpanded}>
        {methodTitle}&nbsp;<ArrowDropDown />
      </SectionTitle>
      <Collapse in={isExpanded} timeout="auto" unmountOnExit style={{ flexGrow: 1, overflow: 'scroll' }}>
        {moves.map((move, i) => (
          <LearnsetItem
            key={i}
            list={move}
            isEditingActive={isEditingActive}
            // list[1] contains move's name
            isMoveChoosen={choosenMoves.reduce<boolean>(
              (result, choosenMove) => choosenMove.name === move[1] || result,
              false,
            )}
            toggleChoosenMove={toggleChoosenMove}
          />
        ))}
      </Collapse>
    </>
  );
}
