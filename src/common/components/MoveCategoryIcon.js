import React from 'react';
import styled from 'styled-components';

export default function MoveCategoryIcon({ category, ...props }) {
  switch(category) {
    case 'Special': return <Special {...props}/>;
    case 'Status': return <Status {...props}/>;
    default: return null;
  }
}

const Template = styled.span`
  box-shadow:
    inset 0 1px 2px 0 rgba(0, 0, 0, 0.5),
    0 1px 2px 0 rgba(0, 0, 0, 0.5);
  margin-right: 4px;
`;

const Special = styled(Template)`
  position: relative;
  width: 14px;
  height: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  &, &:before, &:after {
    background-color: #2266cc;
    border: 1px solid #b9eeff;
    border-radius: 50%;
  }
  &:before, &:after {
    content: "";
    position: absolute;
    box-shadow:
      0 1px 2px 0 rgba(0, 0, 0, 0.5);
      inset 0 1px 2px 0 rgba(0, 0, 0, 0.5),
  }
  &:before {
    width: 70%;
    height: 70%;
  }
  &:after {
    width: 45%;
    height: 45%;
  }
`;

const Status = styled(Template)`
  width: 14px;
  box-sizing: content-box;
  height: 6.5px;
  background: #999;
  border-color: #eee;
  border-style: solid;
  border-width: 1px 1px 8.5px 1px;
  border-radius: 50%;
  position: relative;
  &:before, &:after {
    content: "";
    position: absolute;
    top: 50%;
    border-radius: 50%;
    width: 50%;
    height: 100%;
    box-sizing: content-box;
  }
  &:before {
    left: 0;
    background: #eee;
  }
  &:after {
    left: 50%;
    background: #999;
  }
`;
