import React from 'react';

import LearnsetItem from './LearnsetItem';

//  types
import { MoveItem, RawMove } from '../../common/types';

interface LearnsetByMethodProps {
  moves?: RawMove[];
  choosenMoves: MoveItem[];
  setChoosenMoves: React.Dispatch<React.SetStateAction<MoveItem[]>>;
  isEditingActive: boolean;
}

export default function LearnsetByMethod ({
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
  return moves ? (
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
  ) : null;
}
