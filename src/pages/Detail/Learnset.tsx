import React from 'react';
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
  return (
    <>
      <LearnsetByMethod
        methodTitle='Moves by leveling up'
        moves={leveling}
        {...props}
      />
      {tm && tm.length > 0 && (
        <LearnsetByMethod
          methodTitle='Moves by TM/TR'
          moves={tm}
          {...props}
        />
      )}
      {breeding && breeding.length > 0 && (
          <LearnsetByMethod
          methodTitle='Moves by breeding'
          moves={breeding}
          {...props}
        />
      )}
      {tutoring && tutoring.length > 0 && (
          <LearnsetByMethod
          methodTitle='Moves by tutoring'
          moves={tutoring}
          {...props}
        />
      )}
      {prior && prior.length > 0 && (
          <LearnsetByMethod
          methodTitle='Moves by prior evolution'
          moves={prior}
          {...props}
        />
      )}
    </>
  );
}

interface LearnsetByMethodProps extends Omit<LearnsetProps, 'learnset'> {
  methodTitle: string;
  moves: RawMove[];
  setChoosenMoves: React.Dispatch<React.SetStateAction<MoveItem[]>>;
  isEditingActive: boolean;
}

function LearnsetByMethod ({
  methodTitle,
  moves,
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
      <SectionTitle>{methodTitle}</SectionTitle>
      <div>
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
      </div>
    </>
  );
}
