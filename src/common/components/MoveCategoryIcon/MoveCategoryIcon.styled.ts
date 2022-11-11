import styled from 'styled-components';

const Template = styled.div`
  margin-right: 4px;
  top: 3px;
`;

export const PhysicalContainer = styled(Template)`
  position: relative;
  padding-right: 16px;
`;

const PhysicalStarTemplate = styled.div`
  position: absolute;
  &:before, &:after {
    content: "";
    position: absolute;
    width: 8px;
    height: 8px;
    background-color: #fff;
  }
  &:before {
    transform: skew(22.5deg, 22.5deg);
  }
  &:after {
    transform: skew(-22.5deg, -22.5deg);
  }
`;

export const PhysicalStarDiagonal = styled(PhysicalStarTemplate)`
  top: 4px;
  left: 4px;
`;

export const PhysicalStarVerticalHorizontal = styled(PhysicalStarTemplate)`
  transform: rotate(45deg);
  top: 2px;
  left: 8px;
`;

export const Special = styled(Template)`
  position: relative;
  width: 12px;
  height: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  &, &:before {
    border: 2px solid #fff;
    border-radius: 50%;
  }
  &:before {
    content: "";
    position: absolute;
  }
  &:before {
    width: 45%;
    height: 45%;
  }
`;

export const Status = styled(Template)`
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
