import styled from 'styled-components';

export const Modal = styled.div`
  position: absolute;
  top: 104px;
  left: 0;
  background-color: #ffffffd8;
  width: 100%;
  z-index: 1;
  display: flex;
  justify-content: space-around;
  padding: 8px 16px;
  box-sizing: border-box;
  box-shadow:
    0px 2px 4px -1px rgba(0,0,0,0.2),
    0px 4px 5px 0px rgba(0,0,0,0.14),
    0px 1px 10px 0px rgba(0,0,0,0.12);
  border-radius: 0 0 8px 8px;
`;
