import React from 'react';
import styled from 'styled-components';

export default function MoveCategoryIcon({ category, ...props }) {
  switch(category) {
    case 'Physical': return <Physical {...props}/>;
    case 'Special': return <Special {...props}/>;
    case 'Status': return <Status {...props}/>;
    default: return null;
  }
}

function Physical(props) {
  return (
    <PhysicalContainer  {...props}>
      <PhysicalStarVerticalHorizontal/>
      <PhysicalStarDiagonal />
    </PhysicalContainer>
  );
}

const shadow = '0 1px 2px rgba(0, 0, 0, 0.5)';
const filterShadow = '0 1px 0.5px rgba(0, 0, 0, 0.5)';
const boxShadow = `inset ${shadow}, ${shadow}`;

const Template = styled.span`
  margin-right: 4px;
`;

const PhysicalContainer = styled(Template)`
  position: relative;
  padding-right: 16px;
  filter: drop-shadow(${filterShadow});
`;

const PhysicalStarTemplate = styled.div`
  position: absolute;
  &:before, &:after {
    content: "";
    position: absolute;
    background-color: #ffcd00;
  }
  &:before {
    transform: skew(22.5deg, 22.5deg);
  }
  &:after {
    transform: skew(-22.5deg, -22.5deg);
  }
`;

const PhysicalStarDiagonal = styled(PhysicalStarTemplate)`
  top: 4px;
  left: 4px;
  &:before, &:after {
    width: 8px;
    height: 8px;
  }
`;

const PhysicalStarVerticalHorizontal = styled(PhysicalStarTemplate)`
  transform: rotate(45deg);
  top: 2px;
  left: 8px;
  &:before, &:after {
    width: 7.5px;
    height: 7.5px;
  }
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
    box-shadow: ${boxShadow};
  }
  &:before, &:after {
    content: "";
    position: absolute;
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
  box-shadow: ${boxShadow};
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
