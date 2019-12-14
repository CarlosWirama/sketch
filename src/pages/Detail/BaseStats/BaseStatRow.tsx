import React from 'react';
import { Color } from 'csstype';

interface BaseStatRowProps {
  name: string;
  value: number;
  color: Color;
}

export default function BaseStatRow({ name, value, color }: BaseStatRowProps) {
  return (
    <div style={{ display: 'flex' }}>
      <label style={{ width: 80 }}>{name}</label>
      <label style={{ width: 30 }}>{value}</label>
      <div style={{
        width: `${(100 * value / 255)}%`,
        background: color,
        opacity: .8,
        marginLeft: 8,
        borderRadius: '0px 4px 4px 0px',
      }}/>
    </div>
  );
}
