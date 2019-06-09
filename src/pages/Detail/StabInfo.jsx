import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function StabInfo({ indicator }) {
  let message;
  switch (indicator) {
    case `'''`: message = 'Same type attack bonus!'; break;
    case `''`: message = 'Might get attack bonus when evolved'; break;
    default: return null; // dont get stab
  }
  return (
    <Container indicator={indicator}>
      {message}
    </Container>
  );
}

StabInfo.propTypes = {
  indicator: PropTypes.oneOf([`''`, `'''`, '']).isRequired,
};

const Container = styled.div`
  background-color: ${props => props.theme.color.black};
  color: white;
  border-radius: 100px;
  width: fit-content;
  height: 32px
  padding: 0 16px;
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;
