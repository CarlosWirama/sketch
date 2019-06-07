import styled from 'styled-components';
import PropTypes from 'prop-types';

const Pokeball = styled.div`
  position: relative;
  ${props => props.size && `
    width: ${props.size}px;
    height: ${props.size}px;
  `};
  background-color: ${props => props.color || '#fc5849'};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:before {
    content: "";
    width: 100%;
    height: 10%;
    background-color: ${props => props.color || '#fc5849'};
  }
  &:after {
    content: "";
    position: absolute;
    width: 30%;
    height: 30%;
    background-color: ${props => props.backgroundColor || '#c0362d'};
    border: 18px solid ${props => props.color || '#fc5849'};
    border-radius: 50%;
  }
`;

Pokeball.propTypes = {
  size: PropTypes.number.isRequired,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
};

export default Pokeball;
