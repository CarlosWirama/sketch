import React, { useState } from 'react';
import MarkIcon from './MarkIcon';
import { Marking } from './types';
import { MarkingConstant } from './enums';
import { Color } from 'csstype';

const defaultMarking: Marking = {
  bigstar: MarkingConstant.UNMARKED,
  circle: MarkingConstant.UNMARKED,
  triangle: MarkingConstant.UNMARKED,
  star: MarkingConstant.UNMARKED,
  heart: MarkingConstant.UNMARKED,
  square: MarkingConstant.UNMARKED,
  diamond: MarkingConstant.UNMARKED,
};

export default function MarkingComponent() {
  const [marks, setMarks] = useState(defaultMarking);

  function getMarkColor(markValue: MarkingConstant): Color {
    switch (markValue) {
      case MarkingConstant.BLUE_MARK: return 'blue';
      case MarkingConstant.RED_MARK: return 'red';
      default: return 'darkgray-3';
    }
  }

  function onMark(markKey: keyof Marking): void {
    const currMarkValue = marks[markKey];
    const newMarkValue: MarkingConstant = (currMarkValue + 1) % 3;
    setMarks({
      ...marks,
      [markKey]: newMarkValue,
    });
  }

  const markEntries = Object.entries(marks) as Array<
    [keyof Marking, MarkingConstant]
  >;

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row' }}>
        {markEntries.map(([markKey, markValue]) => (
          <MarkIcon
            key={markKey}
            markKey={markKey}
            markValue={markValue}
            onMark={onMark}
            style={{ color: getMarkColor(markValue) }}
          />
        ))}
    </div>
  );
}
