import React from 'react';

export default function Learnset({learnset}) {
  return (
    <div>
      <LearnsetItem list={[
        'level', 'move', 'type', 'category',
        'power', 'acc', 'pp', '-', `stab ''' / ''`,
      ]} />
      { learnset.map(({list}, i) =>
        <LearnsetItem key={i} list={list} />
      )}
    </div>
  );
}

function LearnsetItem({list}) {
  function encodeDash(string) {
    return string === '&mdash;' ? '-' : string;
  }
  const isStab = list[8] === `'''`;
  const isStabAfterEvo = list[8] === `''`;
  const fontWeight = isStab ? 600 : isStabAfterEvo ? 450 : 400;
  return (
    <div style={{display: 'flex'}}>
      <div style={{flex: 1}}>{list[0]}</div>
      <div style={{flex: 3, ...{fontWeight}}}>{list[1]}</div>
      <div style={{flex: 2}}>{list[2]}</div>
      <div style={{flex: 2}}>{list[3]}</div>
      <div style={{flex: 1}}>{encodeDash(list[4])}</div>
      <div style={{flex: 1}}>{encodeDash(list[5])}</div>
      <div style={{flex: 1}}>{list[6]}</div>
    </div>
  );
}