import React from 'react';
import styled from 'styled-components';

const Special = styled.span`
  position: relative;
  width: 14px;
  height: 14px;
  border: 1px solid #b9eeff;
  border-radius: 50%;
  background-color: #2266cc;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.5);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 4px;
  &:before {
    content: "";
    position: absolute;
    width: 70%;
    height: 70%;
    background-color: #2266cc;
    border: 1px solid #b9eeff;
    border-radius: 50%;
  }
  &:after {
    content: "";
    position: absolute;
    width: 45%;
    height: 45%;
    background-color: #2266cc;
    border: 1px solid #b9eeff;
    border-radius: 50%;
  }
`;

export default function MoveCategoryIcon({ category, ...props }) {
  switch(category) {
    case 'Special': return <Special {...props}/>;
    default: return null;
  }
}
